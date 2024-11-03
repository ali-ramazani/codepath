import { useState, useEffect } from 'react';
import { supabase } from '../Client';
import Card from './Card';

function Main() {
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    const fetchTeammates = async () => {
      const { data, error } = await supabase.from('ChessTeamBuilder').select();
      if (error) {
        console.log('Error fetching teammates:', error.message);
        return;
      }
      setTeammates(data || []);
    };

    fetchTeammates();
  }, []);

  return (
    <div className="flex flex-col items-center px-8 py-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Chess Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teammates.map(teammate => (
          <Card 
            key={teammate.id}
            name={teammate.name}
            skill={teammate.skill}
            rating={teammate.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
