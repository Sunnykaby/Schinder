package com.kami.spring.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


/**
 * Created by shidian on 2016/11/7.
 */
@Configuration
@EnableWebMvc
@EnableWebSocket
public class WebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer {
    @Autowired
    private SocketHandler socketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry){
        //注册处理拦截器，配置url和处理类的mapping
        webSocketHandlerRegistry.addHandler(socketHandler,"/socketServer").addInterceptors(new WebSocketInterceptor());

        //注册SockJS的处理拦截器，配置url和处理类的mapping
        webSocketHandlerRegistry.addHandler(socketHandler,"/sockjs/socketServer").addInterceptors(new WebSocketInterceptor());
    }
}
