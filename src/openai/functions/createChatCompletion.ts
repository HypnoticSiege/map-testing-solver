import openai from "../client";

async function createChatCompletion(prompt: string) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "You are MapGPT, a AI that solves MAP Testing problems. Please answer the following question with nothing but the answer."
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    return completion.data.choices;
}

export default createChatCompletion;