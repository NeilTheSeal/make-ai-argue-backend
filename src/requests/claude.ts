import Anthropic from '@anthropic-ai/sdk'
import type { TextBlock } from '@anthropic-ai/sdk/resources/messages'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function requestAnthropic(prompt: string): Promise<string> {
  const completion = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1024, // Reasonable limit for opening arguments
  })

  return (completion.content[0] as TextBlock).text ?? ''
}

export default requestAnthropic
