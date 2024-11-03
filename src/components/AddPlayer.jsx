import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Client';

function AddPlayer() {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [bgcolor, setBgColor] = useState('#ffffff');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('ChessTeamBuilder')
      .insert([{ name, skill, bgcolor }]);

    if (error) {
      console.log("Error adding player:", error.message);
    } else {
      console.log("Player added:", data);
      navigate('/view-team');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Player</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            placeholder="Enter player's name"
            required
          />
        </div>

        {/* Skill Level Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Skill Level</label>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            required
          >
            <option value="" disabled>Select Skill Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Background Color Picker */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Background Color</label>
          <input
            type="color"
            value={bgcolor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer p-1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium text-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Add Player
        </button>
      </form>
    </div>
  );
}

export default AddPlayer;
