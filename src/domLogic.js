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

    current.appendChild(container);
    container.appendChild(date);
    
  };

  const createInteractiveElements = () => {};

  return {
    createWeatherElement,
    createInteractiveElements,
    formatDate,
  };
})();

export default domLogic;

