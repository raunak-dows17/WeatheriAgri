import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Pestinfo from "./components/Pestinfo";
import Searchweather from "./components/SearchWeather";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Searchweather />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pest-in" element={<Pestinfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
