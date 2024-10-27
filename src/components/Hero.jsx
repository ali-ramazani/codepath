const Hero = () => {
  return (
    <section
      className="bg-gray-900 text-white py-10"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold">CryptiQ</span>
        </div>
        <ul className="flex space-x-6">
          <li><a href="#home" className="hover:text-gray-400">Home</a></li>
          <li><a href="#about" className="hover:text-gray-400">About</a></li>
          <li><a href="#services" className="hover:text-gray-400">Services</a></li>
          <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </nav>
      <div className="container mx-auto text-center bg-black bg-opacity-50 p-10 rounded mt-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to CryptiQ</h1>
        <p className="text-lg mb-8">Your one-stop solution for all cryptocurrency insights and analytics.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative">
          Get Started
          <span className="absolute top-0 right-0 mt-1 mr-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
