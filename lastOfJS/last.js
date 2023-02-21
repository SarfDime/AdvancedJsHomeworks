// https://restcountries.com/v3.1/name/{name}

const countriesInp = document.querySelector(".countriesInput");
const countriesPar = document.querySelector(".countriesParagraph");
const countriesList = document.querySelector(".countriesUL");

let chosenCountriesArray = [];

const makeCall = async url => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('The request failed!');
        return error
    }
}

async function searchCity(ul, input) {
    if (ul.style.visibility != "visible") {
        ul.style.visibility = "visible"
        ul.style.height = "fit-content"
    }

    const countriesArray = await makeCall(`https://restcountries.com/v3.1/name/${input}`)

    for (let i = 0; i < countriesArray.length; i++) {
        let li = document.createElement("li");

        if (countriesArray[i].capital === undefined) {
            li.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${countriesArray[i].cca2.toLowerCase()}.svg"> <h4>${countriesArray[i].name.common}</h4>`
        } else {
            li.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${countriesArray[i].cca2.toLowerCase()}.svg"> <h4>${countriesArray[i].name.common}</h4>(${countriesArray[i].capital[0]})`
        }

        li.addEventListener("click", () => {
            ul.style.visibility = "hidden"
            ul.style.height = "0"
            countriesInp.value = ""
            if (chosenCountriesArray.some(country => country.cca2 === countriesArray[i].cca2)) {
                return;
            }

            let newLi = document.createElement('li');
            if (countriesArray[i].capital === undefined) {
                newLi.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${countriesArray[i].cca2.toLowerCase()}.svg"> <h4>${countriesArray[i].name.common}</h4>`
                countriesPar.appendChild(newLi);
                chosenCountriesArray.push(countriesArray[i])
                return
            }
            
            newLi.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${countriesArray[i].cca2.toLowerCase()}.svg"> <h4>${countriesArray[i].name.common}</h4>(${countriesArray[i].capital[0]})`;
            countriesPar.appendChild(newLi);
            chosenCountriesArray.push(countriesArray[i])
        });
        ul.appendChild(li);
    }
}

countriesInp.addEventListener("input", () => {
    countriesList.innerHTML = ''
    if (countriesInp.value === "") {
        countriesList.style.visibility = "hidden"
        return
    }
    searchCity(countriesList, countriesInp.value)
})