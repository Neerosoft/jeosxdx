var username;
var websocket = new WebSocket("ws://64.91.249.118:8989/Sala/test");

websocket.onmessage = function(evt) { 
	chatRoomField.innerHTML += evt.data + "\n";
};

function join() {
    username = newUserField.value;
    websocket.send("*** " + username + " se ha unido!!");
    newUserField.disabled = true;
    newUserButton.disabled = true;
    chatRoomField.disabled = false;
    sendField.disabled = false;
    sendButton.disabled = false;
    window.alert("ws://64.91.249.118:8989/Sala/test");
}

function send_message() {
    websocket.send(username + ": " + sendField.value);
}