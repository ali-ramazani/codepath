import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Client';

function TeammateInfo() {
  const { id } = useParams(); // Extract the teammate ID from the URL
  const [teammate, setTeammate] = useState(null);
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [bgcolor, setBgColor] = useState('#ffffff');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeammate = async () => {
      const { data, error } = await supabase
        .from('ChessTeamBuilder')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.log('Error fetching teammate:', error.message);
      } else {
        setTeammate(data);
        setName(data.name);
        setSkill(data.skill);
        setBgColor(data.bgcolor);
      }
    };

    fetchTeammate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('ChessTeamBuilder')
      .update({ name, skill, bgcolor })
      .eq('id', id);

    if (error) {
      console.log('Error updating teammate:', error.message);
    } else {
      console.log('Teammate updated successfully');
      navigate('/view-team'); // Redirect back to the team view page after updating
    }
  };

  if (!teammate) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Edit Teammate</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Skill Level</label>
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
            required
          >
            <option value="">Select Skill Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Background Color</label>
          <input
            type="color"
            value={bgcolor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer p-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium text-lg hover:bg-blue-700 transition"
        >
          Update Info
        </button>
      </form>
      <button
        onClick={() => navigate('/view-team')}
        className="mt-4 w-full bg-gray-500 text-white rounded-lg py-2 font-medium text-lg hover:bg-gray-600 transition"
      >
        Cancel
      </button>
    </div>
  );
}

export default TeammateInfo;
