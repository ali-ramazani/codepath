import React from 'react';
import EventCard from './EventCard';
import '../styles/EventsContainer.css';
import {data} from '../data/data.js';

// 

function EventsContainer (){
  console.log("test", data)
  return (
    <div className="main_container">
      <h1>Here's a list of events happening within 60 days</h1>
    <div className="events_container">
      {data.map((event, index) => {
        return <EventCard key={index} name={event.name} date={event.date} time={event.time} location={event.location} image_url={event.image_url} description = {event.description} more_info={event.more_info} />
      })}
    </div>
    </div>
  )
}

export default EventsContainer;