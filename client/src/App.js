import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import DomesticOption from "./pages/DomesticOption";
import { Helper } from "./pages/HelperLogin";
import { Messages } from "./pages/Message";
import { User } from "./pages/UserLogin";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/domesticOption" element={<DomesticOption/>}/>
          <Route path="/Messages" element={<Messages/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
