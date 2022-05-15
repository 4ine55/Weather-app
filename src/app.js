function formatDate(now) {
  let days = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  let day = days[now.getDay()];

  let months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
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
function updateDate() {
  let dateAndTime = formatDate(new Date());
  let day = document.querySelector("#day");
  let dmy = document.querySelector("#date-dmy");
  let time = document.querySelector("#time");
  day.innerHTML = dateAndTime.day;
  dmy.innerHTML = `${dateAndTime.date} ${dateAndTime.month} ${dateAndTime.year}`;
  time.innerHTML = `${dateAndTime.hour}:${dateAndTime.minute}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#today-temp");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description-temp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon-today");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchWithName(city) {
  let apiKey = "8ade99d032cd211ae889750690106e26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature).then(updateDate);
}
function searchWithCoord(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "8ade99d032cd211ae889750690106e26";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature).then(updateDate);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity");
  searchWithName(cityInputElement.value);
}

function handleFindMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchWithCoord);
}

let form = document.querySelector("#search-section");
form.addEventListener("submit", handleSubmit);

let findMeButton = document.querySelector("#find-me-button");
findMeButton.addEventListener("click", handleFindMe);
