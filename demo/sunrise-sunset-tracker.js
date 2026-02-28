(async function() {
 const API_URL = 'https://api.sunrise-sunset.org/json?lat=37.7749&lng=-122.4194&formatted=0';
 try {
 const response = await fetch(API_URL);
 if (!response.ok) throw new Error('Network response was not ok');
 const data = await response.json();
 const sunrise = new Date(data.results.sunrise);
 const sunset = new Date(data.results.sunset);
 const formatTime = (date) => date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
 const container = document.getElementById('tracker-container');
 container.innerHTML = `
<p>🌅 Sunrise:<strong>${formatTime(sunrise)}</strong></p>
<p>🌇 Sunset:<strong>${formatTime(sunset)}</strong></p>
 `
; } catch (err) {
 console.error('Failed to load sunrise/sunset data:', err);
 const container = document.getElementById('tracker-container');
 container.innerHTML = '<p>❗ Error loading sunrise/sunset data.</p>';
 }
})();