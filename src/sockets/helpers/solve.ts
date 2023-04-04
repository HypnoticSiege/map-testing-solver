import utils from "../../utils";

async function solve(data, socket) {
    await socket.send(JSON.stringify({
        message: utils.stripHTML(data.question)
    }))
};

module.exports = solve;