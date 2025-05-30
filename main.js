var search = document.getElementById('search_button');
const API_key = "bcd89a6f9b78aec6b86d7f6dc4ec2ed5";
var base_url = "https://api.openweathermap.org/data/2.5/weather?";

// Get current location's weather
function getCurrentWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(lat, lon);
        }, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Get weather by location name
function getLocWeather(loc) {
    const url = `${base_url}units=metric&q=${loc}&appid=${API_key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Location weather data:", data);
            updateWeatherUI(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

// Fetch weather using coordinates
function fetchWeather(lat, lon) {
    const url = `${base_url}lat=${lat}&lon=${lon}&units=metric&appid=${API_key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Geo-based weather data:", data);
            updateWeatherUI(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

// Update HTML with weather data
function updateWeatherUI(data) {
    const loc = data.name;
    const cont = data.sys.country;
    const tem = data.main.temp;
    const fel = data.main.feels_like;

    document.getElementById('text_location').innerHTML = loc;
    document.getElementById('text_county_location').innerHTML = cont;
    document.getElementById('text_temp').innerHTML = tem;
    document.getElementById('text_feelslike').innerHTML = fel;

    const desc = data.weather[0].description;
    document.getElementById('text_desc').innerHTML = desc;
}

// Handle location errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// On page load
getCurrentWeather();

// Search button
document.getElementById('search_button').addEventListener('click', function () {
    const location = document.getElementById('search_input').value;
    if (location) {
        getLocWeather(location);
    }
});
