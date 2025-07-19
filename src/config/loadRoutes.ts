import { readdir, stat } from 'fs/promises'
import { extname, join, relative, resolve } from 'path'
import { fileURLToPath } from 'url'

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// Path to the routes directory
const ROUTES_DIR = resolve(__dirname, '../routes')

/**
 * Recursively finds all TypeScript files in a directory
 * @param dir - Directory to search
 * @param fileList - Accumulator for found files
 * @returns Array of file paths
 */
async function findRouteFiles(
  dir: string,
  fileList: string[] = [],
): Promise<string[]> {
  try {
    const files = await readdir(dir)

    for (const file of files) {
      const filePath = join(dir, file)
      const fileStat = await stat(filePath)

      if (fileStat.isDirectory()) {
        // Recursively search subdirectories
        await findRouteFiles(filePath, fileList)
      } else if (
        fileStat.isFile() &&
        (extname(file) === '.ts' || extname(file) === '.js')
      ) {
        // Only include TypeScript and JavaScript files
        fileList.push(filePath)
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error reading directory ${dir}:`, error)
  }

  return fileList
}

/**
 * Converts a file path to a module import path
 * @param filePath - Absolute file path
 * @returns Import path relative to the current file
 */
function getImportPath(filePath: string): string {
  const relativePath = relative(__dirname, filePath)
  // Remove file extension and normalize path separators
  const importPath = relativePath.replace(/\.[jt]s$/, '').replace(/\\/g, '/')
  // Ensure the path starts with './' for relative imports
  return importPath.startsWith('.') ? importPath : `./${importPath}`
}

/**
 * Dynamically imports all route files
 */
async function loadRoutes(): Promise<void> {
  try {
    // Find all route files
    const routeFiles = await findRouteFiles(ROUTES_DIR)

    if (routeFiles.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('No route files found in', ROUTES_DIR)
      return
    }

    // Import each route file
    const importPromises = routeFiles.map(async (filePath) => {
      try {
        const importPath = getImportPath(filePath)
        // Dynamic import - this will execute the route definitions
        await import(importPath)

        return { success: true, file: filePath }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load route file ${filePath}:`, error)
        return { success: false, file: filePath, error }
      }
    })

    // Wait for all imports to complete
    const results = await Promise.all(importPromises)

    // Summary
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    if (failed > 0 || successful === 0) {
      // eslint-disable-next-line no-console
      console.error(`${failed} route file(s) failed to load`)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading routes:', error)
  }
}

// Execute the route loading (export as a function so it can be awaited)
export default loadRoutes
