function Header() {
  return (
    <header style={{ backgroundColor: '#2c3e50' }} className="flex justify-between items-center p-5">
      <h1 className="text-5xl font-bold tracking-wide text-white drop-shadow-lg">SkyWatch</h1>
      <ul className="flex space-x-4 list-none">
        <li className="p-2 text-white">Home</li>
        <li className="p-2 text-white">About</li>
        <li className="p-2 text-white">Contact</li>
      </ul>
    </header>
  );
};

export default Header;