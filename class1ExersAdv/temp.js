
//////// EXER 1 /////////

function arraySearch(array, num) {
    for (i = 0; i < array.length; i++) {
        if (num === array[i]) {
            console.log(array.indexOf(num));
        } else {
            console.log("-1");
        }
    }
}

arraySearch([3, 6, 9, 8, 2], 9);

///////// EXER 2 //////////

function evenlyOddArray(array) {
    let newArray = [];
    if (array.length === 0) return;
    for (i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            Array[i]--;
        } else if (array[i] % 2 === 1) {
            Array[i]++;
        };
        if (isNaN(array[i])) {
            console.log("Index of " + array.indexOf(array[i]) + " isnt a number");
        };
        newArray.push(array[i]);
    }
    return newArray;
}

console.log(evenlyOddArray([3, 7, 8, 2, "dime", 9, 10]));

///////// EXER 3 //////////

let objectsArray = [{
    studentName: "Bob",
    studentLastname: "Bobski",
    studentGrades: [10, 10, 10, 10, 7, 9, 6, 10, 6, 9]
},
{
    studentName: "John",
    studentLastname: "Doe",
    studentGrades: [6, 6, 6, 10, 6, 7, 7, 7, 7, 6]
},
];

let sum = 0;

function studentAverage(array, studentArray) {
    let average = 0;
    let newerArray = [];
    studentArray.forEach(function (num) { sum += num });
    average = sum / studentArray.length;
    if (average >= 8) {
        newerArray.push(array[0].studentName, array[0].studentLastname);
    } else {
        return "Student didnt pass";
    }
    return newerArray;
}

console.log(studentAverage(objectsArray, objectsArray[0].studentGrades));

///////// EXER 4 //////////

const tableElement = document.querySelector(".tableOne");
const exer4Btn = document.querySelector(".exer4Button");
const movieInp = document.querySelector(".movieInput");

function MovieLibary(movieName, movieDirector, movieReleaseDate, id) {
    this.mName = movieName;
    this.dName = movieDirector;
    this.year = movieReleaseDate;
    this.id = id;
};

let movieInputsArray = [];
let movies = [];
let newMovie = {};
let idNumber = 0;

function inputSplit(array, Input) {
    let split = Input.split(",");
    for (let i of split) {
        array.push(i)
    }
    return array;
}

function movieCreator() {
    newMovie = new MovieLibary(movieInputsArray[0], movieInputsArray[1], movieInputsArray[2], idNumber++);
    movies.push(newMovie);
}

function displayMovies(table, tempMovie) {
    let row = document.createElement("tr");
    let tableData = document.createElement("td");

    tableData.innerHTML = `Title: ${tempMovie.mName}\nDirector: ${tempMovie.dName}\nYear: ${tempMovie.year}
    \n<button class="edit-btn" data-id="${tempMovie.id}">Edit</button> <button class="remove-btn" data-id="${tempMovie.id}">Remove</button>`;

    row.appendChild(tableData);
    table.appendChild(row);

    function editMovie(num) {
        let currentMovie = {};
        inputSplit(movieInputsArray, movieInp.value);
        const id = Number(num)

        movies.forEach(e => {
            if (e.id === id) {
                currentMovie = e;
                currentMovie.mName = movieInputsArray[0];
                currentMovie.dName = movieInputsArray[1];
                currentMovie.year = movieInputsArray[2];
            }
        });

        tableData.innerHTML = `Title: ${currentMovie.mName}\nDirector: ${currentMovie.dName}\nYear: ${currentMovie.year}
        \n<button class="edit-btn" data-id="${currentMovie.id}">Edit</button> <button class="remove-btn" data-id="${currentMovie.id}">Remove</button>`;

        row.querySelector('.edit-btn').addEventListener("click", () => {
            editMovie(id);
        });
        row.querySelector('.remove-btn').addEventListener("click", () => {
            deleteMovie(id);
        });

        movieInputsArray = [];
    };

    function deleteMovie(num) {
        const id = Number(num);
        movies.splice(id, 1);
        row.remove();
    }

    row.querySelector('.edit-btn').addEventListener("click", () => {
        editMovie(tempMovie.id);
    });

    row.querySelector('.remove-btn').addEventListener("click", () => {
        deleteMovie(tempMovie.id);
    });
};

exer4Btn.addEventListener('click', () => {
    inputSplit(movieInputsArray, movieInp.value);
    movieCreator();
    displayMovies(tableElement, newMovie);
    movieInputsArray = [];
});



const inputOne = document.querySelector(".oneInput")
const inputTwo = document.querySelector(".twoInput")
const changeBtn = document.querySelector(".changeButton")
const textPar = document.querySelector(".parText")

const changeText = (clr, size) => {
    textPar.style.color = clr
    textPar.style.fontSize = size
}

changeBtn.addEventListener('click', () => {
    changeText(inputOne.value, inputTwo.value)
})