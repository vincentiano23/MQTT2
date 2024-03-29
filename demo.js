var client;

function startConnect() {
    var clientID = "clientID - " + parseInt(Math.random() * 100);

    var host = document.getElementById("host").value;
    var port = document.getElementById("port").value;
    var userId = document.getElementById("username").value;
    var passwordId = document.getElementById("password").value;

    document.getElementById("messages").innerHTML += "<span> Connecting to " + host + " on port " + port + "</span><br>";
    document.getElementById("messages").innerHTML += "<span> Using the client Id " + clientID + "</span><br>";
    client = new Paho.MQTT.Client(host, Number(port), "", clientID);


    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
        userName: userId,
        password: passwordId
    });

    function onConnect() {
        var topic = document.getElementById("topic_s").value;
        document.getElementById("messages").innerHTML += "<span> Subscribing to topic " + topic + "</span><br>";
        client.subscribe(topic);
    }
}

function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += "<span> ERROR: Connection is lost.</span><br>";
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += "<span> ERROR: " + responseObject.errorMessage + "</span><br>";
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += "<span> Topic: " + message.destinationName + " | Message: " + message.payloadString + "</span><br>";
}

function startDisconnect() {
    client.disconnect();
}

function publishMessage() {
    var topic = document.getElementById("topic_p").value;
    var message = new Paho.MQTT.Message(document.getElementById("message").value);
    message.destinationName = topic;
    client.send(message);
}
