export default async function loadMiddleware(): Promise<void> {
  await import('./cors')
  await import('./json')
}
