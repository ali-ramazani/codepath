import { useNavigate } from 'react-router-dom';

function Badge({ bgcolor }) {
  return (
    <div
      style={{ backgroundColor: bgcolor }}
      className="absolute top-2 left-2 w-4 h-4 rounded-full"
    ></div>
  );
}

function Card({ id, name, skill, bgcolor, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teammate/${id}`); 
  };

  return (
    <div
      onClick={handleClick}
      className="relative shadow-lg rounded-xl p-6 max-w-sm mx-auto border border-gray-200 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <Badge bgcolor={bgcolor} />
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{name}</h2>
      <p className="text-gray-500 mb-4">
        <span className="font-semibold text-gray-600">Skill Level:</span> {skill}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onDelete();
        }}
        className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

export default Card;
