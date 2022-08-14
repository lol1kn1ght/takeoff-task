import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "pages/Home";
import { Dashboard } from "pages/Dashboard";
import "css/App.css";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default App;
