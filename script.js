console.log("Hej från script.js!");
// Anslut till WebSocket-servern
// Back-end körs på http://localhost:8080 och WebSocket-endpoint är /websocket inne i configurationen
const socket = new SockJS("http://localhost:8080/websocket");
const messageList = document.getElementById("messageList");
const sendText = document.getElementById("sendText");
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

    // Prenumrera på chat-meddelanden
    stompClient.subscribe('/topic/chat', (chat) => { 
        console.log("Chat: ", JSON.parse(chat.body).chat);

        let li = document.createElement("li");
        li.innerText = JSON.parse(chat.body).chat;
        messageList.appendChild(li);
    })

    sendHello("Tania ");
 
})
// Använder name från back-end, inne i HelloMessage-klassen
function sendHello(name) {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': name}));
}
// Skicka meddelande till backend när knappen klickass
sendBtn.addEventListener("click", () => {
    // Skapa /chat endpoint i backend
    stompClient.send("/app/chat", {}, JSON.stringify({'content': sendText.value}));
    sendText.value = ""; // Rensa input-fältet
})
