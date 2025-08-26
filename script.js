console.log("Hej från script.js!");
// Anslut till WebSocket-servern
// Back-end körs på http://localhost:8080 och WebSocket-endpoint är /websocket inne i configurationen
const socket = new SockJS("http://localhost:8080/websocket");

const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => { 
    console.log('Connected: ' + frame);    
})
