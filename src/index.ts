import './config/init.ts'
import loadRoutes from './config/loadRoutes.ts'
import loadMiddleware from './middleware/loadMiddleware.ts'

await loadMiddleware()
await loadRoutes()

const DEFAULT_PORT = 3000
const PORT = process.env.PORT ?? DEFAULT_PORT

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`)
})
