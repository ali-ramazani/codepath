import { useState } from 'react';
import './index.css';  // Ensure this file has Tailwind directives
import APIForm from './components/APIForm';
import BanList from './components/BanList';
import ExploredSoFar from './components/ExploredSoFar';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [banList, setBanList] = useState([]);
  const [exploredItems, setExploredItems] = useState([]);

  const addToBanList = (attribute) => {
    setBanList([...banList, attribute]);
  }

  const handleNewItem = (item) => {
    setExploredItems([...exploredItems, item]);
  }

  return (
    <div className="main-container w-screen h-screen grid grid-cols-12 gap-0">
      <div className="explored-sofar-div col-span-3">
        <ExploredSoFar exploredItems={exploredItems}/>
      </div>
      <div className="api-form-div col-span-6 flex justify-center items-center">
        <APIForm handleNewItem={handleNewItem} banList={banList} setBanList={setBanList} />
      </div>
      <div className="ban-list-div col-span-3">
        <BanList banList={banList} addToBanList={addToBanList}/>
        
      </div>
    </div>
  );
}

export default App;
