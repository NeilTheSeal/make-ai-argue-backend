import cors from 'cors'

// CORS middleware setup
const corsOptions = {
  origin: [
    'http://localhost:3000', // Backend
    'http://localhost:5173', // Vite frontend default
    'http://localhost:3001', // Alternative frontend port
    'http://localhost:4173', // Vite preview port
    'https://make-ai-argue.netlify.app', // Netlify production site
    'https://makeaiargue.com',
  ],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions))

// Export something to make this a proper ES module
export {}
