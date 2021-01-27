keypresses = 0;

function pressed(event) {
    keypresses++;
    document.getElementById("pressesCount").innerHTML = "Leütések száma: "+keypresses;
    document.getElementById("pressesList").innerHTML += Date()+": <b>"+event.key+"</b> ("+event.keyCode+")<br>";
    document.getElementById("pressesListRaw").innerHTML += event.key;
}

function key(element,isPressed) {
    document.getElementById("header1").style.paddingLeft = isPressed ? "10px" : "0px";
}

setInterval(() => {
    document.title = Date();
}, 1000);