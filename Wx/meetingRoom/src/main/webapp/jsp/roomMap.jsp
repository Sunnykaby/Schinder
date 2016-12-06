<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.Map"%>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>MeetingRoom</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <script src="../bootstrap/jquery-3.1.0.min.js"></script>
    <style type="text/css">
        /*the container of img and rect */

        .container {
            position: relative;
            left: 0px;
            top: 0px;
            margin: 0;
            border: 0;
            padding: 0;
            width: 100%;
        }
        /*最好在容器中设定大小，而不是去适应img*/

        .mapContainer {
            position: absolute;
            width: 90%;
            left:5%;
        }

        #meetingRoom {
            position: absolute;
            background: #FFFF00;
            opacity: 0.5;
            visibility: hidden;
            text-align: center;
            -moz-box-shadow: 1px 1px 2px hsla(0, 0%, 0%, .3);
            -webkit-box-shadow: 1px 1px 2px hsla(0, 0%, 0%, .3);
            box-shadow: 1px 1px 2px hsla(0, 0%, 0%, .3);
        }

        .roomName {
            width: auto;
            height: auto;
            overflow: auto;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            font-size: 3vw;
        }

        .imgContent{
            width:100%;
        }

        #hidden-content{
            display: none;
        }
    </style>
    <%
        String rooms = new String(request.getParameter("data").getBytes("iso-8859-1"),"utf-8");
        if (rooms == null) {
            rooms = "";
        }
    %>

    <script>

        function isShow(flag) {
            if (flag) {
                var roomInfo = $("#room-content").text();
                var roomJson = eval(roomInfo);
                var obj = document.getElementById("meetingRoom");
                // if (obj.style.visibility=="hidden") {
                obj.style.left = roomJson.left+"%";
                obj.style.top = roomJson.top+"%";
                obj.style.width = roomJson.width+"%";
                obj.style.height = roomJson.height+"%";

                obj.style.visibility = "visible";
                // };
                $(".imgContent").src = "./resource/map/"+roomJson.path;
                $(".roomName").text(roomJson.nameCn);
            };

        }

        function isFlash(flag){
            if (flag) {
                var obj = document.getElementById("meetingRoom");
                var i = 0;
                var timer = null;
                clearInterval(timer);
                timer = setInterval(function(){
                    obj.style.visibility = (i++)%2?"hidden":"visible";
                    i>200&&(clearInterval(timer));
                }, 500);
            };
        }

    </script>
</head>

<body>
<div class="container">
    <div class="mapContainer">
        <img class = "imgContent" src="" />
        <div id="meetingRoom">
            <p class="roomName"></p>
        </div>
    </div>
    <p id="room-content"></p>
</div>
</body>
<script>
    //这个参数可以从后台传过来，动态的设置
    isShow(true);
    isFlash(true);
</script>

</html>