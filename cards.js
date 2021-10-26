'use strict';

let terms;
let abbr;
let long;

const guess = document.querySelector("p");
const abbreviation = document.querySelector("abbr");

const rotate = () => {
    ({ abbr, long } = terms[Math.floor(Math.random() * terms.length)]);
    
    guess.classList.remove("correct");
    guess.classList.remove("wrong");
    guess.textContent = "";
    abbreviation.textContent = abbr;
}

const correct = () => guess.classList.add("correct");

async function init() {
    terms = await (await fetch("terms/cysa.json")).json();

    document.querySelector("body").addEventListener("click", e => rotate())

    abbreviation.addEventListener("click", e => {
        e.stopPropagation();
        guess.classList.add("wrong");
        guess.textContent = long;
    })

    guess.addEventListener("click", e => e.stopPropagation());

    guess.addEventListener("input", e => {
        console.dir(e)

        const typed = e.target.textContent.toLowerCase().replace(",", "").replace("&", "");
        const term = long.toLowerCase().replace(",", "").replace("&", "");
        guess.classList.remove("wrong");
        if (typed == term) {
            guess.textContent = long;
            correct();
        }
    });
    
    rotate();
}

init();