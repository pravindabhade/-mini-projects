const apiKey = "YOUR_API_KEY";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");

// Create error message if it doesn't exist
let error = document.querySelector(".error");

if (!error) {
    error = document.createElement("div");
    error.className = "error";
    error.innerHTML = "❌ Invalid city name!";
    document.querySelector(".card").appendChild(error);
}

// Fetch Weather
async function checkWeather(city) {

    try {

        const response = await fetch(
            apiUrl + city + `&appid=${apiKey}`
        );

        if (!response.ok) {
            error.style.display = "block";
            weather.style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";

        document.querySelector(".wind").innerHTML =
            data.wind.speed + " km/h";

        // Weather Icons
        switch (data.weather[0].main) {

            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;

            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;

            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;

            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;

            case "Mist":
            case "Fog":
            case "Haze":
                weatherIcon.src = "images/mist.png";
                break;

            case "Snow":
                weatherIcon.src = "images/snow.png";
                break;

            default:
                weatherIcon.src = "images/clouds.png";
        }

        weather.style.display = "block";
        error.style.display = "none";

    } catch (err) {
        error.style.display = "block";
        weather.style.display = "none";
        console.error(err);
    }
}

// Search Button
searchBtn.addEventListener("click", () => {

    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }

});

// Press Enter
searchBox.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        if (searchBox.value.trim() !== "") {
            checkWeather(searchBox.value.trim());
        }

    }

});

// Default City
checkWeather("Pune");