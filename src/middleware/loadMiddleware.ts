export default async function loadMiddleware(): Promise<void> {
  await import('./json')
}
