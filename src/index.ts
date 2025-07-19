import express from 'express'

const app = express()
const DEFAULT_PORT = 3000
const PORT = process.env.PORT ?? DEFAULT_PORT

app.get('/', (_req, res) => {
  res.send('Hello, TypeScript Express!')
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`)
})
