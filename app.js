const accessKey = "8bcf05ef0586dc427a55ece0a209c1b6";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");
const form = document.querySelector(".search");

async function checkWeather(city) {
    document.querySelector(".empty").style.display = "none";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".loading").style.display = "block";

    const response = await fetch(baseURL + city + `&appid=${accessKey}`);

    if (searchBox.value == "") {
        document.querySelector(".empty").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".loading").style.display = "none";

    } else if (response.status == 404) {
        document.querySelector(".empty").style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".loading").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".empty").style.display = "none";
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none";
        document.querySelector(".loading").style.display = "none";

    }



}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkWeather(searchBox.value);
})

