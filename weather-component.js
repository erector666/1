// weather-component.js

import React from 'react';

function WeatherComponent({ city, temperature, condition }) {
 return (
 <div className="weather-component">
 <h2>Weather in {city}</h2>
 <p>Temperature: {temperature}°C</p>
 <p>Condition: {condition}</p>
 </div>
 );
}

// Example usage:
// <WeatherComponent city="Lausanne" temperature="15" condition="Sunny" />

export default WeatherComponent;