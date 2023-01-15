const ws = new WebSocket("ws://localhost:8080/mess");

ws.onopen = function (){};

ws.onmessage = function (event) {
    action(event.data);
};

ws.onerror = function (event) {};
ws.onclose = function (){};

function action(message) {
    const output = document.getElementById("messages");
    const newP = document.createElement("p");
    const newI = document.createElement("i");
    const strMess = message.toString()
    const dblDot = strMess.indexOf(':')
    const name = strMess.substring(0, dblDot);
    const mess = strMess.substring(dblDot);
    const data = new Date();
    newI.appendChild(document.createTextNode(name+' / ' + data.toLocaleString() + " "));
    newP.appendChild(newI);
    newP.appendChild(document.createTextNode(mess));
    output.appendChild(newP);
}

function sendMess(){
    let name = document.getElementById("name").value;
    let message = document.getElementById("mess").value;
    ws.send( name + ': ' + message);
}