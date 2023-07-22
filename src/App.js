import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Multi from "./Components/Multi/Multi";
import Solo from "./Components/Solo/Solo";
import Typing from "./Components/Typing/Typing";
import Leaderboard from "./Components/Leaderboard/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/multi" element={<Multi />} />
        <Route path="/dashboard/solo" element={<Solo />} />
        <Route path="/dashboard/typing" element={<Typing />} />
        <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
