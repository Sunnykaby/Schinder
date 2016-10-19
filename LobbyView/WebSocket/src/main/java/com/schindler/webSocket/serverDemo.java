package com.schindler.webSocket;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * Created by shidian on 2016/10/19.
 */

/**
 * 在tomcat7中存在WebSocketServlet类（但已经过时），在tomcat8中彻底删除
 * 此处使用@ServerEndpoint注解，主要是将目前的类定义成一个websocket服务器端
 * 注解的值将被用于监听用户连接的终端访问URL地址
 */
@ServerEndpoint("/wsServer")
public class serverDemo {
    /**
     * 当服务器接收到客户端发送的消息时所调用的方法
     * 该方法可能包含一个javax.websocket.Session可选参数
     * 如果有这个参数，容器将会把当前发送消息客户端的连接Session注入进去
     */
    @OnMessage
    public void onMessage(String message, Session session) throws IOException, InterruptedException {
        //打印从client传递的信息
        System.out.println("Client message:" + message);
        //向客户端发送信息
        session.getBasicRemote().sendText("This is the first message from Server");
        int timeCount = 0;
        while (timeCount++ <4){
            Thread.sleep(1000);
            session.getBasicRemote().sendText("This is the " + timeCount +
                    "'th message from Server!");
        }
        session.getBasicRemote().sendText("This is the last message from Server.");
    }
    /**
     * 当一个新用户连接时所调用的方法
     * 该方法可能包含一个javax.websocket.Session可选参数
     * 如果有这个参数，容器将会把当前发送消息客户端的连接Session注入进去
     */
    @OnOpen
    public void onOpen(Session session){
        System.out.println("Client is connecting");
    }
    /** 当一个用户断开连接时所调用的方法*/
    @OnClose
    public void onClose(){
        System.out.println("Client is disconnected");
    }

}
