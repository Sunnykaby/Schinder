<%--
  Created by IntelliJ IDEA.
  User: shidian
  Date: 2016/12/1
  Time: 16:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Meeting Room Search</title>
    <link rel="stylesheet" href="../bootstrap/bootstrap.min.css" />
    <script src="../bootstrap/jquery-3.1.0.min.js"></script>
    <script src="../bootstrap/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="row">
            <form role="form" action="/searchRoom">
                <div class="form-group">
                    <label for="roomName">RoomName</label>
                    <input type="text" name="name" class="form-control" id="roomName" placeholder="Enter room name" >
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </div>
</body>
</html>
