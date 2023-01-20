

const resultsDiv = document.querySelector(".theResults");
const secondResultsDiv = document.querySelector(".theSecondResults");
const exerThreeBtn = document.querySelector(".exer3Button");
const thirdResultsDiv = document.querySelector(".theThirdResults");

let planetsArray = [];
let peopleArray = [];

const getResult = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status >= 200 && xhttp.status < 300) {
            let parsedResponse = JSON.parse(xhttp.responseText);
            let starWarsResult = parsedResponse.results;
            getPerson(starWarsResult);
            checkFunc();
            resultsDiv.innerHTML = `${starWarsResult[0].name} birth: ${starWarsResult[0].birth_year} <br/>`;
        };
    };
    xhttp.open("GET", "https://swapi.dev/api/people");
    xhttp.send();
};

const getPlanets = () => {
    $.ajax({
        url: 'https://swapi.dev/api/planets',
        success: (r) => {
            resultsShow(r.results);
            getPlanet(r.results);
            checkFunc();
        },
        error: error => {
            console.log(error);
        }
    });
};

function resultsShow(array) {
    secondResultsDiv.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        secondResultsDiv.innerHTML += `<p> This Planet is called: <h3> ${array[i].name} </h3> </p>`;
    };
};

function getPlanet(array) {
    for (let i = 0; i < array.length; i++) {
        planetsArray.push(array[i].name);
    };
};

function getPerson(array) {
    for (let i = 0; i < array.length; i++) {
        peopleArray.push(array[i].name);
    };
};

function showResults(arrayOne, arrayTwo) {
    thirdResultsDiv.innerHTML = "";
    arrayOne.forEach((e, i) => {
        thirdResultsDiv.innerHTML += `\nName: ${arrayOne[i]} From: ${arrayTwo[i]}`;
    });
};

function checkFunc() {
    if (peopleArray.length !== 0 & planetsArray.length !== 0) {
        showResults(peopleArray, planetsArray);
    };
};

exerThreeBtn.addEventListener('click', () => {
    getResult();
    getPlanets();
    planetsArray = [];
    peopleArray = [];
});
