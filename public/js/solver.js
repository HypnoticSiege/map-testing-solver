let socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => { console.log('Connected to WebSocket Server') };
socket.onclose = () => {
    console.log('Disconnected from WebSocket Server')
    setTimeout(() => {
        socket = new WebSocket('ws://localhost:8080');
    });
};
socket.onerror = (error) => { console.log('Error connecting to WebSocket Server', error) };

socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log(data);

    if (data.type === 'solve') {
        document.getElementById('answer').value = data.message;
    }
};

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();

    let question = document.getElementById('question').value;

    socket.send(JSON.stringify({
        action: 'solve',
        question: question
    }));
});