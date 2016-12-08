<%@ page import="java.util.List" %>
<%@ page import="com.kami.tools.Position" %>
<%--
  Created by IntelliJ IDEA.
  User: shidian
  Date: 2016/12/2
  Time: 13:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String posJson = (String)request.getAttribute("positions");
    if (posJson==null) posJson="";
%>
<html>
<head>
    <title>RoomInfo</title>
    <link rel="stylesheet" href="../bootstrap/bootstrap.min.css" />
    <script src="../bootstrap/jquery-3.1.0.min.js"></script>
    <script src="../bootstrap/bootstrap.min.js"></script>
    <style>
        #hiddenInfo{
            display: none;
        }
        .containerR {
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
        #room-content{
            display: none;
        }
    </style>
    <script>
        function changePosition(index) {
            var rooms = $("#hiddenInfo").text();
            $("#myModal").modal('hide');
            var roomJson = eval(rooms);
            isShow(true,roomJson[index]);
            isFlash(true);
        }
        function showModal(){
            createRoom();
            $("#myModal").modal('show');
        }
        function createRoom() {
            var roomString = $("#hiddenInfo").text();
            var rooms = eval(roomString);
            $.each(rooms,function (i,item) {
                var tr = $("<tr><td>" + i + "</td><td>" + rooms[i].nameCn + "</td><td>" +
                        rooms[i].nameEn + "</td><td>" + rooms[i].building + "</td></td>" + "<td><a class='btn btn-primary btn-lg active' role='button' " +
                        "onclick='changePosition(" + i +
                        ")'>choose</a></td></tr>"
                );
                $("#modalTable").append(tr);
            });
        }
        function addLoadEvent(func) {
            var oldOnload = window.onload;
            if (typeof  window.onload != "function"){
                window.onload = func;
            }
            else{
                window.onload = function () {
                    if (oldOnload) oldOnload();
                    func;
                }
            }
        }

        addLoadEvent(showModal);

        function isShow(flag,jsonObj) {
            if (flag) {
                var obj = document.getElementById("meetingRoom");
                obj.style.left = jsonObj.left+"%";
                obj.style.top = jsonObj.top+"%";
                obj.style.width = jsonObj.width+"%";
                obj.style.height = jsonObj.height+"%";
                obj.style.visibility = "visible";
                $(".imgContent").attr("src", "./resource/map/"+jsonObj.path);
                $(".roomName").text(jsonObj.nameCn);
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
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">Room Infos</h4>
            </div>
            <div class="modal-body">
                <table class="table table-hover" id="modalTable">
                    <tr>
                        <th>Id</th>
                        <th>Name(CN)</th>
                        <th>Name(EN)</th>
                        <th>Buliding</th>
                        <th>Choose</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="containerR">
    <div class="mapContainer">
        <img class = "imgContent" src="" />
        <div id="meetingRoom">
            <p class="roomName"></p>
        </div>
    </div>
    <p id="room-content"></p>
</div>
<p id="hiddenInfo"><%=posJson%></p>
</body>

</html>
