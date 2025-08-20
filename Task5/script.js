const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityElem = document.getElementById("city");
const descriptionElem = document.getElementById("description");
const temperatureElem = document.getElementById("temperature");
const detailsElem = document.getElementById("details");
const weatherInfo = document.getElementById("weather");

// Fetch weather by city name
async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert("Unable to fetch weather.");
  }
}

// Display weather info
function displayWeather(data) {
  weatherInfo.style.display = "block";
  cityElem.textContent = `${data.name}, ${data.sys.country}`;
  descriptionElem.textContent = `🌥 ${data.weather[0].description}`;
  temperatureElem.textContent = `🌡 ${data.main.temp} °C`;
  detailsElem.textContent = `💧 Humidity: ${data.main.humidity}% | 💨 Wind: ${data.wind.speed} m/s`;
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => alert("Location access denied.")
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
});
