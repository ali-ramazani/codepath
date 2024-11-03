import React, { useState, useEffect } from 'react';
import { supabase } from '../Client';
import Card from './Card';

function ViewTeam() {
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    const fetchTeammates = async () => {
      const { data, error } = await supabase.from('ChessTeamBuilder').select('*');
      if (error) {
        console.log('Error fetching teammates:', error.message);
      } else {
        setTeammates(data || []);
      }
    };

    fetchTeammates();
  }, []);

  const deleteTeammate = async (id) => {
    const { error } = await supabase.from('ChessTeamBuilder').delete().eq('id', id);
    if (error) {
      console.log('Error deleting teammate:', error.message);
    } else {
      // Remove the deleted teammate from the local state to update the UI
      setTeammates(teammates.filter(teammate => teammate.id !== id));
    }
  };

  return (
    <div className="flex flex-col items-center px-8 py-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Chess Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teammates.length === 0 ? (
          <p className="text-gray-600">No players added yet. Go to Add Chess Player to start building your team.</p>
        ) : (
          teammates.map(teammate => (
            <Card
              key={teammate.id}
              id={teammate.id} // Pass id to Card for deletion
              name={teammate.name}
              skill={teammate.skill}
              bgcolor={teammate.bgcolor || '#ffffff'}
              onDelete={() => deleteTeammate(teammate.id)} // Pass delete function as a prop
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ViewTeam;
