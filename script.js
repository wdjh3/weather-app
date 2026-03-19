const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherDataElement = document.getElementById("weather-data");
let locationInput = "london";

async function displayWeatherData() {
  const startTime = performance.now();

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}?unitGroup=metric&key=KW3HSS67J253KAWLM3FMAFERH&contentType=json`,
    );
    const weatherData = await response.json();

    const endTime = performance.now();
    const duration = endTime - startTime;

    weatherDataElement.innerText += `Fetch Time: ${duration} ms\n`;
    weatherDataElement.innerText += `Location: ${locationInput}\n`;
    for (const day of weatherData.days) {
      weatherDataElement.innerText += `
            ${day.datetime}
            High: ${day.tempmax}°C
            Low: ${day.tempmin}°C
            ${day.description}
        `;
    }
  } catch (error) {
    weatherDataElement.innerText = `Error: ${error}`;
    console.error(error);
  }
  return weatherData;
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!searchInput.checkValidity()) {
    searchInput.reportValidity();
    return;
  }
  console.log(searchInput.value);
  locationInput = searchInput.value;
  weatherDataElement.textContent = "";
  searchInput.value = "";
  displayWeatherData();
});
