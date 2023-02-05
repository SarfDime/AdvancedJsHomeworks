
const categy = document.querySelector(".categories")
const chuckBtn = document.querySelector(".chuckButton")
const catUl = document.querySelector(".catSection")
const curCatDisplay = document.querySelector(".curCatDisplay")
const jokeDisp = document.querySelector(".jokeDisplay")

const makeCall = async url => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('The request failed!');
        return error
    }
}

getCategories()

let currentCategory = "none"

function showCategory() {
    curCatDisplay.innerHTML = `Current Category: ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`
}

async function getCategories() {
    const categoriesArray = await makeCall("https://api.chucknorris.io/jokes/categories")
    categoriesArray.forEach(e => {
        let li = document.createElement("li");
        li.innerHTML = e.charAt(0).toUpperCase() + e.slice(1)
        li.addEventListener('click', () => {
            currentCategory = e
            showCategory();
        })
        catUl.appendChild(li)
    })
}

async function getJoke(){
    let joke;
    if(currentCategory === "none"){
        joke = await makeCall(`https://api.chucknorris.io/jokes/random`)
    }else{
        joke = await makeCall(`https://api.chucknorris.io/jokes/random?category=${currentCategory}`)
    }
    jokeDisp.innerHTML = joke.value
}

catUl.addEventListener("mouseover", () => {
    catUl.style.height = "36.5rem"
})
catUl.addEventListener("mouseout", function () {
    catUl.style.height = "2rem"
});

chuckBtn.addEventListener("click", () =>{
    getJoke()
})


