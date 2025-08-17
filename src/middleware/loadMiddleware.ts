export default async function loadMiddleware(): Promise<void> {
  await import('./cors.ts')
  await import('./json.ts')
}
