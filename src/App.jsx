import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ChoreAnalytics from './pages/ChoreAnalytics';
import About from './pages/About';

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<About/>} />
        <Route path="/choretracker" element={<ChoreAnalytics/>} />
        <Route path="/home" element={<Home />} />
      </Routes>  
      </>
)}

export default App;
