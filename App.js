import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import User from "./components/User";

function App() {
  return (
    <div>
      <h1 className = "text-center font-bold text-3xl mt-5">
        Firebase
      </h1>
      <Router>
        <Routes>
          <Route exact path = "/" element = {<User />} />
          <Route path = "/signin" element = {< Signin/>} />
          <Route path = "/signup" element = {<Signup />} />
        </Routes>
      </Router>     
    </div>
  );
}

export default App;
