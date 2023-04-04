const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => { console.log('Connected to WebSocket Server') };
socket.onclose = () => { console.log('Disconnected from WebSocket Server') };
socket.onerror = (error) => { console.log('Error connecting to WebSocket Server', error) };

socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log(data);

};