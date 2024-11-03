import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main'; // Home Page
import AddPlayer from './components/AddPlayer';
import ViewTeam from './components/ViewTeam';

function App() {
  return (
    <Router>
      <div className="h-screen bg-slate-400 flex">
        <Sidebar />
        <div className="flex flex-col items-center flex-grow">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} /> 
            <Route path="/add-player" element={<AddPlayer />} /> 
            <Route path="/view-team" element={<ViewTeam />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
