function Card({ name, skill, rating }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-64 h-64 mx-auto border border-gray-300 flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Player</h2>
      <p className="text-gray-600"><span className="font-semibold">Name: {name}</span></p>
      <p className="text-gray-600"><span className="font-semibold">Skill level: {skill}</span></p>
      <p className="text-gray-600"><span className="font-semibold">Rating: {rating}</span></p>
    </div>
  );
};

export default Card;