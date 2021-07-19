import domLogic from "./domLogic";

const OPEN_WEATHER_KEY = config.OPEN_WEATHER_KEY;
let data;
let fahrenheit = true;

async function getWeatherData(location) {
  try {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_KEY}`, {mode: 'cors'});
    const currentWeatherData = await currentWeatherResponse.json();

    const oneCallResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${OPEN_WEATHER_KEY}`, {mode: 'cors'});
    const oneCallData = await oneCallResponse.json();

    data = {
      current: {
        temp : oneCallData.current.temp,
        feels_like: oneCallData.current.feels_like,
        description: oneCallData.current.weather[0].description,
        icon: oneCallData.current.weather[0].icon,
      },
      daily: [],
    };

    for (let day of oneCallData.daily) {
      data.daily.push({
        max_temp: day.temp.max,
        min_temp: day.temp.min,
        description: day.weather[0].description,
        icon: day.weather[0].icon,
      });
    }

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

getWeatherData('San Diego');