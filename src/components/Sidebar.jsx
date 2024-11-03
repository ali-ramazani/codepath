import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-60 bg-white h-screen flex flex-col items-center pt-8 shadow-lg">
      <img src="src/assets/logo.avif" className="w-24 h-24 mb-4" alt="Logo" />
      <h1 className="font-bold text-2xl text-gray-800 mb-6">Chess Team Builder</h1>
      <ul className="text-gray-600 text-lg space-y-3">
        <li className="hover:text-gray-800 cursor-pointer transition duration-300">
          <Link to="/">🏠 Home</Link>
        </li>
        <li className="hover:text-gray-800 cursor-pointer transition duration-300">
          <Link to="/add-player">➕ Add Chess Player</Link>
        </li>
        <li className="hover:text-gray-800 cursor-pointer transition duration-300">
          <Link to="/view-team">👥 View Team</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
