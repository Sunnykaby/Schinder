package com.kami.spring.controller;

import com.kami.spring.websocket.SocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.socket.TextMessage;

import javax.servlet.http.HttpSession;

/**
 * Created by shidian on 2016/11/7.
 */
@Controller
@RequestMapping("/socket")
public class SocketController {
    @Autowired
    private SocketHandler socketHandler;

    @RequestMapping("/regis")
    public String regis(HttpSession httpSession){
        httpSession.setAttribute("user","Kami");
        return "home";
    }

    @RequestMapping(value = "/message", method = RequestMethod.GET)
    public String sendMessage(){
        socketHandler.sendMessageToUser("Kami", new TextMessage("This is a message from Server"));
        return "message";
    }
}
