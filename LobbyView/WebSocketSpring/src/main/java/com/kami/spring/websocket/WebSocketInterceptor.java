package com.kami.spring.websocket;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * Created by shidian on 2016/11/7.
 */

public class WebSocketInterceptor implements HandshakeInterceptor{
    /**
     * 我们将HttpSession放入WebSocketSession中（进行数据传输）
     * @param serverHttpRequest
     * @param serverHttpResponse
     * @param webSocketHandler
     * @param map
     * @return
     * @throws Exception
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
        ServletServerHttpRequest request = (ServletServerHttpRequest) serverHttpRequest;
        HttpSession session = request.getServletRequest().getSession();
        if (session != null){
            //区分socket连接，来定向发送信息
            //我们将存储在http session中的数据，转存在 websocket的session中。实现数据的定向交互
            map.put("user",session.getAttribute("user"));
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {

    }
}
