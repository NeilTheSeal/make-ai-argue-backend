import introPrompt from '../../prompts/intro.ts'
import requestOpenAI from '../../requests/openai.ts'
import requestAnthropic from '../../requests/claude.ts'

app.post('/prompt/intro', async (req, res) => {
  const { prompt, model } = req.body

  if (!prompt || !model) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    const intro = introPrompt(prompt)

    let aiResponse: string | null = null

    if (model === 'openai') {
      aiResponse = await requestOpenAI(intro)
    }

    if (model === 'claude') {
      aiResponse = await requestAnthropic(intro)
    }

    if (!aiResponse) {
      return res
        .status(500)
        .json({ error: 'No response from AI or invalid model provided' })
    }

    return res.status(200).json({
      message: aiResponse,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error)
    return res.status(500).json({
      error: 'Failed to generate AI response',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})
