import * as bootstrap from "bootstrap";
const axios = require("axios").default;

const formBtn = document.querySelector("#action-btn");
const inputURL = document.querySelector("#urlInput");
const errorMessage = document.querySelector(".form__error-text");

// input focus event
inputURL.addEventListener('focus', function(e) {
    e.target.select();
    errorMessage.style.display = "none"
    inputURL.classList.remove('form__input--error')
})

// submit click event
formBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let inputValue = inputURL.value;
    if(inputValue.length < 1) {
        errorMessage.style.display = "block"
        inputURL.classList.add('form__input--error')
        return
    }
    getShortURL(inputValue);
});

// get data
async function getShortURL(url) {
    let realURL = `https://api.shrtco.de/v2/shorten?url=${url}`;
    try {
        const response = await axios.get(realURL);
        let data = response.data.result;
        createCard(data);
    } catch (error) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "<i>Please enter vaild URL</i>";
        inputURL.classList.add('form__input--error');
        console.error(error);
    }
}


// create card
function createCard(data) {

    // card
    const card = document.createElement("div");
    card.classList.add('card', 'mt-4', 'result');

    // card body
    const cardBody = document.createElement("div");
    cardBody.classList.add('card-body');

    // link flex wrapper
    const flexDiv = document.createElement("div");
    flexDiv.classList.add('d-flex', 'flex-column', 'flex-lg-row' ,'justify-content-between', 'align-items-center');

    // short link div
    const divShortLink = document.createElement("div");
    divShortLink.classList.add("text-primary", 'result__short');
    divShortLink.innerHTML = data.full_short_link3;

    // orginal link div
    const divOriginalLink = document.createElement("div");
    divOriginalLink.classList.add('result__original');
    divOriginalLink.innerHTML = data.original_link;

    // copied button
    const link = document.createElement("a");
    link.classList.add('btn', 'btn-primary', 'text-white', 'result__btn', 'btn-lg');
    link.innerHTML = 'Copy';
   
    // button click event
    link.addEventListener('click', function(e) {
        let a = document.querySelectorAll(".result__btn");
        a.forEach( function(item) {
            item.classList.remove('btn-secondary');
            item.classList.add('btn-primary');
            item.innerHTML='Copy';
        })
        navigator.clipboard.writeText(data.full_short_link3);
        e.target.classList.add('btn-secondary');
        e.target.classList.remove('btn-primary');
        e.target.innerHTML='Copied!';
    });

    // build element
    flexDiv.append(divOriginalLink);
    flexDiv.append(divShortLink);
    flexDiv.append(link);
    cardBody.append(flexDiv);
    card.append(cardBody);
    document.querySelector("#results").append(card);
}


