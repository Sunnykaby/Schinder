package com.kami.spring.websocket;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by shidian on 2016/11/7.
 */

@Service
public class SocketHandler implements WebSocketHandler {

    //存储各个用户的消息（多用户的连接）
    private static final ArrayList<WebSocketSession> users;

    static {
        users = new ArrayList<WebSocketSession>();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession webSocketSession) throws Exception {
        System.out.println("成功建立Socket连接");
        users.add(webSocketSession);
        String username = webSocketSession.getAttributes().get("user").toString();
        if (username!=null){
            webSocketSession.sendMessage(new TextMessage(username + ", 连接建立成功"));
        }
    }


    @Override
    public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {

    }


    @Override
    public void handleTransportError(WebSocketSession webSocketSession, Throwable throwable) throws Exception {
        if (webSocketSession.isOpen()){
            webSocketSession.close();
        }
        System.out.println("Error when transport");
        users.remove(webSocketSession);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {
        System.out.println("连接已关闭");
        users.remove(webSocketSession);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    /**
     *  向所有在线用户发message
     * @param textMessage
     */
    public void sendMessageToUsers(TextMessage textMessage){
        try {
            for (WebSocketSession user:
                    users) {
                if (user.isOpen()){
                    user.sendMessage(textMessage);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public void sendMessageToUser(String userName, TextMessage message){
        for (WebSocketSession user:
             users) {
            if (user.getAttributes().get("user").toString().equals(userName)){
                try {
                    user.sendMessage(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }
}
