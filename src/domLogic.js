import add from 'date-fns/add';
import format from 'date-fns/format';

const domLogic = (() => {
  const formatDate = (date) => {
    return format(date, 'eeee MM/dd');
  };

  const createCurrentWeatherElement = (currentWeather) => {
    
  };
  const createDailyWeatherElement = (dailyWeather) => {};

  const createInteractiveElements = () => {};

  return {
    createCurrentWeatherElement,
    createDailyWeatherElement,
    createInteractiveElements,
    formatDate,
  };
})();

export default domLogic;

