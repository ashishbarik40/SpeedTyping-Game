import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Multi from "./Components/Multi/Multi";
import Typing from "./Components/Typing/Typing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/multi" element={<Multi />} />
        <Route path="/dashboard/solo" element={<Typing />} />
        {/* /* <Route path="/room/:roomId" element={<Room />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
