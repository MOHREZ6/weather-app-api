const searchBox = document.querySelector("#search");
const SearchBtn = document.querySelector("#SearchBtn");

const apiKey = "97cdbdcd15f7bd360eaf5695cc26bcf9";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let intervalId;

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var responseData = await response.json();
  // console.log(responseData);

  document.querySelector("#city").innerHTML = responseData.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(responseData.main.temp) + "°C";
  document.querySelector("#humidity").innerHTML =
    responseData.main.humidity + "%";
  document.querySelector("#humidity").innerHTML =
    responseData.wind.speed + "km/h";
  document.querySelector("#description").innerHTML =
    responseData.weather[0].description;

  const { lat, lon } = responseData.coord;

  const TimeApiKey = "RLSGXSRRNDO3";
  const TimeZonesUrl =
    "http://api.timezonedb.com/v2.1/get-time-zone?format=json";

  const timeZoneResponse = await fetch(
    TimeZonesUrl +
      `&key=${TimeApiKey}` +
      `&by=position&lat=${lat}` +
      `&lng=${lon}`
  );
  const timeZoneData = await timeZoneResponse.json();
  let timeZone = new Date(timeZoneData.formatted);

  console.log(timeZoneData);

  if (intervalId) {
    clearInterval(intervalId);
  }

  function updateLocalTime() {
    timeZone.setSeconds(timeZone.getSeconds() + 1);
    document.querySelector(
      "#local-time"
    ).innerHTML = `Local Time: ${timeZone.toLocaleTimeString()}`;
  }

  intervalId = setInterval(updateLocalTime, 1000);
  updateLocalTime();
}

SearchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);

  searchBox.value = "";
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather(searchBox.value);
    searchBox.value = "";
  }
});
