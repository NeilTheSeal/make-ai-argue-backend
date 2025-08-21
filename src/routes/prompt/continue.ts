import continuePrompt from '../../prompts/continue.ts'
import requestOpenAI from '../../requests/openai.ts'
import requestAnthropic from '../../requests/claude.ts'
import requestGemini from '../../requests/gemini.ts'

app.post('/prompt/continue', async (req, res) => {
  const { conversationHistory, prompt, model1, model2 } = req.body

  if (!conversationHistory || !prompt || !model1 || !model2) {
    return res.status(400).json({
      error: 'Conversation history, prompt, and both models are required',
    })
  }

  try {
    const intro = continuePrompt(prompt, conversationHistory, model1, model2)

    let aiResponse: string | null = null

    if (model2 === 'gpt-4o-mini' || model2 === 'gpt-5-mini') {
      aiResponse = await requestOpenAI(intro, model2)
    }

    if (model2 === 'claude') {
      aiResponse = await requestAnthropic(intro)
    }

    if (model2 === 'gemini') {
      aiResponse = await requestGemini(intro)
    }

    if (!aiResponse) {
      return res
        .status(500)
        .json({ error: 'No response from AI or invalid model provided' })
    }

    return res.status(200).json({
      conversation: conversationHistory,
      model: model2,
      response: aiResponse,
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      error: 'Failed to generate AI response',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})
