import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Typing from "../Typing/Typing";
import styles from "./Multi.module.css";
import { useNavigate } from "react-router-dom";

const Multi = () => {
  const [socket, setSocket] = useState(null);
  const [roomUsers, setRoomUsers] = useState([]);
  const [username, setUsername] = useState(""); // State to hold the user's username
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the username is already stored in localStorage
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      // If the username is found in localStorage, set it in the state
      setUsername(storedUsername);
    } else {
      // If the username is not found in localStorage, prompt for it and store it
      const user = window.prompt("Please enter your name:");

      if (user) {
        setUsername(user);
        localStorage.setItem("username", user); // Store the username in localStorage
      } else {
        // If the user cancels the prompt, navigate back to the main page
        navigate("/");
        return;
      }
    }

    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    setSocket(socket);

    socket.emit("joinRoom", { roomId, username }); // Send the username to the server

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.disconnect();
    };
  }, [roomId, navigate, username]);

  useEffect(() => {
    if (socket) {
      socket.on("roomUsers", (users) => {
        setRoomUsers(users);
      });
    }
  }, [socket]);

  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <div className={styles.roomContainer}>
      <Typing />
      <div className={styles.userListContainer}>
        <h2>Users in the Room:</h2>
        <ul>
          {roomUsers.map((user, index) => (
            <li key={index}>{user.username}</li> // Use "username" property to display the name
          ))}
        </ul>
        <button className={styles.leaveButton} onClick={handleLeaveRoom}>
          Leave Room
        </button>
      </div>
      <div className={styles.userCard}>
        <h3>Room Creator: {username}</h3>
      </div>
    </div>
  );
};

export default Multi;
