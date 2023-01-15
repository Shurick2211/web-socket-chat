const ws = new WebSocket("ws://localhost:5000/mess");

ws.onopen = function (){

};

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
    const dblDot = strMess.indexOf('/:')
    const name = strMess.substring(0, dblDot);
    const mess = strMess.substring(dblDot);
    newI.appendChild(document.createTextNode(name+ " "));
    newP.appendChild(newI);
    newP.appendChild(document.createTextNode(mess));
    output.appendChild(newP);
}

function sendMess(){
    const data = new Date();
    let name = document.getElementById("name").value;
    let message = document.getElementById("mess").value;
    ws.send( name + ' / ' + data.toLocaleString() + ' /: ' + message);
}