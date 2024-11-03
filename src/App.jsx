import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

function App() {
  return (
    <div className="h-screen bg-slate-400 flex">
      <Sidebar />
      <div className="flex flex-col items-center  flex-grow">
        <Header />
        <Main />
      </div>
    </div>
  )
}

export default App
