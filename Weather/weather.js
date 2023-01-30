function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            currentCityCords.latitude = position.coords.latitude
            currentCityCords.longitude = position.coords.longitude
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "current")
            console.log( currentCityCords.latitude = position.coords.latitude,
                currentCityCords.longitude = position.coords.longitude)
        },
        function (error) {
            console.error("Error: " + error.message);
        }
    );
} getCurrentPosition()

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
            // console.log(d)
            let cityName = d.timezone.split("/").pop();
            cityName = cityName.split("_").join(" ");
            if (direction === "current") {
                getGeoCity(cityName, direction)
            }
            updateValues(d)
            setWeatherImage(d.current_weather.weathercode, timeOfDay, mainImg, weatherCondition, "direct")
            setWindSpeed(d.current_weather.windspeed)
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
            // console.log(d.results)
            if (direction === "current") {
                for (let i = 0; i < d.results.length; i++) {
                    if (currentCityCords.longitude.toFixed(0) === d.results[i].longitude.toFixed(0)) {
                        updateValuesTwo(d.results[i], city, direction)
                        console.log(d.results[i], city)
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
            searchCity(citiesUl, d.results)
        })
        .catch(error => console.log(error))
}

function searchCity(ul, array) {
    if (ul.style.visibility != "visible") {
        ul.style.visibility = "visible"
        ul.style.height = "fit-content"
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
            ul.style.height = "0"
            cityInp.value = ""
            updateValuesTwo(array[i])
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
            for (let anim of loadingAni) {
                anim.style.visibility = "visible"
            }
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

function roundPercision(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function setWindSpeed(windSpeed) {
    let curWindSpeed;
    if (speedUnit === "km/h") {
        curWindSpeed = windSpeed * 0.621371;
        curWindSpeed = roundPercision(curWindSpeed, 1)
    }

    let conditionsOne = new WindConditions();
    for (let condition in conditionsOne.conditions) {
        if (curWindSpeed >= conditionsOne.conditions[condition].minSpeed && curWindSpeed <= conditionsOne.conditions[condition].maxSpeed) {
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
        } else {
            dayOfWeek = dateObject.toLocaleString('default', { hour: 'numeric' });
        }
        days.push(dayOfWeek);
    }

    if (weeklyPressed === true) {
        getHourlyForecast(days, tempArray, tempArrayTwo, tempArrayThree)
        return
    }

    getHourlyForecast(days, tempArray, tempArrayTwo, [], newDates)
}

function getHourlyForecast(arrayOne, arrayTwo, arrayThree, arrayFour, hoursArray) {
    newSuperArray.forEach((innerArray) => {
        innerArray.forEach((element, i) => {
            if (element.nodeName === "H3") {
                innerArray[i].innerHTML = `${arrayOne[i]}`
            }
            if (element.nodeName === "DIV") {
                if (weeklyPressed === true) {
                    innerArray[i].innerHTML = `<h4>${arrayTwo[i]}°</h4><h5>${arrayFour[i]}°</h5>`;
                } else {
                    innerArray[i].innerHTML = `<h4>${arrayTwo[i]}${unit}</h4>`;
                }
            }
            if (element.nodeName === "IMG") {
                if (weeklyPressed === true) {
                    setWeatherImage(arrayThree[i], timeOfDay, innerArray[i], undefined, "indirect")
                } else {
                    if (new Date(hoursArray[i]).getHours() > 18 || new Date(hoursArray[i]).getHours() < 5) {
                        setWeatherImage(arrayThree[i], "night", innerArray[i], undefined, "indirect")
                    } else {
                        setWeatherImage(arrayThree[i], "day", innerArray[i], undefined, "indirect")
                    }
                }
            }
        });
    });
}

function updateValues(obj) {
    cityTemPar.innerHTML = obj.current_weather.temperature
    minTempDisp.innerHTML = `Min Temp: ${obj.daily.temperature_2m_min[1]}${unit}`
    maxTempDisp.innerHTML = `Max Temp: ${obj.daily.temperature_2m_max[1]}${unit}`
    percDisp.innerHTML = `Precipitation: ${obj.daily.precipitation_sum[1]} %`
    windSpeedDIsp.innerHTML = `Wind Speed: ${obj.current_weather.windspeed} ${speedUnit}`
    getTime(obj.timezone)
    if (new Date(newDate).getHours() > 18) {
        timeOfDay = "night"
    }
    getPreviousThreeDatesIndex(obj, new Date(newDate).getDate(), new Date(newDate).getMonth(), new Date(newDate).getHours());
    for (let anim of loadingAni) {
        anim.style.visibility = "hidden"
    }
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
        for (let anim of loadingAni) {
            anim.style.visibility = "visible"
        }
    } else {
        uni = "&"
        unit = "°C"
        speedUnit = "km/h"
        tempTypeBtm.innerHTML = "°C"
        getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
        for (let anim of loadingAni) {
            anim.style.visibility = "visible"
        }
    }
})

hourlyBtn.addEventListener("click", () => {
    if (weeklyPressed === false) return
    hourlyBtn.classList.add("show-before");
    weeklyBtn.classList.remove("show-before");
    weeklyPressed = false
    getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
    for (let anim of loadingAni) {
        anim.style.visibility = "visible"
    }
})

weeklyBtn.addEventListener("click", () => {
    if (weeklyPressed === true) return
    weeklyBtn.classList.add("show-before");
    hourlyBtn.classList.remove("show-before");
    weeklyPressed = true
    getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
    for (let anim of loadingAni) {
        anim.style.visibility = "visible"
    }
})