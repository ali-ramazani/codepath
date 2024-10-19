function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center p-5">
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