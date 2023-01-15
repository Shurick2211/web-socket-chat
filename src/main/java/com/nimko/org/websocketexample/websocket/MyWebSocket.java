package com.nimko.org.websocketexample.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
public class MyWebSocket extends TextWebSocketHandler {
    private final List<TextMessage> messages = new ArrayList<>();
    private final Set<WebSocketSession> sessions = new HashSet<>();
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        messages.add(message);
        sessions.add(session);
        sessions.forEach(ses -> {if (ses.isOpen()) {
            try {
                ses.sendMessage(message);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        });
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        messages.forEach(textMessage -> {
            try {
                session.sendMessage(textMessage);
            } catch (IOException e) {
                log.error("Error for messages",e);
                throw new RuntimeException(e);
            }
        });
    }


}
