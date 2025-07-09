
import './App.css';

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
