import React from "react";
import "./Card.css";

const Card = ({ name, location, image }) => (

  <div className="card">
    <img src="/photoProfile.png" alt={name} className="card-image" />
    <div className="card-content">
      <h3 className="card-title">{name}</h3>
      <p className="card-subtitle">At-Work</p>
      <p className="card-location">{location}</p>
    </div>
  </div>
);

export default Card;
