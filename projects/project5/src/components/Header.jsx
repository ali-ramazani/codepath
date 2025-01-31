import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center w-full">
      <h1 className="text-white text-3xl">CryptiQ</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#home" className="text-gray-300 hover:text-white">Home</a></li>
          <li><a href="#about" className="text-gray-300 hover:text-white">About</a></li>
          <li><a href="#services" className="text-gray-300 hover:text-white">Services</a></li>
          <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;