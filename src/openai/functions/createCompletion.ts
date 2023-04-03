import openai from "../client";

async function createCompletion(prompt: string) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
    })
    
    return completion.data.choices[0].text as string || "";
}

export default createCompletion;