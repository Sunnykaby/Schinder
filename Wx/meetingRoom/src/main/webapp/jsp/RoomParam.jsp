<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style>
  .roomSearchF{
    border-style: solid;
    border-width: 1px;
    border-color: #778899;
  }
</style>
</head>
<body>
	<form id="demoForm" method="post" action="../roomParam">
            Top:<br>
            <input type="text" name="top"/>
            <br>
            Left:<br>
            <input type="text" name = "left"/>
            <br>
            Width:<br>
            <input type="text" name = "width"/>
            <br>
            Height:<br>
            <input type="text"  name = "height"/>
          	<br>
          	MapDir:<br>
          	<input type="text" name = "mapDir">
          		<br>
          	RoomName:<br>
          	<input type="text" name = "room">
            <br>
            <br>
            <input type="submit" value="changeRoomParam">
        </form>
        
        <form class="roomSearchF" method="post" action="../roomSearch">
            Meeting Room:
            <input type="text" name="roomName"/>
            <input type="submit" value="roomName">
        </form>
        

</body>
</html>