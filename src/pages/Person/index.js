import React from 'react';
import './index.css';

function Person({name,birth,gender}) {
  return (
    <div className="person">
      <h1>{name}</h1>
      <p className="gender">{gender}</p>
      <p>{birth}</p>
      <hr/>
    </div>
  );
}

export default Person;
