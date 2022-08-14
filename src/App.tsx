import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "pages/Home";
import { Dashboard } from "pages/Dashboard";
import "css/App.css";

function App() {
  return (
    <div className='content-container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}

export default App;
