import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT,
})

async function requestOpenAI(prompt: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500, // Reasonable limit for opening arguments
    temperature: 0.8, // Some creativity for interesting debates
  })

  const aiResponse = completion.choices[0]?.message?.content ?? ''

  return aiResponse
}

export default requestOpenAI
