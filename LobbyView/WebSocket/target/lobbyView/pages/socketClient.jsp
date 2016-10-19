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
    <script>
        var webServer = 'ws://localhost:8080/wsServer';
        var webSocket = new WebSocket(webServer);
        webSocket.onopen = function (evt) {
            open(evt);
        }
        webSocket.onclose = function (evt) {
            close(evt);
        }
        webSocket.onmessage = function (evt) {
            onmessage(evt);
        }
        webSocket.onerror = function (evt) {
                onerror(evt);
        }

        function onopen(evt) {
           // console.log("Connect to the Socket Server");
            document.getElementById("messageInfo").innerHTML += "Connection is ok!";
        }
        function onclose(evt) {
           // console.log("Disconnect to the Server");
            document.getElementById("messageInfo").innerHTML += "Connection is over";
        }

        function onmessage(evt) {
            //console.log("The message is " + evt.data);
            document.getElementById("messageInfo").innerHTML += "Message is !" + evt.data;

        }
        function onerror(evt) {
            //console.log("Error is  " + evt.data);
            document.getElementById("messageInfo").innerHTML += "Error is !" + evt.data;
        }

        function sendMessage() {
            webSocket.send("This is the Client.");
        }
    </script>
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
</html>
