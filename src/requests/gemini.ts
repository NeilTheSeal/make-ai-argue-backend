import { GoogleGenAI } from '@google/genai'

const googleAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

async function requestGemini(prompt: string): Promise<string> {
  const completion = await googleAi.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  })

  const aiResponse = completion.text ?? ''

  return aiResponse
}

export default requestGemini
