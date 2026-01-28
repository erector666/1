// weather-component.js

function createWeatherComponent(city, temperature, condition) {
 const weatherHTML = `
 <div class="weather-component">
 <h2>Weather in ${city}</h2>
 <p>Temperature: ${temperature}°C</p>
 <p>Condition: ${condition}</p>
 </div>
 `;
 return weatherHTML;
}

export default createWeatherComponent;