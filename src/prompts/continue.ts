const continuePrompt = (
  prompt: string,
  conversationHistory: string[],
  model1: string,
  model2: string,
): string => {
  const intro = `
  You are part of a web application called "Make AI Argue".
  You will be given a controversial topic and will debate
  another AI on that topic. Your prompt is the following:
  ${prompt}
  This is the conversation history:
  `
  const history = conversationHistory
    .map((entry, index) => {
      return `${index % 2 === 0 ? model1 : model2}: ${entry}`
    })
    .join('\n')

  const lastIndex = conversationHistory.length - 1
  let lastSpeaker = model2
  if (lastIndex >= 0) {
    lastSpeaker = lastIndex % 2 === 0 ? model1 : model2
  }

  return `
    ${intro}

    ${history}
    
    What is your response to the last statement by ${lastSpeaker}?
    Keep it under 40 words.
    Write your response in a way that is text-to-speech friendly.

    Style: satirical, playful, a bit absurd (South Park energy), PG-13.
    Light roast-level teasing is okay; be witty, not cruel.

    Do:
    - Respond directly to the last point and advance your case.
    - Use confident, over-the-top logic or silly analogies.
    - Include at least one concrete reason or example, even if ridiculous.
    - If losing, double down with sillier bravado; if winning, gloat cheekily.

    Don't:
    - Use slurs, hate, harassment, threats, or explicit content.
    - Attack real people or protected groups; target ideas and arguments.
    - Encourage harm, violence, or illegal acts.

    If the topic is sensitive, steer the humor toward the logic and tone,
    not identities.
  `
}

export default continuePrompt
