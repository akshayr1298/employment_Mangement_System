import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import User from "./Component/Home/User";

function App() {
  return (
    <div className="App">
      <Route path="/" component={User} />
      <Route path="/home" />
    </div>
  );
}

export default App;
