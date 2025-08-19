import cors from 'cors'

// CORS middleware setup
const corsOptions = {
  origin: [
    'http://localhost:5820', // Backend
    'https://make-ai-argue.netlify.app', // Netlify production site
    'https://makeaiargue.com',
  ],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions))

// Export something to make this a proper ES module
export {}
