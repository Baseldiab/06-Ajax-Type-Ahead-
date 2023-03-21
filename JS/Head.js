// Json cities Files
const endpoint = 'https://baseldiab.github.io/06-Ajax-Type-Ahead-/Json/eg.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))
// <------------------------------------------------------------------------------------->
// Regular Expression for searching cities
function findMatch(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.admin_name.match(regex)
    })
}
// <------------------------------------------------------------------------------------>
// Member with commas
function numberToMatch(X) {
    return X.toString().replace(/\B(?=(\d{3})+?!\d) /g ,',');
}

// <------------------------------------------------------------------------------------>
// display input
function DisplayMaches() {
    const MatchArray = findMatch(this.value, cities);
    const html = MatchArray.map(place => {
        const regex = new RegExp(this.value,'gi');

        const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`);
        const GovernmentName = place.admin_name.replace(regex, `<span class="h1">${this.value}</span>`);

        return `
            <li>
                <span class="name">${cityName},${GovernmentName}</span>
                <span class="population">${numberToMatch(place.population)}</span>
            </li>`;
    }).join("");
    suggestions.innerHTML = html;
}

// <------------------------------------------------------------------------------------>
// search input

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener('change', DisplayMaches);
searchInput.addEventListener('keyup', DisplayMaches);






// <------------------------------------------------------------------------------------>




