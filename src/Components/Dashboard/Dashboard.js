import React, { useState } from "react";
import soloImage from "./images/solo1.jpg"; // Import the images
import multiplayerImage from "./images/multi.png";
import globalImage from "./images/global.png";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  return (
    <div className={styles.dashboard}>
      <h1>Welcome to the Word Chasing Game</h1>
      <div className={styles.description}>
        {/* Your description content here */}
      </div>
      <div className={styles.cardContainer}>
        <div
          className={`${styles.card} ${
            selectedCard === "solo" ? styles.selected : ""
          }`}
          onClick={() => handleCardClick("solo")}
        >
          <h3>Solo</h3>
          <img src={soloImage} alt="Solo Game" className={styles.cardImage} />
          <div className={styles.cardText}>
            <p>Play a solo game</p>
          </div>
        </div>
        <div
          className={`${styles.card} ${
            selectedCard === "multiplayer" ? styles.selected : ""
          }`}
          onClick={() => handleCardClick("multiplayer")}
        >
          <h3>Multiplayer</h3>
          <img
            src={multiplayerImage}
            alt="Multiplayer Game"
            className={styles.cardImage}
          />
          <div className={styles.cardText}>
            <p>Play with friends</p>
          </div>
        </div>
        <div
          className={`${styles.card} ${
            selectedCard === "global" ? styles.selected : ""
          }`}
          onClick={() => handleCardClick("global")}
        >
          <h3>Global</h3>
          <img
            src={globalImage}
            alt="Global Game"
            className={styles.cardImage}
          />
          <div className={styles.cardText}>
            <p>Play with players from all over the world</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
