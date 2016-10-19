<%--
  Created by IntelliJ IDEA.
  User: shidian
  Date: 2016/10/18
  Time: 10:28
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div>
    <form>
        Server Address:<input type="text" name="serverAdd">
        <br/><br/>
        Port:<input type="text"><br/><br/>
        <input type="button" onclick="sendMessage()">Connect to Server
    </form>
</div>
<div id="messageInfo">
    Server Message
</div>
</body>
<script>
    var webServer = 'ws://localhost:8080/wsServer';
    var webSocket = new WebSocket(webServer);
    webSocket.onopen = function (evt) {
        onOpen(evt);
    }
    webSocket.onclose = function (evt) {
        onClose(evt);
    }
    webSocket.onmessage = function (evt) {
        onMessage(evt);
    }
    webSocket.onerror = function (evt) {
        onError(evt);
    }

    function onOpen(evt) {
        // console.log("Connect to the Socket Server");
        document.getElementById("messageInfo").innerHTML += "Connection is ok!";
    }
    function onClose(evt) {
        // console.log("Disconnect to the Server");
        document.getElementById("messageInfo").innerHTML += "Connection is over";
    }

    function onMessage(evt) {
        //console.log("The message is " + evt.data);
        document.getElementById("messageInfo").innerHTML += "Message is !" + evt.data;

    }
    function onError(evt) {
        //console.log("Error is  " + evt.data);
        document.getElementById("messageInfo").innerHTML += "Error is !" + evt.data;
    }

    function sendMessage() {
        webSocket.send("This is the Client.");
    }
</script>
</html>
