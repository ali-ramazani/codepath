import React from 'react';
import '../styles/EventCard.css';

function EventCard({ image_url, name, date, time, location, description, more_info }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={image_url} alt={name} />
        <h1>{name}</h1>
      </div>
      <div className="card-details">
        <span><i className="fa fa-calendar icon"></i>{date}</span>
        <span><i className="fa fa-map-marker icon"></i>{location}</span>
        <span><i className="fa fa-clock"></i>{time}</span>
      </div>
      <div className="card-text">
        <p>{description}</p>
      </div>
      <div className="read-more"><a href={more_info} alt={name} target="_blank">Read More</a></div>
    </div>
  );
}

export default EventCard;
