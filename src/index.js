import domLogic from "./domLogic";
import './style.css';

const OPEN_WEATHER_KEY = config.OPEN_WEATHER_KEY;
const current = document.querySelector('#current');
const daily = document.querySelector('#daily');
const city = document.querySelector('.city');
let data;
let isFahrenheit = true;

async function getWeatherData(location) {
  try {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_KEY}`, {mode: 'cors'});
    const currentWeatherData = await currentWeatherResponse.json();

    const oneCallResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${OPEN_WEATHER_KEY}`, {mode: 'cors'});
    const oneCallData = await oneCallResponse.json();

    data = {
      location,
      current: {
        day: 0,
        temp : oneCallData.current.temp,
        feels_like: oneCallData.current.feels_like,
        description: oneCallData.current.weather[0].description,
        icon: oneCallData.current.weather[0].icon,
      },
      daily: [],
    };
    
    let i = 1;
    for (let day of oneCallData.daily) {
      data.daily.push({
        day: i,
        max_temp: day.temp.max,
        min_temp: day.temp.min,
        description: day.weather[0].description,
        icon: day.weather[0].icon,
      });
      i = i + 1;
    }
  } catch (err) {
    console.log(err);
  }
}

function toggleTemperatureUnits() {
  const fahrenheit = document.querySelector('.fahrenheit');
  const celsius = document.querySelector('.celsius');
  const units = document.querySelectorAll('.temp');
  units.forEach(unit => {
    unit.classList.toggle('active');
    let temp = unit.querySelector('span');
    if (isFahrenheit) {
      temp.textContent = ((Number(temp.textContent) - 32) * (5/9)).toFixed(2);
    } else {
      temp.textContent = ((Number(temp.textContent) * (9/5)) + 32).toFixed(2);
    }
  });
  fahrenheit.classList.toggle('active');
  celsius.classList.toggle('active');
  isFahrenheit = !isFahrenheit;
}

function displayLocation(location) {
  current.innerHTML = '';
  daily.innerHTML = '';
  getWeatherData(location)
  .then((onFulfilled) => {
    city.textContent = data.location;
    domLogic.createWeatherElement(data.current, true);
    data.daily.forEach(day => domLogic.createWeatherElement(day, false));

    domLogic.createInteractiveElements();

    const form = document.querySelector('form');
    const fahrenheit = document.querySelector('.fahrenheit');
    const celsius = document.querySelector('.celsius');
        
    fahrenheit.addEventListener('click', toggleTemperatureUnits);
    celsius.addEventListener('click', toggleTemperatureUnits);
    form.addEventListener('submit', handleSearch);
  }, (onRejected) => {
    console.log(onRejected);
  });
}

function handleSearch(e) {
  e.preventDefault();
  let location = e.target[0].value;
  displayLocation(location);

}

displayLocation('London');





