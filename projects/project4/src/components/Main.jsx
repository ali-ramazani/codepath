function Main() {
  return (
    <div className="flex flex-col items-center px-8 py-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Chess Team Builder</h2>
      <p className="text-gray-600 max-w-md text-center">
        Use this application to build your custom chess team. You can add players, specify their skills, and view your team on the View Team page. Click on Add Chess Players to get started!
      </p>
      <img src="https://images.crazygames.com/chess-free_16x9/20240820031635/chess-free_16x9-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop" alt="Chess Board" className="mt-8 rounded-lg shadow-lg w-160 h-80" />
    </div>
  );
}

export default Main;
