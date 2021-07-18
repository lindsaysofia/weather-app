/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const OPEN_WEATHER_KEY = config.OPEN_WEATHER_KEY;\nlet data;\n\nasync function getWeatherData(location) {\n  try {\n    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_KEY}`, {mode: 'cors'});\n    const currentWeatherData = await currentWeatherResponse.json();\n\n    const oneCallResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${OPEN_WEATHER_KEY}`, {mode: 'cors'});\n    const oneCallData = await oneCallResponse.json();\n\n    data = {\n      current: {\n        temp : oneCallData.current.temp,\n        feels_like: oneCallData.current.feels_like,\n        description: oneCallData.current.weather[0].description,\n      }\n    }\n\n    console.log(data);\n  } catch (err) {\n    console.log(err);\n  }\n}\n\ngetWeatherData('San Diego');\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;