const apiKey = 'YOUR_API_KEY';

document.addEventListener('DOMContentLoaded', () => {
    autoDetectLocation();
});

function autoDetectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    fetch(`/weather?location=${location}`)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(err => console.error(err));
}

function getWeatherByCoordinates(lat, lon) {
    fetch(`/weather?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(err => console.error(err));
}

function updateWeatherUI(data) {
    document.getElementById('weather-info').style.display = 'block';
    document.getElementById('city').innerText = data.name;
    document.getElementById('current-condition').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

    updateBackgroundImage(data.weather[0].main);
    displayForecast(data.forecast);
}

function updateBackgroundImage(condition) {
    let body = document.body;
    body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

    switch (condition.toLowerCase()) {
        case 'clear':
            body.classList.add('sunny');
            break;
        case 'clouds':
            body.classList.add('cloudy');
            break;
        case 'rain':
            body.classList.add('rainy');
            break;
        case 'snow':
            body.classList.add('snowy');
            break;
    }
}

function displayForecast(forecast) {
    let forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h3>Week Forecast</h3>';
    forecast.forEach(day => {
        forecastDiv.innerHTML += `
            <p>${day.date}: ${day.temp}°C, ${day.weather}</p>
        `;
    });
}
