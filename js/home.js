const body = document.body;
const inputField = document.querySelector(".input-parent input");
let header = document.querySelector(".header");
let headerImg = document.querySelector(".header img");
let weekInfo = document.createElement("section");
weekInfo.className = "weather-info";
let weekInfoContainer = document.createElement("div");
weekInfoContainer.className = "container";
weekInfo.append(weekInfoContainer);

// load user's location weather on page load
let userLat, userLon, userCity;
const apiKey = "d0139168498c4f66d3fb31b4d374f145";

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getUserLocationWeather, showError);
    //take permission to access user's location
    function getUserLocationWeather(userLocation) {
      userLat = userLocation.coords.latitude;
      userLon = userLocation.coords.longitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((userWeather) => {
          userCity = userWeather.name;
          fetchWeatherData(userCity);
        });
    }
  } else {
    alert("your browser doesn't support geographic locations");
  }

  // error function to show an alert when user denies access
  function showError(error) {
    if (error.PERMISSION_DENIED) {
      alert("Please allow access to your location to show your weather data");
    }
  }
};

// Show weather info when searching for a specific place
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (e.target.value.trim() !== "") {
      let searchTerm = e.target.value;
      // Search for Palestine when typing 'State Of Palestine'
      if (searchTerm.toLowerCase() === "state of palestine")
        searchTerm = "Palestine";
      fetchWeatherData(searchTerm);
    }
  }
});

// Remove popup Layer when click ok or click on the screen
document.addEventListener("click", (e) => {
  if (!e.target.matches(".popup-container, .popup button")) return;
  body.classList.remove("popup-active");
  body.style.overflowY = "auto";
  inputField.select();
  setTimeout(() => {
    document.querySelector(".popup-container").style.display = "none";
  }, 300);
});

// fetch the API of the city and country
fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
  // json the data
  .then((res) => res.json())
  .then((data1) => {
    let arr = []; // make the emputy array to push the data to it
    // for loop to push data
    for (key of data1.data) {
      arr.push(key.city);
      arr.push(key.country);
    }
    // to remove the same data
    let seto = [...new Set(arr)];
    // select the element
    const searchWrapper = document.querySelector(".input-parent");
    const inputBox = searchWrapper.querySelector("input");
    const suggBox = document.querySelector(".recommends");
    // when click in the input call the showList function
    inputBox.addEventListener("click", showList);
    // show the autocomplet list
    function showList() {
      // suggBox.appendChild(span)
      let arr = seto
        .map((element) => {
          const spanTag = document.createElement("span");
          let spanCon = document.createTextNode(element);
          spanTag.appendChild(spanCon);
          return suggBox.appendChild(spanTag);
        })
        .join("");
      let allList = suggBox.querySelectorAll("span");
      for (let i = 0; i < allList.length; i++) {
        allList[i].addEventListener("click", select);
      }
      //focus input value
      this.select();
    }
    //autocomplet when the user write
    inputBox.onkeyup = (element) => {
      let userData = element.target.value;
      let emptyArray = [];
      if (userData) {
        emptyArray = seto.filter((element) => {
          return element
            .toLocaleLowerCase()
            .startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((element) => {
          return (element = "<span>" + element + "</span>");
        });
        showSeto(emptyArray);
        let allList = suggBox.querySelectorAll("span");
        for (let i = 0; i < allList.length; i++) {
          allList[i].addEventListener("click", select);
        }
      }
    };

    function select(element) {
      let selectUserData = element.target.textContent;
      // Search for Palestine when typing 'State Of Palestine'
      if (selectUserData.toLowerCase() === "state of palestine")
        selectUserData = "Palestine";
      inputBox.value = selectUserData;
      fetchWeatherData(inputBox.value);
      suggBox.textContent = "";
    }

    function showSeto(list) {
      let listData;
      if (!list.length) {
        userValue = inputBox.value;
        listData = "";
      } else {
        listData = list.join("");
      }
      suggBox.innerHTML = listData;
    }

    // remove list when click out input
    document.body.onclick = (e) => {
      if (!e.target.matches(".recommends span, form input")) {
        suggBox.textContent = "";
      }
    };
  })
  .catch((erore) => console.log(erore));

function fetchWeatherData(searchTerm) {
  let lat, lon, countryName, cityName, currentDayData, dailyData;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((weatherInfo) => {
      // Shows loading screen while fetching data
      controlLoader();
      lat = weatherInfo.coord.lat;
      lon = weatherInfo.coord.lon;
      countryName = weatherInfo.sys.country;
      cityName = weatherInfo.name;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
      )
        .then((info) => info.json())
        .then((db) => {
          let currente = db.current.weather[0].main; // give the weather condition
          //images show According to the weather
          let images = {
            Rain: [
              "../assets/images/rainy/1.jpg",
              "../assets/images/rainy/2.jpg",
              "../assets/images/rainy/3.jpg",
              "../assets/images/rainy/4.jpg",
            ],
            Clear: ["../assets/images/clear/1.jpg"],
            Clouds: [
              "../assets/images/cloudy/1.jpg",
              "../assets/images/cloudy/2.jpg",
              "../assets/images/cloudy/3.jpg",
            ],
            Sunny: [
              "../assets/images/sunny/1.jpg",
              "../assets/images/sunny/2.jpg",
              "../assets/images/sunny/3.jpg",
              "../assets/images/sunny/4.jpg",
            ],
            Snow: [
              "../assets/images/snowy/1.jpg",
              "../assets/images/snowy/2.jpg",
              "../assets/images/snowy/3.jpg",
              "../assets/images/snowy/4.jpg",
            ],
            Windy: [
              "../assets/images/windy/1.jpg",
              "../assets/images/windy/2.jpg",
              "../assets/images/windy/3.jpg",
              "../assets/images/windy/4.jpg",
            ],
          };
          //Compare the weather with the key of object
          let describ = "";
          switch (true) {
            case currente == "Clouds":
              describ = images.Clouds;
              break;
            case currente == "Rain":
              describ = images.Rain;
              break;
            case currente == "Windy":
              describ = images.Windy;
              break;
            case currente == "Sunny":
              describ = images.Sunny;
              break;
            case currente == "Snow":
              describ = images.Snow;
              break;
            case currente == "Clear":
              describ = images.Clear;
              break;
          }
          //call the function when load the page
          window.onload = randomImages();
          //the function well give the random images
          function randomImages() {
            let random = Math.floor(Math.random() * describ.length);
            document.querySelector(".header img").src = describ[random];
          }
          currentDayData = db.current;
          dailyData = db.daily.slice(1, 7);
          // Wait 1 second to render elements
          setTimeout(
            renderCurrentDayData,
            1000,
            currentDayData,
            countryName,
            cityName
          );
          setTimeout(renderDailyData, 1000, dailyData);
        });
    })
    // If the search term is INVALID, a popup will show to ask the user to re-write a VALID input
    .catch((err) => {
      // Removes the loading screen if the search term is INVALID
      controlLoader();
      placeNotFound(searchTerm);
    });
}

function renderCurrentDayData(data, countryName, cityName) {
  // Removes the loading screen when the data are available
  controlLoader();
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

function placeNotFound(place) {
  let placeName = document.querySelector(".popup-container .popup .place");
  placeName.textContent = place;
  body.classList.add("popup-active");
  body.style.overflowY = "hidden";
  document.querySelector(".popup-container").style.display = "flex";
}

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

// Adds the loader while fetching data, and removes it when the data are available
function controlLoader() {
  let loader = document.querySelector(".loader");
  let style = window.getComputedStyle(loader);
  let display = style.getPropertyValue("display");
  if (display !== "none") {
    loader.style.display = "none";
  } else {
    loader.style.display = "flex";
  }
}
