const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
let locationInput = "london";

async function displayWeatherData() {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}?unitGroup=metric&key=KW3HSS67J253KAWLM3FMAFERH&contentType=json`);
    const weatherData = await response.json();

    console.log(weatherData);
    return weatherData;
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(searchInput.value);
    locationInput = searchInput.value;
    displayWeatherData();
    searchInput.value = "";
})