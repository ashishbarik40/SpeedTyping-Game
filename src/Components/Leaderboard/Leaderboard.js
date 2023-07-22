import React from "react";
import styles from "./Leaderboard.module.css"; // Import the CSS module

const leaderboardData = [
  { name: "Player 1", wpm: 80 },
  { name: "Player 2", wpm: 95 },
  { name: "Player 3", wpm: 90 },
  { name: "Player 4", wpm: 75 },
  { name: "Player 5", wpm: 95 },
];

const Leaderboard = () => {
  leaderboardData.sort((a, b) => b.wpm - a.wpm);

  leaderboardData.forEach((player, index) => {
    player.rank = index + 1;
  });

  return (<div className={styles.LeaderboardDesign}>
    <div className={styles.container}>
      {" "}
      {/* Use the CSS module class name */}
      <h2 className={styles.heading}>Leaderboard</h2>{" "}
      {/* Use the CSS module class name */}
      <table className={styles.table}>
        {" "}
        {/* Use the CSS module class name */}
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>WPM</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player) => (
            <tr key={player.name}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.wpm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Leaderboard;
