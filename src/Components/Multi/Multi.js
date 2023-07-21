import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Typing from "../Typing/Typing";
import styles from "./Multi.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Multi = () => {
  const [socket, setSocket] = useState(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    setSocket(socket);

    socket.emit("joinRoom", roomId);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      socket.on("roomUsers", (users) => {
        setRoomUsers(users);
      });
    }
  }, [socket]);

  const handleLeaveRoom = () => {
    navigate("/"); // Use navigate to go back to the main page
  };

  return (
    <div className={styles.roomContainer}>
      <Typing />
      <div className={styles.userListContainer}>
        <h2>Users in the Room:</h2>
        <ul>
          {roomUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
        <button className={styles.leaveButton} onClick={handleLeaveRoom}>
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default Multi;
