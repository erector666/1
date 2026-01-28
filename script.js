// script.js

import { createWeatherComponent } from './weather-component.js';

// Function to insert the weather component into the page
function displayWeather(city, temperature, condition) {
 const weatherContainer = document.getElementById('weather-container');
 if (weatherContainer) {
 const weatherHTML = createWeatherComponent(city, temperature, condition);
 weatherContainer.innerHTML = weatherHTML;
 }
}

// Example usage
displayWeather('Lausanne',15, 'Sunny');