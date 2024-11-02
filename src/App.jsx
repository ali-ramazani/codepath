
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className="h-screen bg-slate-400">
    <div className="flex">
    <Sidebar />
    <Header />
    </div>
    </div>
  )
}

export default App
