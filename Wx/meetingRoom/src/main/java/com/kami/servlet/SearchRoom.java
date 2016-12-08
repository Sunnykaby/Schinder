package com.kami.servlet;

import com.google.gson.Gson;
import com.kami.tools.FileTools;
import com.kami.tools.Position;
import com.kami.tools.Positions;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by shidian on 2016/12/1.
 */
public class SearchRoom extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //String roomName = (String)request.getAttribute("name");
       String roomName = request.getParameter("name");
        String name = new String(roomName.getBytes("iso-8859-1"),"utf-8");//
        roomName = name;
        if (roomName == null) {
            System.out.println("Param wrong, please check it.");
            return;
        }
        FileTools fileTools = FileTools.getInstance();
        fileTools.setBasePath(getServletContext().getRealPath(""));
        fileTools.init("positionDB.txt");
        List<Position> lists = fileTools.searchRoom(roomName);
        for (Position temp:
                lists) {
            System.out.println(temp.toString());
        }
        //method 1:attribute
        request.setAttribute("info",lists);
        //method 2: JavaBean (using session)
        Positions positions = new Positions();
        positions.setPositions(lists);
        request.getSession().setAttribute("positions", positions);
        //return Json info
        Gson gson = new Gson();
        System.out.println(gson.toJson(lists));
        request.setAttribute("positions",gson.toJson(lists));
        getServletContext().getRequestDispatcher("/jsp/roomDemo.jsp").forward(request,response);
    }
}
