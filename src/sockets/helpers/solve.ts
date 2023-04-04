import utils from "../../utils";
import openai from "../../openai";

async function solve(data, socket) {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'You are MapGPT, a model that will answer MAP Testing questions. Please respond to the following question with nothing but the answer.'
            },
            {
                role: 'user',
                content: utils.stripHTML(data.question)
            }
        ]
    })


    await socket.send(JSON.stringify({
        type: "solve",
        message: completion.data.choices[0].message.content
    }))
};

module.exports = solve;