import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
  project: process.env.OPENAI_PROJECT,
})

async function requestOpenAI(prompt: string, model: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 1.0, // More creativity for interesting debates
  })

  const aiResponse = completion.choices[0]?.message?.content ?? ''

  return aiResponse
}

export default requestOpenAI
