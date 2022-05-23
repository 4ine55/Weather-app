function formatDate(receivedDate) {
  let now = new Date(receivedDate * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(now);
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minute = String(now.getMinutes()).padStart(2, "0");

  let dateAndTime = {
    date: date,
    month: month,
    year: year,
    hour: hour,
    minute: minute,
    day: day,
  };
  return dateAndTime;
}
function updateDate(date) {
  let dateAndTime = formatDate(date);
  let day = document.querySelector("#day");
  let mdy = document.querySelector("#date-mdy");
  let time = document.querySelector("#time");
  day.innerHTML = dateAndTime.day;
  mdy.innerHTML = `${dateAndTime.month} ${dateAndTime.date}, ${dateAndTime.year}`;
  time.innerHTML = `${dateAndTime.hour}:${dateAndTime.minute}`;
}
function chooseThermometerIcon(tempValue) {
  if (tempValue < 0) {
    return "low";
  }
  if (tempValue >= 0 && tempValue <= 25) {
    return "half";
  }
  if (tempValue > 25) {
    return "high";
  }
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8ade99d032cd211ae889750690106e26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#today-temp");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description-temp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon-today");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let thermometerElement = document.querySelector("#thermometer-icon");

  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let sunsetTime = new Date(response.data.sys.sunset * 1000);

  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  sunriseElement.innerHTML = `  ${sunriseTime.getHours()}:${String(
    sunriseTime.getMinutes()
  ).padStart(2, "0")}`;
  sunsetElement.innerHTML = `  ${sunsetTime.getHours()}:${String(
    sunsetTime.getMinutes()
  ).padStart(2, "0")}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  thermometerElement.innerHTML = `<i class="bi bi-thermometer-${chooseThermometerIcon(
    response.data.main.temp
  )}"></i>`;
  updateDate(response.data.dt);
  getForecast(response.data.coord);
}
function searchWithName(city) {
  let apiKey = "8ade99d032cd211ae889750690106e26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function searchWithCoord(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "8ade99d032cd211ae889750690106e26";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity");
  searchWithName(cityInputElement.value);
}

function handleFindMe() {
  navigator.geolocation.getCurrentPosition(searchWithCoord);
}

function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row" id="five-cards-meteo">`;

  forecastData.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-center">${
              formatDate(forecastDay.dt).day
            }</div>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="60"
            />
            <div class="row justify-content-center" id="forecast-max-temp">
              <span>
              <i class="bi bi-arrow-up-short"></i>
              ${Math.round(forecastDay.temp.max)} °C
              </span>
            </div>
            <div class="row justify-content-center" id="forecast-min-temp">
              <span>
              <i class="bi bi-arrow-down-short"></i>
              ${Math.round(forecastDay.temp.min)} °C
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

handleFindMe();

let form = document.querySelector("#search-section");
form.addEventListener("submit", handleSubmit);

let findMeButton = document.querySelector("#find-me-button");
findMeButton.addEventListener("click", handleFindMe);
