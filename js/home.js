const body = document.body;
const inputField = document.querySelector(".input-parent input");
let header = document.querySelector(".header");
let headerImg = document.querySelector(".header img");
let weekInfo = document.createElement("section");
weekInfo.className = "weather-info";
let weekInfoContainer = document.createElement("div");
weekInfoContainer.className = "container";
weekInfo.append(weekInfoContainer);

let userLat, userLon, userCity;
let apiKey = "d0139168498c4f66d3fb31b4d374f145"

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getUserLocationWeather, showError);

    function getUserLocationWeather(userLocation) {
      userLat = userLocation.coords.latitude;
      userLon = userLocation.coords.longitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${apiKey}`
      ).then((response) => response.json()).then((userWeather) => {
        userCity = userWeather.name;
        fetchWeatherData(userCity);
      })
    }
  } else {
    alert("your browser doesn't support geographic locations")
  }
 function showError(error) {

      if (error.PERMISSION_DENIED) {
        alert("Please allow access to your location to show your weather data");
      }
    }
}


inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (e.target.value.trim() !== "") {
      let searchTerm = e.target.value;
      fetchWeatherData(searchTerm);
    }
  }
});

function fetchWeatherData(searchTerm) {
  let lat,
    lon,
    countryName,
    cityName,
    currentDayData,
    dailyData,
    apiKey = "d0139168498c4f66d3fb31b4d374f145";
  fetch(

      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`
    )
    .then((res) => res.json())
    .then((weatherInfo) => {
      lat = weatherInfo.coord.lat;
      lon = weatherInfo.coord.lon;
      countryName = weatherInfo.sys.country;
      cityName = weatherInfo.name;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
      )

        .then((info) => info.json())
        .then((db) => {
          currentDayData = db.current;
          dailyData = db.daily.slice(1, 7);
          renderCurrentDayData(currentDayData, countryName, cityName);
          renderDailyData(dailyData);
        });
    })
    // If the search term is INVALID, a popup will show to ask the user to re-write a VALID input
    .catch((err) => placeNotFound(searchTerm));
}

function renderCurrentDayData(data, countryName, cityName) {
  // Remove previous data if the search term is valid
  weekInfoContainer.innerHTML = "";
  if (document.querySelector(".current-day"))
    document.querySelector(".current-day").remove();

  let currenDay = document.createElement("div");
  currenDay.className = "current-day";
  let leftInfo = document.createElement("div");
  leftInfo.className = "left";
  let rightInfo = document.createElement("div");
  rightInfo.className = "right";
  currenDay.append(leftInfo, rightInfo);
  let location = document.createElement("p");
  location.className = "location";
  let country = document.createElement("span");
  country.className = "country";
  country.textContent = countryName;
  let city = document.createElement("span");
  city.className = "city";
  city.textContent = cityName;
  location.append(country, city);
  let iconImg = document.createElement("img");
  iconImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  leftInfo.append(location, iconImg);
  let tempreture = document.createElement("p");
  tempreture.className = "temp";
  tempreture.textContent = "C";
  let span = document.createElement("span");
  span.textContent = getCelsiusFromKelvin(data.temp);
  let sup = document.createElement("sup");
  sup.textContent = "°";
  tempreture.prepend(span, sup);
  let description = document.createElement("p");
  description.className = "description";
  description.textContent = data.weather[0].main;
  rightInfo.append(tempreture, description);
  header.append(currenDay);
  // Additional Current Day Info
  renderAdditionalDayData(data);
}

function renderAdditionalDayData(data) {
  let additionalData = document.createElement("section");
  additionalData.className = "additional-data";
  let iconsContainer = document.createElement("div");
  iconsContainer.className = "icons-contanier";
  additionalData.append(iconsContainer);

  // Icons
  let feelsLike = document.createElement("div");
  feelsLike.className = "feels-like";
  let humidity = document.createElement("div");
  humidity.className = "humidity";
  let windSpeed = document.createElement("div");
  windSpeed.className = "wind-speed";
  let UVI = document.createElement("div");
  UVI.className = "uvi";
  iconsContainer.append(feelsLike, humidity, windSpeed, UVI);

  // Feels Like data
  let feelLabel = document.createElement("p");
  feelLabel.className = "label";
  feelLabel.textContent = "Feels Like";
  let feelImg = document.createElement("img");
  feelImg.className = "icon";
  feelImg.src = "../assets/images/icons/feel-like.png";
  feelImg.alt = "Feels Like";
  let feelNum = document.createElement("p");
  feelNum.className = "num";
  feelNum.textContent = getCelsiusFromKelvin(data.feels_like) + "°C";
  feelsLike.append(feelLabel, feelImg, feelNum);

  // Humidity data
  let humLabel = document.createElement("p");
  humLabel.className = "label";
  humLabel.textContent = "Huimidity";
  let humImg = document.createElement("img");
  humImg.className = "icon";
  humImg.src = "../assets/images/icons/humidity.png";
  humImg.alt = "Huimidity";
  let humNum = document.createElement("p");
  humNum.className = "num";
  humNum.textContent = data.humidity + "%";
  humidity.append(humLabel, humImg, humNum);

  // Wind Speed data
  let windLabel = document.createElement("p");
  windLabel.className = "label";
  windLabel.textContent = "Wind Speed";
  let windImg = document.createElement("img");
  windImg.className = "icon";
  windImg.src = "../assets/images/icons/wind-speed.png";
  windImg.alt = "Wind Speed";
  let windNum = document.createElement("p");
  windNum.className = "num";
  windNum.textContent = `${data.wind_speed} km/h`;
  windSpeed.append(windLabel, windImg, windNum);

  // UVI data
  let uviLabel = document.createElement("p");
  uviLabel.className = "label";
  uviLabel.textContent = "UVI";
  let uviImg = document.createElement("img");
  uviImg.className = "icon";
  uviImg.src = "../assets/images/icons/uvi.png";
  uviImg.alt = "UVI";
  let uviNum = document.createElement("p");
  uviNum.className = "num";
  uviNum.textContent = data.uvi;
  UVI.append(uviLabel, uviImg, uviNum);

  weekInfoContainer.append(additionalData);
}

function renderDailyData(dailyData) {
  let weekData = document.createElement("div");
  weekData.className = "week-data";
  dailyData.forEach((info) => {
    let item = document.createElement("div");
    item.className = "items";
    let dayWeek = document.createElement("span");
    dayWeek.className = "day-week";
    dayWeek.textContent = dayFromMilliSeconds(info.dt);
    let logo = document.createElement("span");
    logo.className = "logo";
    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
    logo.append(img);
    let temp = document.createElement("p");
    temp.className = "temp";
    temp.textContent = `${getCelsiusFromKelvin(
      info.temp.day
    )}°C / ${getCelsiusFromKelvin(info.temp.eve)}°C`;
    item.append(dayWeek, logo, temp);
    weekData.append(item);
    weekInfoContainer.prepend(weekData);
    body.append(weekInfo);
  });
}

// TODO: show an error message when a user searchs for a place that is not found
function placeNotFound(place) {}

function dayFromMilliSeconds(ms) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date(ms * 1000).getDay()];
}

function getCelsiusFromKelvin(temp) {
  return (temp - 273.15).toFixed(2);

}


