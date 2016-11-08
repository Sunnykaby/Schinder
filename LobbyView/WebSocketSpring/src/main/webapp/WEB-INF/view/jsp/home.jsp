<%--
  Created by IntelliJ IDEA.
  User: shidian
  Date: 2016/11/7
  Time: 14:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName()+":"+request.getServerPort()+path+"/";
    String ws = "ws://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <title>Home</title>
</head>
<body>
<p><%=path%></p>
<p><%=basePath%></p>
<p><%=ws%></p>
<h1>This is a websocket Demo</h1>
<div id="message">

</div>
<script src="http://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="//cdn.bootcss.com/sockjs-client/1.1.1/sockjs.js"></script>
<script>
    $(function () {
        //建立连接
        var sock;
        if('WebSocket' in window){
            //normal explorer
            sock = new WebSocket("<%=ws%>socketServer");
        }
        else if('MozWebSocket' in window){
            //chrome等
            sock = new MozWebSocket("<%=ws%>socketServer");
        }
        else{
            // not support websocket
            sock = new SockJS("<%=ws%>sockjs/socketServer");
        }

        sock.onopen = function (e) {
            console.log(e);
        }
        sock.onmessage = function (e) {
            console.log(e);
            $("#message").append("<p>" + e.data + "</p>");
        }
        sock.onclose = function (e) {
            console.log(e);
        }
    });
</script>
</body>
</html>
