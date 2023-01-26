
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

let currentCityCords = {
    latitude: 41.99646,
    longitude: 21.43141
}

let currentCity = {};
let newDate;
let firstBoot = true
let intervalId;

let uni = "&"
let unit = "°C"
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
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni)
        },
        function (error) {
            console.error("Error: " + error.message);
        }
    );
}

getCurrentPosition()

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
            if (direction === "ind") {
                for (let i = 0; i < d.results.length; i++) {
                    if (currentCityCords.longitude.toFixed(0) === d.results[i].longitude.toFixed(0)) {
                        currentCity = d.results[i]
                        updateValuesTwo(currentCity)
                        firstBoot = false
                    }
                }
                return
            }
            if (d.results === undefined) {
                cityInp.style.border = "1px solid red"
                citiesUl.style.visibility = "hidden"
                citiesUl.style.height = "0"
                return
            }
            getCityImage(citiesUl, d.results)
        })
        .catch(error => console.log(error))
}

function getCityImage(ul, array) {
    if (ul.style.visibility != "visible") {
        ul.style.visibility = "visible"
        ul.style.height = "3rem"
    }

    for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${array[i].country_code.toLowerCase()}.svg"> <h4>${array[i].name}</h4>(${array[i].admin1})`
        li.addEventListener("click", () => {
            currentCityCords.latitude = array[i].latitude
            currentCityCords.longitude = array[i].longitude
            currentCity = array[i]
            let currentCityName = array[i].name.split("_").join(" ");
            getGeoCity(currentCityName, "dir")
            ul.style.visibility = "hidden"
            ul.style.height = "0"
            updateValuesTwo(array[i])
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni)
        });
        ul.appendChild(li);
    }
}

function getCityWeather(long, lat) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true${uni}timezone=auto`)
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
            getGeoCity(cityName, "ind")
            updateValues(d)
            getWeatherCodes(d.current_weather.weathercode, mainImg, timeOfDay, d.current_weather.windspeed)
        })
        .catch(error => console.log(error))
}

function getWeatherCodes(weatherCode, img, tod, speed) {
    switch (true) {
        case (weatherCode === 0 || weatherCode === 1):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/clear-${tod}.svg`
            weatherCondition.innerHTML = `There's Clear Skies`
            break
        case (weatherCode === 2):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}.svg`
            weatherCondition.innerHTML = `It's Partly Clody`
            break
        case (weatherCode === 3):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/overcast-${tod}.svg`
            weatherCondition.innerHTML = `The Sky is Overcast`
            break
        case (weatherCode === 45 || weatherCode === 48):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/fog-day.svg`
            weatherCondition.innerHTML = `There's Foggy weather`
            break
        case (weatherCode === 51 || weatherCode === 53 || weatherCode === 55):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-drizzle.svg`
            weatherCondition.innerHTML = `A moderade Drizzle`
            break
        case (weatherCode === 56):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-sleet.svg`
            weatherCondition.innerHTML = `A Freezing Dizzle`
            break
        case (weatherCode === 57):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-hail.svg`
            weatherCondition.innerHTML = `There's Hail`
            break
        case (weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 66 || weatherCode === 67 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-rain.svg`
            weatherCondition.innerHTML = `It's Rainy`
            break
        case (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77 || weatherCode === 85 || weatherCode === 86):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-snow.svg`
            weatherCondition.innerHTML = `It's Snowy`
            break
        case (weatherCode === 95):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/thunderstorms-${tod}.svg`
            weatherCondition.innerHTML = `There's a ThunderStorm`
            break
        case (weatherCode === 96 || weatherCode === 99):
            img.src = `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/thunderstorms-${tod}-rain.svg`
            weatherCondition.innerHTML = `Thunderstorm with Hail`
            break
    }

    let curWindSpeed;
    if (speedUnit === "km/h") {
        curWindSpeed = speed * 0.621371;
    }

    switch (true) {
        case (curWindSpeed > 68):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-12.svg"
            break
        case (curWindSpeed > 59):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-11.svg"
            break
        case (curWindSpeed > 51):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-10.svg"
            break
        case (curWindSpeed > 43):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-9.svg"
            break
        case (curWindSpeed > 35):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-8.svg"
            break
        case (curWindSpeed > 28):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-7.svg"
            break
        case (curWindSpeed > 22):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-6.svg"
            break
        case (curWindSpeed > 16):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-5.svg"
            break
        case (curWindSpeed > 10):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-4.svg"
            break
        case (curWindSpeed > 6):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-3.svg"
            break
        case (curWindSpeed > 2):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-2.svg"
            break
        case (curWindSpeed > 0):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-1.svg"
            break
        case (curWindSpeed <= 0):
            windImg.src = "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-0.svg"
            break
    }
}

function updateValues(obj) {
    cityTemPar.innerHTML = obj.current_weather.temperature
    minTempDisp.innerHTML = `${obj.daily.temperature_2m_min[0]}${unit}`
    maxTempDisp.innerHTML = `${obj.daily.temperature_2m_max[0]}${unit}`
    percDisp.innerHTML = `${obj.daily.precipitation_sum[0]} %`
    windSpeedDIsp.innerHTML = `${obj.current_weather.windspeed} ${speedUnit}`
    getTime(obj.timezone)
    if (new Date(newDate).getHours() > 18) {
        timeOfDay = "night"
    }
}

function updateValuesTwo(obj) {
    cityNamePar.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${obj.country_code.toLowerCase()}.svg"> ${obj.name}, ${obj.country_code} `
}

cityInp.addEventListener("input", () => {
    cityInp.style.border = "none"
    citiesUl.innerHTML = ''
    if (cityInp.value === "") {
        cityInp.style.border = "none"
        return
    }
    getGeoCity(cityInp.value, uni)
})

tempTypeBtm.addEventListener("click", () => {
    if (uni === "&") {
        uni = "&temperature_unit=fahrenheit&windspeed_unit=mph&";
        unit = "°F"
        speedUnit = "mp/h"
        tempTypeBtm.innerHTML = "°F"
        getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni)
    } else {
        uni = "&"
        unit = "°C"
        speedUnit = "km/h"
        tempTypeBtm.innerHTML = "°C"
        getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni)
    }
})



