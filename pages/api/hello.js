import OpenAI from 'openai';
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  defaultHeaders: {
  },
});
async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-distill-llama-70b:free",
    messages: [
      {
        "role": "user",
        "content": "Create an example of gym routine"
      }
    ],
    
  });

  console.log(completion.choices[0].message);
}

main();