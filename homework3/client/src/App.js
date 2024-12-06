import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import Collections from "./pages/collections";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
