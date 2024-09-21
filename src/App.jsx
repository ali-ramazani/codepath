import { useState } from 'react'
import Header from './components/Header';
import EventsContainer from './components/Events_Container';
import Footer from './components/Footer';
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <EventsContainer />
      <Footer />
      </div>
  )
}

export default App;
