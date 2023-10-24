import logo from "./logo.svg";
import "./App.css";
import Home from "./Home/Home";
import Signup from "./SignUp/Signup";
import Login from "./Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup2 from "./SignUp/Signup2";
import Login2 from "./Login/Login2";

function App() {
  const user = localStorage.getItem("username");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user !== "" && <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account/login" element={<Login2 />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
      </Routes>
    </div>
  );
}

export default App;
