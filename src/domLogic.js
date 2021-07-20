import add from 'date-fns/add';
import format from 'date-fns/format';

const domLogic = (() => {
  const current = document.querySelector('#current');
  const daily = document.querySelector('#daily');

  const formatDate = (date) => {
    return format(date, 'eeee MM/dd');
  };

  const createWeatherElement = (data, currentWeather) => {
    const container = document.createElement('div');
    const date = document.createElement('h2');
    const icon = document.createElement('img');
    const topTemp = document.createElement('p');
    const bottomTemp = document.createElement('p');
    const description = document.createElement('p');

    container.classList.add('weather');

    date.classList.add('date');
    date.textContent = `${currentWeather ? 'Today, ' : ''}${formatDate(add(new Date(), {days: data.day}))}`;

    icon.classList.add('icon');
    icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;

    topTemp.classList.add('top', 'temp');
    topTemp.innerHTML = `<span>${currentWeather ? data.temp : data.max_temp}</span>`;

    bottomTemp.classList.add('bottom', 'temp');
    bottomTemp.innerHTML = currentWeather ? `feels like <span>${data.feels_like}</span>` : `<span>${data.min_temp}</span>`;

    description.classList.add('description');
    description.textContent = data.description;

    container.appendChild(date);
    container.appendChild(icon);
    container.appendChild(topTemp);
    container.appendChild(bottomTemp);
    container.appendChild(description);

    if (currentWeather) {
      current.appendChild(container);
    } else {
      daily.appendChild(container);
    }
    
  };

  const createInteractiveElements = () => {
    const container = document.createElement('div');
    const form = document.createElement('form');
    const search = document.createElement('input');
    const submit = document.createElement('button');
    const units = document.createElement('div');
    const celsius = document.createElement('button');
    const fahrenheit = document.createElement('button');

    container.classList.add('interactive');

    search.classList.add('search');
    search.type = 'text';
    search.placeholder = 'Seach Location';

    submit.classList.add('submit');
    submit.type = 'submit'
    submit.innerHTML = '<i class="fas fa-search-location"></i>';

    units.classList.add('units');

    celsius.classList.add('celsius');
    celsius.innerHTML = '&#176;C';
    
    fahrenheit.classList.add('fahrenheit');
    fahrenheit.innerHTML = '&#176;F';

    form.appendChild(search);
    form.appendChild(submit);

    units.appendChild(celsius);
    units.appendChild(fahrenheit);

    container.appendChild(form);
    container.appendChild(units);

    current.appendChild(container);
  };

  return {
    createWeatherElement,
    createInteractiveElements,
  };
})();

export default domLogic;

