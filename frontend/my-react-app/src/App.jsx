import { HashRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import PowerPointGenPage from "./pages/PowerPointGenPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<PowerPointGenPage/>} />
        <Route path="/9" element={<PowerPointGenPage/>} />
        <Route path="/!" element={<PowerPointGenPage/>} />
        <Route path="/@" element={<PowerPointGenPage/>} />
        <Route path="/3" element={<PowerPointGenPage/>} />
        <Route path="/$" element={<PowerPointGenPage/>} />
        <Route path="/%" element={<PowerPointGenPage/>} />
        <Route path="/6" element={<PowerPointGenPage/>} />
        <Route path="/&" element={<PowerPointGenPage/>} />
        <Route path="/*" element={<PowerPointGenPage/>} />
        <Route path="/(" element={<PowerPointGenPage/>} />
        <Route path="/)" element={<PowerPointGenPage/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;