import logo from './logo.svg';
import './App.css';
import { MapPin, Calendar, Heart, Plane, Search } from 'lucide-react';
import TravellAgent from './Components/TravellAgent';
import TravellingPlan from './Components/TravellingPlan';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
  <Routes>
      <Route path="/" element={<TravellAgent />} />
      <Route path="/plans" element={<TravellingPlan />} />
    </Routes>
  );
}

export default App;
