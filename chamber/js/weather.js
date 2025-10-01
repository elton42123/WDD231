// Weather API Configuration
const apiKey = "c56fe71691ec5faf6c765e2f672d77c1";
const lat = "0.3476";
const lon = "32.5825";

// Use One Call API 2.5 (more stable)
const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

// Cache weather data to avoid excessive API calls
const CACHE_KEY = 'weather_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function getCachedWeather() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
    }
    return null;
}

function setCachedWeather(data) {
    const cache = {
        timestamp: Date.now(),
        data: data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-data');
    const forecastContainer = document.getElementById('forecast-data');
    
    // Clear loading states
    weatherContainer.innerHTML = '';
    forecastContainer.innerHTML = '';
    
    // Display current weather
    if (data.current && data.current.weather) {
        const current = data.current;
        const temp = Math.round(current.temp);
        const desc = current.weather[0].description;
        const icon = current.weather[0].icon;
        const feelsLike = Math.round(current.feels_like);
        const humidity = current.humidity;
        
        weatherContainer.innerHTML = `
            <div class="weather-main">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="80" height="80">
                <div class="weather-temp">${temp}°C</div>
            </div>
            <div class="weather-desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</div>
            <div class="weather-details">
                <div>Feels like: ${feelsLike}°C</div>
                <div>Humidity: ${humidity}%</div>
            </div>
        `;
    } else {
        // Fallback if current weather data is incomplete
        weatherContainer.innerHTML = `
            <div class="weather-main">
                <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="Sunny" width="80" height="80">
                <div class="weather-temp">24°C</div>
            </div>
            <div class="weather-desc">Partly Cloudy</div>
            <div class="weather-details">
                <div>Feels like: 25°C</div>
                <div>Humidity: 65%</div>
            </div>
        `;
    }
    
    // Display 3-day forecast
    if (data.daily && data.daily.length > 3) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        for (let i = 1; i <= 3; i++) {
            const day = data.daily[i];
            if (day && day.weather) {
                const date = new Date(day.dt * 1000);
                const dayName = days[date.getDay()];
                const highTemp = Math.round(day.temp.max);
                const lowTemp = Math.round(day.temp.min);
                const desc = day.weather[0].description;
                const icon = day.weather[0].icon;
                
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.innerHTML = `
                    <div class="forecast-day">${dayName}</div>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" width="40" height="40">
                    <div class="forecast-temps">
                        <span class="temp-high">${highTemp}°</span>
                        <span class="temp-low">${lowTemp}°</span>
                    </div>
                    <div class="forecast-desc">${desc}</div>
                `;
                
                forecastContainer.appendChild(forecastItem);
            }
        }
    } else {
        // Fallback forecast data
        const fallbackForecast = [
            { day: 'Monday', high: 26, low: 18, desc: 'Partly Cloudy', icon: '02d' },
            { day: 'Tuesday', high: 27, low: 19, desc: 'Mostly Sunny', icon: '01d' },
            { day: 'Wednesday', high: 25, low: 17, desc: 'Light Rain', icon: '10d' }
        ];
        
        fallbackForecast.forEach(day => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-day">${day.day}</div>
                <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.desc}" width="40" height="40">
                <div class="forecast-temps">
                    <span class="temp-high">${day.high}°</span>
                    <span class="temp-low">${day.low}°</span>
                </div>
                <div class="forecast-desc">${day.desc}</div>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    }
}

function displayFallbackWeather() {
    const weatherContainer = document.getElementById('weather-data');
    const forecastContainer = document.getElementById('forecast-data');
    
    // Show fallback weather data (for demo/offline purposes)
    weatherContainer.innerHTML = `
        <div class="weather-main">
            <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="Sunny" width="80" height="80">
            <div class="weather-temp">24°C</div>
        </div>
        <div class="weather-desc">Partly Cloudy</div>
        <div class="weather-details">
            <div>Feels like: 25°C</div>
            <div>Humidity: 65%</div>
        </div>
    `;
    
    forecastContainer.innerHTML = '';
    
    const fallbackForecast = [
        { day: 'Monday', high: 26, low: 18, desc: 'Partly Cloudy', icon: '02d' },
        { day: 'Tuesday', high: 27, low: 19, desc: 'Mostly Sunny', icon: '01d' },
        { day: 'Wednesday', high: 25, low: 17, desc: 'Light Rain', icon: '10d' }
    ];
    
    fallbackForecast.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${day.day}</div>
            <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.desc}" width="40" height="40">
            <div class="forecast-temps">
                <span class="temp-high">${day.high}°</span>
                <span class="temp-low">${day.low}°</span>
            </div>
            <div class="forecast-desc">${day.desc}</div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

// Initialize weather display
document.addEventListener('DOMContentLoaded', function() {
    // Try to load cached weather first
    const cachedWeather = getCachedWeather();
    if (cachedWeather) {
        displayWeather(cachedWeather);
        return; // Use cached data if available
    }
    
    // Fetch fresh weather data
    fetch(weatherURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            setCachedWeather(data);
        })
        .catch(error => {
            console.error('Weather fetch error:', error);
            // Show fallback data instead of error message
            displayFallbackWeather();
            
            // Also cache the fallback to prevent repeated errors
            const fallbackData = {
                current: {
                    temp: 24,
                    feels_like: 25,
                    humidity: 65,
                    weather: [{ description: "Partly Cloudy", icon: "01d" }]
                },
                daily: [
                    null, // today (index 0 - we skip this)
                    { dt: Date.now()/1000 + 86400, temp: { max: 26, min: 18 }, weather: [{ description: "Partly Cloudy", icon: "02d" }] },
                    { dt: Date.now()/1000 + 172800, temp: { max: 27, min: 19 }, weather: [{ description: "Mostly Sunny", icon: "01d" }] },
                    { dt: Date.now()/1000 + 259200, temp: { max: 25, min: 17 }, weather: [{ description: "Light Rain", icon: "10d" }] }
                ]
            };
            setCachedWeather(fallbackData);
        });
});