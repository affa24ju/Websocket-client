console.log("Hej från script.js!");
// Anslut till WebSocket-servern
// Back-end körs på http://localhost:8080 och WebSocket-endpoint är /websocket inne i configurationen
const socket = new SockJS("http://localhost:8080/websocket");
const messageList = document.getElementById("messageList");
const sendBtn = document.getElementById("sendBtn");

const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => { 
    console.log('Connected: ' + frame);  

    // Prenumerera på meddelanden från servern
    stompClient.subscribe('/topic/greetings', (greeting) => { 
        console.log("Greeting: ", JSON.parse(greeting.body).content);

        // Visa meddelandet som en lista till klienten
        let li = document.createElement("li");
        li.innerText = JSON.parse(greeting.body).content;
        messageList.appendChild(li);
        
    })
    sendHello("Från klienten: Tania "); // Skicka ett meddelande när anslutningen är upprättad  
})
// Använder name från back-end, inne i HelloMessage-klassen
function sendHello(name) {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': name}));
}