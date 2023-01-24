
////////////// EXER 1 ///////////////

let digitCounter = (num) => {
    if (num.toString().includes("-")) {
        return num.toString().length - 1;
    };
    return num.toString().length;
};

let oddOrEven = (num) => {
    if (num % 2 === 0) {
        return `${num} is even`;
    };
    return `${num} is odd`;
};

let numState = (num) => {
    if (num > 0) return `${num} is positive`;
    return `${num} is negative`;
};

const evaluateNumber = (num) => {
    if (num === 0) return `The number is 0`;
    return `${oddOrEven(num)}, ${num} has a length of ${digitCounter(num)}, ${numState(num)}`;
};

console.log(evaluateNumber(-33));

//////////// EXER 2 //////////////

const anonInp = document.querySelector(".anonInput");
const anonBtn = document.querySelector(".anonButton");
const anonHead = document.querySelector(".anonHeader");

let vowels = ['a', 'e', 'i', 'o', 'u'];

let vowelCounter = (word, array, dom) => {
    let counter = 0;
    let vowelCount = "vowel";
    for (let i = 0; i < word.length; i++) {
        if (array.includes(word[i])) {
            counter++;
        };
    }
    if (counter > 1) {
        vowelCount = "vowels";
    };
    dom.innerHTML += `\n${word} has ${counter} ${vowelCount}`;
};

anonBtn.addEventListener('click', () => {
    vowelCounter(anonInp.value, vowels, anonHead);
    anonInp.value = "";
});