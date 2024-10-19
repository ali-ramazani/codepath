import './App.css'
import Header from './components/Header'
import './index.css';  
import Summaries from './components/Summaries';


const API_KEY = import.meta.env.VITE_API_KEY; 

function App() {
  console.log(API_KEY)

  return (
    <div className="main-container">
      <Header />
      <Summaries />
    </div>
  )
}

export default App
