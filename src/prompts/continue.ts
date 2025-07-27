const continuePrompt = (
  prompt: string,
  conversationHistory: string[],
  model1: string,
  model2: string,
): string => {
  const intro = `
  You are part of a web application called "Make AI Argue". 
  You will be given a controversial topic and you will debate 
  another AI on that topic. Your prompt is the following:
  ${prompt}
  This is the conversation history:
  `
  const history = conversationHistory
    .map((entry, index) => {
      return `${index % 2 === 0 ? model1 : model2}: ${entry}`
    })
    .join('\n')

  return `
    ${intro}
    ${history}
    What is your response to the last statement by ${model2}?
    Make sure to consider the context of the conversation and provide a
    thoughtful continuation. Keep your response under 40 words. Write your
    response using only words, no special characters or formatting.
  `
}

export default continuePrompt
