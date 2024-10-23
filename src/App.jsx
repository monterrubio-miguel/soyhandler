import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MensBracket from './pages/MensBracket';
import WomensBracket from './pages/WomensBracket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/varonil" element={<MensBracket />} />
        <Route path="/femenil" element={<WomensBracket />} />
      </Routes>
    </Router>
  );
}

export default App;
