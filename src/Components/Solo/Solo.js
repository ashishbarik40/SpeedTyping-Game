// Solo.js (Solo component)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Solo.module.css";

const Solo = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const navigate = useNavigate();

  const handleDifficultyClick = (difficulty) => {
    // console.log(difficulty);
    setSelectedDifficulty(difficulty);
  };

  const handleDurationClick = (duration) => {
    // console.log(duration);
    setSelectedDuration(duration);
  };

  function sendInfo({ selectedDifficulty, selectedDuration }) {
    if (selectedDifficulty === "" || selectedDuration === "") {
      alert("Please select both difficulty and duration :)");
      return;
    }
    const myInfo = {
      difficulty: selectedDifficulty,
      duration: selectedDuration,
    };
    // console.log(myInfo);
    const myInfoString = JSON.stringify(myInfo);
    // console.log(myInfoString);
    localStorage.setItem("info", myInfoString);
    navigate("/dashboard/typing");
  }

  return (
    <div className={styles.container}>
      <h1>Customize Solo Game!</h1>
      <div className={styles.cardGroup}>
        <div className={styles.card}>
          <h2 className={styles.h2class}>Select Difficulty</h2>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.cardButton} ${
                selectedDifficulty === "easy" ? styles.selected : ""
              }`}
              onClick={() => handleDifficultyClick("easy")}
            >
              Easy
            </button>
            <button
              className={`${styles.cardButton} ${
                selectedDifficulty === "medium" ? styles.selected : ""
              }`}
              onClick={() => handleDifficultyClick("medium")}
            >
              Medium
            </button>
            <button
              className={`${styles.cardButton} ${
                selectedDifficulty === "hard" ? styles.selected : ""
              }`}
              onClick={() => handleDifficultyClick("hard")}
            >
              Hard
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <h2 className={styles.h2class}>Select Duration</h2>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.cardButton} ${
                selectedDuration === "15" ? styles.selected : ""
              }`}
              onClick={() => handleDurationClick("15")}
            >
              15 Secs
            </button>
            <button
              className={`${styles.cardButton} ${
                selectedDuration === "30" ? styles.selected : ""
              }`}
              onClick={() => handleDurationClick("30")}
            >
              30 Secs
            </button>
            <button
              className={`${styles.cardButton} ${
                selectedDuration === "60" ? styles.selected : ""
              }`}
              onClick={() => handleDurationClick("60")}
            >
              1 Min
            </button>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        {/* Pass the selected difficulty and duration as props to the Typing component */}

        <button
          className={`${styles.mainButton} ${
            selectedDifficulty || selectedDuration ? styles.clicked : ""
          }`}
          onClick={() => sendInfo({ selectedDifficulty, selectedDuration })}
        >
          Proceed to play
        </button>
      </div>
    </div>
  );
};

export default Solo;
