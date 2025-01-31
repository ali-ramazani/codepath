import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const API_KEY = '3ac2fc85-f0e3-4fb4-b4fc-f3263aa9fdac';

function APIForm({ handleNewItem, banList, setBanList }) {
  
  const [artData, setArtData] = useState({});
  const [nextUrl, setNextUrl] = useState(null);

  const fetchData = async (retryCount = 0) => {
    if (retryCount >= 5) {
      console.error('Max retries reached');
      return;
    }
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&size=1&page=${randomPage}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const result = data.records[0];
  
      if (result.title && result.primaryimageurl) {
        if (!banList.includes(result.culture)) {
          setArtData(result);
          handleNewItem(result);
          setNextUrl(data.info.next || null);
        } else {
          fetchData(retryCount + 1);
        }
      } else {
        fetchData(retryCount + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-xl font-bold mb-4">Discover Art from Harvard's Museum</h1>
        <Button variant="dark" onClick={() => fetchData()} className="mb-4 font-bold">Discover</Button>
        
        {artData && artData.title && (
          <div>
            <h2 className="text-lg font-bold">{artData.title}</h2>
            <p className="text-gray-700">{artData.culture}</p>
            <p className="text-gray-600">{artData.description}</p>
            <img src={artData.primaryimageurl} alt={artData.title} className="mt-4 rounded-md shadow-lg max-w-full h-auto" />
          </div>
        )}

        <div className="mt-4">
          {artData.culture && (
            <Button variant="danger" onClick={() => setBanList([...banList, artData.culture])}>
              Ban {artData.culture}
            </Button>
          )}
        </div>
        
        {nextUrl ? (
          <Button variant="dark" onClick={() => fetchData(nextUrl)} className="mt-4">Next</Button>
        ) : (
          <p className="mt-4 text-gray-600">No more items to show</p>
        )}
      </div>
    </div>
  );
}

export default APIForm;
