
const cityDiv = document.querySelector(".currentCity")
const cityNamePar = document.querySelector(".cityName")
const cityInfoDiv = document.querySelector(".cityInfo")
const hourlyBtn = document.querySelector(".hourlyButton")
const weeklyBtn = document.querySelector(".weeklyButton")

const temperatureDiv = document.querySelector(".currentTemperature");
const weatherImg = document.querySelector(".weatherImage")
const cityTemPar = document.querySelector("#tempDisp")
const tempTypeBtm = document.querySelector(".temperatureType")

const searchDiv = document.querySelector(".searchCity")
const cityInp = document.querySelector(".cityInput")
const cityBtn = document.querySelector(".cityButton")

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

let currentCityCords = {
    latitude: 41.99646,
    longitude: 21.43141
}

function getTime() {
    let abrv = "th"
    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate()
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
    let t = setTimeout(function(){ getTime() }, 1000);
}

getTime()

function getGeoCity(city) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then(r => {
            if (r.ok) {
                console.log("SUCCESS1")
                return r.json()
            } else {
                console.log("not success1")
                return
            }
        })
        .then(d => {
            console.log(d.results[0].latitude)
            console.log(d.results[0].longitude)
            currentCityCords.latitude = d.results[0].latitude
            currentCityCords.longitude = d.results[0].longitude
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude)
        })
        .catch(error => console.log(error))
}

getGeoCity("London")

function getCityWeather(long, lat) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`)
        .then(r => {
            if (r.ok) {
                console.log("SUCCESS2")
                return r.json()
            } else {
                console.log("not success2")
                return
            }
        })
        .then(d => {
            console.log(d)
            cityTemPar.innerHTML = d.current_weather.temperature
        })
        .catch(error => console.log(error))
}



