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

    current.appendChild(container);
  };

  const createInteractiveElements = () => {};

  return {
    createWeatherElement,
    createInteractiveElements,
    formatDate,
  };
})();

export default domLogic;

