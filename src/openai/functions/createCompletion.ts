import openai from "../client";

async function createCompletion(prompt: string) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
    })
        .then((response) => {
            return response.data.choices[0].text;
        })
        .catch((error) => {
            console.log(error);
        });
    
    return completion;
}

export default createCompletion;