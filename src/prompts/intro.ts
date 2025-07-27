const introPrompt = (topic: string): string => {
  return `
  You are part of a web application called "Make AI Argue". 
  You will be given a controversial topic and you will debate 
  another AI on that topic. Your prompt is the following: 
  "${topic}"
  Decide your stance on the topic and make an opening argument. Keep your
  response under 40 words. Write your response using only words, no special
  characters or formatting.
`
}

export default introPrompt
