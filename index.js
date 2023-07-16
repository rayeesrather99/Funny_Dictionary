document.addEventListener('DOMContentLoaded', () => {


const searchInput = document.querySelector(".search");
const result = document.querySelector(".result");
const btnElm = document.querySelector(".btn");
const jokeResult = document.querySelector(".joke");

btnElm.addEventListener("click", () => {
  fetchApi();
  fetchJoke();
});

function fetchApi() {
    const searchInputValue = searchInput.value;
    const xmlObj = new XMLHttpRequest();
    xmlObj.open(
        "GET",
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInputValue}`,
        true
    );
    xmlObj.onload = () => {
        if (xmlObj.status === 200) {
            const response = JSON.parse(xmlObj.responseText);
            const meanings = response[0]?.meanings || [];
            const definitions = meanings[0]?.definitions || [];
            let resultText = "";
            for (const def of definitions) {
                resultText += `<li>${def.definition}</li>`;
            }
            if (resultText) {
              result.style.cssText = "font-size:1.1rem; text-align: left";
              result.innerHTML = `<ul style="list-style-type: circle">${resultText}</ul>`;
            } else {
                result.innerHTML = "No definitions found.";
            }
        } else {
            console.log("ERROR");
            result.innerHTML = "404 Word not found";
        }
    };
    xmlObj.send();
}

function fetchJoke() {
  const jokeObj = new XMLHttpRequest();
  jokeObj.open(
    "GET",
    "https://v2.jokeapi.dev/joke/Programming?type=single",
    true
  );

  jokeObj.onload = () => {
    if (jokeObj.status === 200) {
      const jokeResponse = JSON.parse(jokeObj.response);
      jokeResult.style.cssText = "font-size: 14px";
      jokeResult.innerHTML = jokeResponse?.joke || "No joke found.";
    }
  };
  jokeObj.send();
}
});