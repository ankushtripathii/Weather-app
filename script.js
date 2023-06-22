const api = {
  key: "73ecc1d66b8b911eda30b5c6c3025109",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const error = document.querySelector(".error");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const tempRange = document.querySelector(".temp-range");
const weatherIcon = document.querySelector(".weather-icon");

btn.addEventListener("click", inputGet);

function inputGet(e) {
  e.preventDefault();
  if (e.type == "click") {
    getData(search.value);
  }
}
function getData() {
  fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then((resp) => {
      return resp.json();
    })
    .then(displayData);
}
function displayData(resp) {
  console.log(resp);
  if (resp.cod == "404") {
    error.textContent = "Please enter valid city name";
    search.value = "";
  } else {
    error.textContent = "";
    city.innerText = `${resp.name},${resp.sys.country}`;
    const curDate = new Date();
    date.innerText = getDate(curDate);
    temp.innerHTML = `Temp:${Math.round(resp.main.temp)}<span>°C</span>`;
    weather.innerText = `Weather:${resp.weather[0].main}`;
    tempRange.innerText = `Temp-range:${Math.round(
      resp.main.temp_min
    )}°C / ${Math.round(resp.main.temp_max)}°C`;

    const iconURL = "https://api.openweathermap.org/img/w/";
    weatherIcon.src = iconURL + resp.weather[0].icon + ".png";
    search.value = "";
  }
}
function getDate(d) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
