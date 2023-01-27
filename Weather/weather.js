
const cityDiv = document.querySelector(".currentCity")
const cityNamePar = document.querySelector(".cityName")
const cityInfoDiv = document.querySelector(".cityInfo")
const hourlyBtn = document.querySelector(".hourlyButton")
const weeklyBtn = document.querySelector(".weeklyButton")
const mainImg = document.querySelector("#mainImage")

const temperatureDiv = document.querySelector(".currentTemperature");
const weatherImg = document.querySelector(".weatherImage")
const cityTemPar = document.querySelector("#tempDisp")
const tempTypeBtm = document.querySelector(".temperatureType")

const searchDiv = document.querySelector(".searchCity")
const cityInp = document.querySelector(".cityInput")

const foreCastDiv = document.querySelector(".foreCast")

const hOne = document.querySelector(".hOne")
const imageOne = document.querySelector("#imageOne")
const extraOne = document.querySelector(".extraOne")

const hTwo = document.querySelector(".hTwo")
const extraTwo = document.querySelector(".extraTwo")
const imageTwo = document.querySelector("#imageTwo")

const hThree = document.querySelector(".hThree")
const extraThree = document.querySelector(".extraThree")
const imageThree = document.querySelector("#imageThree")

const currentForecast = document.querySelector(".currentForecast")
const currentExtra = document.querySelector(".currentExtra")
const imageFour = document.querySelector("#currentImage")

const hFive = document.querySelector(".hFive")
const imageFive = document.querySelector("#imageFive")
const extraFive = document.querySelector(".extraFive")

const hSix = document.querySelector(".hSix")
const extraSix = document.querySelector(".extraSix")
const imageSix = document.querySelector("#imageSix")

const hSeven = document.querySelector(".hSeven")
const imageSeven = document.querySelector("#imageSeven")
const extraSeven = document.querySelector(".extraSeven")

const timeDisplay = document.querySelector("#time")
const dateDisplay = document.querySelector(".date")
const citiesUl = document.querySelector(".citiesListV")
const minTempDisp = document.querySelector(".minTemp")
const maxTempDisp = document.querySelector(".maxTemp")
const percDisp = document.querySelector(".precipitation")
const windSpeedDIsp = document.querySelector(".wind-speed")
const weatherCondition = document.querySelector(".weatherCondition")
const windImg = document.querySelector("#windImage")
const weatherInfoDiv = document.querySelector(".weatherInfo")
const bkgImage = document.querySelector("#bkgImg")

let currentCityCords = {
    latitude: 41.99646,
    longitude: 21.43141
}

let currentCity = {};
let newDate;
let intervalId;

weeklyPressed = false

function WeatherConditions(tod) {
    this.conditions = {
        "clear": {
            code: [0, 1],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/clear-${tod}.svg`,
            bimg: `./imgs/backgorund3.jpg`,
            text: `There's Clear Skies`
        },
        "partly-cloudy": {
            code: [2],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}.svg`,
            bimg: `./imgs/backgorund3.jpg`,
            text: `It's Partly Clody`
        },
        "overcast": {
            code: [3],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/overcast-${tod}.svg`,
            bimg: `./imgs/backgorund2.jpg`,
            text: `The Sky is Overcast`
        },
        "fog": {
            code: [45, 48],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/fog-${tod}.svg`,
            bimg: `./imgs/backgorund5.jpg`,
            text: `There's Foggy weather`
        },
        "drizzle": {
            code: [51, 53, 55],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-drizzle.svg`,
            bimg: `./imgs/backgorund1.jpg`,
            text: `A moderade Drizzle`
        },
        "sleet": {
            code: [56],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-sleet.svg`,
            bimg: `./imgs/backgorund1.jpg`,
            text: `A Freezing Dizzle`
        },
        "hail": {
            code: [57],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-hail.svg`,
            bimg: `./imgs/backgorund1.jpg`,
            text: `There's Hail`
        },
        "rain": {
            code: [61, 63, 65, 66, 67, 80, 81, 82],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-rain.svg`,
            bimg: `./imgs/backgorund1.jpg`,
            text: `It's Rainy`
        },
        "snow": {
            code: [71, 73, 75, 77, 85, 86],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-snow.svg`,
            bimg: `./imgs/backgorund6.jpg`,
            text: `It's Snowy`
        },
        "thunderstorm": {
            code: [95],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/thunderstorms-${tod}.svg`,
            bimg: `./imgs/backgorund4.jpg`,
            text: `There's a Thunderstorm`
        },
        "hail-storms": {
            code: [96, 99],
            img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/thunderstorms-${tod}-rain.svg`,
            bimg: `./imgs/backgorund4.jpg`,
            text: `Thunderstorm with Hail`
        } // Sakav za sekoe da imam posebna slika ama nemozhev da najdam
    }
}

function WindConditions() {
    this.conditions = [
        { maxSpeed: Infinity, minSpeed: 68, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-12.svg" },
        { maxSpeed: 67, minSpeed: 59, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-11.svg" },
        { maxSpeed: 58, minSpeed: 51, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-10.svg" },
        { maxSpeed: 50, minSpeed: 43, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-9.svg" },
        { maxSpeed: 42, minSpeed: 35, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-8.svg" },
        { maxSpeed: 34, minSpeed: 28, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-7.svg" },
        { maxSpeed: 27, minSpeed: 22, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-6.svg" },
        { maxSpeed: 21, minSpeed: 16, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-5.svg" },
        { maxSpeed: 15, minSpeed: 10, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-4.svg" },
        { maxSpeed: 9, minSpeed: 6, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-3.svg" },
        { maxSpeed: 5, minSpeed: 2, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-2.svg" },
        { maxSpeed: 1, minSpeed: 1, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-1.svg" },
        { maxSpeed: 0, minSpeed: 0, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-0.svg" }
    ]
}

const forecastElements = [hOne, hTwo, hThree, currentForecast, hFive, hSix, hSeven, imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix, imageSeven, extraOne, extraTwo, extraThree, currentExtra, extraFive, extraSix, extraSeven]

let newSuperArray = [forecastElements.filter((value, index) => index >= 0 && index < 7), forecastElements.filter((value, index) => index >= 7 && index < 14), forecastElements.filter((value, index) => index >= 14 && index < 21)]

let unit = "°C"
let uni = "&"

let speedUnit = "km/h"
let timeOfDay = "day"

function getTime(timezone) {
    let abrv = "th"
    newDate = new Date().toLocaleString("en-US", { timeZone: timezone });
    const hours = new Date(newDate).getHours()
    const minutes = new Date(newDate).getMinutes()
    const seconds = new Date(newDate).getSeconds()
    const month = new Date(newDate).toLocaleString('default', { month: 'long' });
    const day = new Date(newDate).getDate()
    switch (day % 10) {
        case 1:
            abrv = "st"
            break;
        case 2:
            abrv = "nd"
            break;
        case 3:
            abrv = "rd"
            break;
        default:
            abrv = "th"
    }
    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
    dateDisplay.innerHTML = `${month} ${day}${abrv}`;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        getTime(timezone);
    }, 1000);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            currentCityCords.latitude = position.coords.latitude
            currentCityCords.longitude = position.coords.longitude
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "current")
        },
        function (error) {
            console.error("Error: " + error.message);
        }
    );
}

getCurrentPosition()

function getCityWeather(long, lat, unitOf, direction) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true${unitOf}timezone=auto&past_days=1`)
        .then(r => {
            if (r.ok) {
                return r.json()
            } else {
                console.log("not success2")
                return
            }
        })
        .then(d => {
            console.log(d)
            let cityName = d.timezone.split("/").pop();
            cityName = cityName.split("_").join(" ");
            if (direction === "current") {
                getGeoCity(cityName, direction)
            }
            updateValues(d)
            setWeatherImage(d.current_weather.weathercode, timeOfDay, mainImg, weatherCondition, "direct")
            setWindSpeed(d.current_weather.windspeed)
            getHourlyForecast()
        })
        .catch(error => console.log(error))
}

function getGeoCity(city, direction) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`)
        .then(r => {
            if (r.ok) {
                return r.json()
            } else {
                console.log("not success1")
                return
            }
        })
        .then(d => {
            console.log(d.results)
            if (direction === "current") {
                for (let i = 0; i < d.results.length; i++) {
                    if (currentCityCords.longitude.toFixed(0) === d.results[i].longitude.toFixed(0)) {
                        updateValuesTwo(d.results[i], city, direction)
                    }
                }
                return
            }
            if (d.results === undefined) {
                cityInp.style.border = "1px solid red"
                citiesUl.style.visibility = "hidden"
                citiesUl.style.height = "0"
                weatherInfoDiv.style.margin = "2rem"
                return
            }
            searchCity(citiesUl, d.results)
        })
        .catch(error => console.log(error))
}

function searchCity(ul, array) {
    if (ul.style.visibility != "visible") {
        ul.style.visibility = "visible"
        ul.style.height = "6rem"
        weatherInfoDiv.style.margin = "0"
    }

    for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        if (array[i].admin1 !== undefined) {
            li.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${array[i].country_code.toLowerCase()}.svg"> <h4>${array[i].name}</h4>(${array[i].admin1}, ${array[i].country})`
        } else {
            li.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${array[i].country_code.toLowerCase()}.svg"> <h4>${array[i].name}</h4>(${array[i].country})`
        }
        li.addEventListener("click", () => {
            currentCityCords.latitude = array[i].latitude
            currentCityCords.longitude = array[i].longitude
            currentCity = array[i]
            ul.style.visibility = "hidden"
            weatherInfoDiv.style.margin = "2rem"
            ul.style.height = "0"
            updateValuesTwo(array[i])
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
        });
        ul.appendChild(li);
    }
}

function setWeatherImage(weatherCode, tod, image, textElement, direction) {
    let conditionsOne = new WeatherConditions(tod)
    for (let condition in conditionsOne.conditions) {
        if (conditionsOne.conditions[condition].code.includes(weatherCode)) {
            if (direction === "indirect") {
                image.src = conditionsOne.conditions[condition].img
            } else {
                image.src = conditionsOne.conditions[condition].img
                bkgImage.src = conditionsOne.conditions[condition].bimg
                textElement.innerHTML = conditionsOne.conditions[condition].text
            }
            break;
        }
    }
}

function setWindSpeed(windSpeed) {
    let curWindSpeed;
    if (speedUnit === "km/h") {
        curWindSpeed = windSpeed * 0.621371;
    }
    let conditionsOne = new WindConditions();
    for (let condition in conditionsOne.conditions) {
        if (windSpeed >= conditionsOne.conditions[condition].minSpeed && windSpeed <= conditionsOne.conditions[condition].maxSpeed) {
            windImg.src = conditionsOne.conditions[condition].img;
            break;
        }
    }
}

function getPreviousThreeDatesIndex(object, day, month, hour) {
    let index = 0;
    let dates = [];
    let dayOfWeek = [];
    let newDates = []
    let days = []

    if (weeklyPressed === true) {
        dates = object.daily.time.slice(0, 1)
    } else {
        dates = object.hourly.time
    }
    for (let i = 0; i < dates.length; i++) {
        let date = new Date(dates[i]);
        if (date.getDate() == day && date.getMonth() + 1 == month + 1 && date.getHours() == hour) {
            index = i - 3
        }
    }

    let tempArray = [];
    let tempArrayTwo = [];
    let tempArrayThree = [];

    for (let i = index; i < index + 7; i++) {
        if (weeklyPressed === true) {
            newDates.push(object.daily.time[i])
            tempArray.push(object.daily.temperature_2m_max[i]);
            tempArrayTwo.push(object.daily.weathercode[i])
            tempArrayThree.push(object.daily.temperature_2m_min[i])
        } else {
            newDates.push(object.hourly.time[i])
            tempArray.push(object.hourly.temperature_2m[i]);
            tempArrayTwo.push(object.hourly.weathercode[i])
        }
    }

    // console.log(object.hourly.temperature_2m.slice(index, 7))
    // Ako weeklyPressed e false ova izlaga prazno ako e true raboti ko sho treba zoshto???

    for (let date of newDates) {
        let dateObject = new Date(date);
        if (weeklyPressed === true) {
            dayOfWeek = dateObject.toLocaleString('default', { weekday: 'short' });
            console.log(dayOfWeek)
        } else {
            dayOfWeek = dateObject.toLocaleString('default', { hour: 'numeric' });
        }
        days.push(dayOfWeek);
    }

    if (weeklyPressed === true) {
        getHourlyForecast(days, tempArray, tempArrayTwo, tempArrayThree)
        return
    }
    getHourlyForecast(days, tempArray, tempArrayTwo, [])

}

function getHourlyForecast(arrayOne, arrayTwo, arrayThree, arrayFour) {
    newSuperArray.forEach((innerArray) => {
        innerArray.forEach((element, i) => {
            if (element.nodeName === "H3") {
                innerArray[i].innerHTML = `${arrayOne[i]}`
                // console.log(arrayOne[i])
                /* Tuka dava error vaka ali ne e undefined i raboti ko sho treba zoshto???
                TypeError: arrayOne is undefined
    getHourlyForecast http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:383
    getHourlyForecast http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:381
    getHourlyForecast http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:380
    getCityWeather http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:221
    promise callback*getCityWeather http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:211
    getCurrentPosition http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:191
    getCurrentPosition http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:187
    <anonymous> http://127.0.0.1:5500/AdvancedJsHomeworks/Weather/weather.js:199

                */
            }
            if (element.nodeName === "DIV") {
                if (weeklyPressed === true) {
                    innerArray[i].innerHTML = `<h4>${arrayTwo[i]}°</h4><h5>${arrayFour[i]}°</h5>`;
                } else {
                    innerArray[i].innerHTML = `<h4>${arrayTwo[i]}°</h4>`;
                }
            }
            if (element.nodeName === "IMG") {
                setWeatherImage(arrayThree[i], timeOfDay, innerArray[i], undefined, "indirect")
            }
        });
    });
}

function updateValues(obj) {
    cityTemPar.innerHTML = obj.current_weather.temperature
    minTempDisp.innerHTML = `${obj.daily.temperature_2m_min[1]}${unit}`
    maxTempDisp.innerHTML = `${obj.daily.temperature_2m_max[1]}${unit}`
    percDisp.innerHTML = `${obj.daily.precipitation_sum[1]} %`
    windSpeedDIsp.innerHTML = `${obj.current_weather.windspeed} ${speedUnit}`
    getTime(obj.timezone)
    if (new Date(newDate).getHours() > 18) {
        timeOfDay = "night"
    }
    getPreviousThreeDatesIndex(obj, new Date(newDate).getDate(), new Date(newDate).getMonth(), new Date(newDate).getHours());
}

function updateValuesTwo(obj, city, direction) {
    if (direction === "current") {
        cityNamePar.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${obj.country_code.toLowerCase()}.svg"> ${city}, ${obj.country_code} `
        return
    }
    cityNamePar.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${obj.country_code.toLowerCase()}.svg"> ${obj.name}, ${obj.country_code} `
}

cityInp.addEventListener("input", () => {
    cityInp.style.border = "none"
    citiesUl.innerHTML = ''
    if (cityInp.value === "") {
        cityInp.style.border = "none"
        return
    }
    getGeoCity(cityInp.value, "new")
})

tempTypeBtm.addEventListener("click", () => {
    if (uni === "&") {
        uni = "&temperature_unit=fahrenheit&windspeed_unit=mph&";
        unit = "°F"
        speedUnit = "mp/h"
        tempTypeBtm.innerHTML = "°F"
        getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
    } else {
        uni = "&"
        unit = "°C"
        speedUnit = "km/h"
        tempTypeBtm.innerHTML = "°C"
        getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
    }
})

hourlyBtn.addEventListener("click", () => {
    if (weeklyPressed === false) return
    hourlyBtn.classList.add("show-before");
    weeklyBtn.classList.remove("show-before");
    weeklyPressed = false
    getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
})

weeklyBtn.addEventListener("click", () => {
    if (weeklyPressed === true) return
    console.log("dime")
    weeklyBtn.classList.add("show-before");
    hourlyBtn.classList.remove("show-before");
    weeklyPressed = true
    getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
})



