const cities = [];


function addCityWeather(cityName, temperature, condition) {
  cities.push({ cityName, temperature, condition });
  displayWeatherSummary();
}
function findHottestCity() {
  return cities.reduce((hottest, city) =>
    city.temperature > (hottest?.temperature || -Infinity) ? city : hottest, null);
}

function filterByCondition(condition) {
  return cities.filter(city => city.condition === condition);
}

function mapCitySummaries() {
  return cities.map(city => `City: ${city.cityName}, Temp: ${city.temperature}°C`);
}

function sortCitiesByTemperature() {
  cities.sort((a, b) => b.temperature - a.temperature);
  displayWeatherSummary();
}
function convertTemperature(temp, toFahrenheit = true) {
  return toFahrenheit ? temp * 9 / 5 + 32 : (temp - 32) * 5 / 9;
}

function displayWeatherSummary() {
  const output = document.getElementById('output');
  output.innerHTML = '';

  cities.forEach(city => {
    const citySummary = document.createElement('div');
    citySummary.classList.add('city-summary');
    citySummary.textContent = `City: ${city.cityName}, Temp: ${city.temperature}°C, Condition: ${city.condition}`;
    output.appendChild(citySummary);
  });

  const hottestCity = findHottestCity();
  if (hottestCity) {
    const { cityName, temperature, condition } = hottestCity;
    const hottestCityDiv = document.createElement('div');
    hottestCityDiv.textContent = `Hottest City: ${cityName}, Temp: ${temperature}°C, Condition: ${condition}`;
    output.appendChild(hottestCityDiv);
  }
}
document.getElementById('weather-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const cityName = document.getElementById('cityName').value;
  const temperature = parseFloat(document.getElementById('temperature').value);
  const condition = document.getElementById('condition').value;

  addCityWeather(cityName, temperature, condition);

  e.target.reset();
});
