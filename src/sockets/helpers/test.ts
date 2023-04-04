async function test(data, socket) {
    await socket.send(JSON.stringify({
        message: 'Hello from the server!'
    }))
};

module.exports = test;