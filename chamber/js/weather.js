// Replace with actual API later
document.addEventListener('DOMContentLoaded', () => {
  const weatherDiv = document.getElementById('weather-data');
  const forecastList = document.getElementById('forecast-data');

  // Simulated data
  const current = {
    temp: '75°F',
    condition: 'Partly Cloudy',
    high: '85°',
    low: '52°',
    humidity: '34%',
    sunrise: '7:30am',
    sunset: '9:59pm'
  };

  const forecast = [
    { day: 'Today', temp: '90°F' },
    { day: 'Wednesday', temp: '89°F' },
    { day: 'Thursday', temp: '68°F' }
  ];

  weatherDiv.innerHTML = `
    <p><strong>${current.temp}</strong> - ${current.condition}</p>
    <p>High: ${current.high} | Low: ${current.low}</p>
    <p>Humidity: ${current.humidity}</p>
    <p>Sunrise: ${current.sunrise} | Sunset: ${current.sunset}</p>
  `;

  forecastList.innerHTML = forecast.map(day =>
    `<li><strong>${day.day}:</strong> ${day.temp}</li>`
  ).join('');
});
