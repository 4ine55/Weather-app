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

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "8ade99d032cd211ae889750690106e26";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Montreal&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature).then(updateDate);
