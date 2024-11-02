function Sidebar() {
  return (
    <div className="w-60 bg-white h-screen flex flex-col items-center justify-start pt-4">
      <h1 className="font-bold text-xl">Chess-TeamBuilder</h1>
      <img src="src/assets/logo.avif" className="bg-transparent" />
      <ul className="mt-4">
        <li className="my-2">Home</li>
        <li className="my-2">Add Chess Player</li>
        <li className="my-2">View Team</li>
      </ul>
    </div>
  );
};

export default Sidebar;