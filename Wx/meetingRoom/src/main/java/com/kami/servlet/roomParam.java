package com.kami.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Servlet implementation class roomParam
 */
public class roomParam extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public roomParam() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("left", request.getParameter("left"));
        result.put("top", request.getParameter("top"));
        result.put("width", request.getParameter("width"));
        result.put("height", request.getParameter("height"));
        result.put("mapDir", request.getParameter("mapDir"));
        result.put("room", request.getParameter("room"));
        request.setAttribute("param", result);

        getServletContext().getRequestDispatcher("/jsp/schindler.jsp").forward(request, response);//this method keep request for direct

    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doGet(request, response);
    }

}
