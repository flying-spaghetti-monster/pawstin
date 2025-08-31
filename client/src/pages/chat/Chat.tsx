import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

export const Chat: React.FC = () => {
  const [room, setRoom] = useState<string>("room1"); // выбранная комната
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("systemMessage", (msg: string) => {
      setMessages((prev) => [...prev, { user: "SYSTEM", text: msg }]);
    });

    return () => {
      socket.off("newMessage");
      socket.off("systemMessage");
    };
  }, []);

  const joinRoom = () => {
    socket.emit("joinRoom", room);
    setMessages([]); // очистим чат при переходе
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", room);
    setMessages([]);
  };

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { room, message: input });
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat with Rooms</h2>

      <div>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room name"
        />
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>

      <div
        style={{ border: "1px solid black", height: "200px", overflow: "auto", marginTop: 10 }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <b>{msg.user}: </b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};