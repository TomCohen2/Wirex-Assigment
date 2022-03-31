import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from "./Components/SignIn";
import { useState, useEffect } from "react";
import DashBoard from "./Components/DashBoard";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [token]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={!token ? <SignIn /> : <DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
