import utils from "../../utils";

async function solve(data, socket) {
    await socket.send(JSON.stringify({
        type: "solve",
        message: utils.stripHTML(data.question)
    }))
};

module.exports = solve;