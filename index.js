// variables

const urlBase = "https://api.punkapi.com/v2/beers?page=";
const filterABV = document.getElementById("filterABV");
const filterIBU = document.getElementById("filterIBU");
const pageText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let optionsABV = "";
let optionsIBU = "";
page = 1;

// filters

filterABV.addEventListener('change', (event) => {
   const value = event.target.value

   switch (value) {
      case "all":
         optionsABV = "";
         break
      case "weak":
         optionsABV = "&abv_lt=4.6";
         break
      case "medium":
         optionsABV = "&abv_gt=4.5&abv_lt=7.6";
         break
      case "strong":
         optionsABV = "&abv_gt=7.5";
         break
   }

   page = 1;
   getBeers();
});

filterIBU.addEventListener('change', (event) => {
   const value = event.target.value

   switch (value) {
      case "all":
         optionsIBU = "";
         break
      case "weak":
         optionsIBU = "&ibu_lt=35";
         break
      case "medium":
         optionsIBU = "&ibu_gt=34&ibu_lt=75";
         break
      case "strong":
         optionsIBU = "&ibu_gt=74";
         break
   }

   page = 1;
   getBeers();
});

async function getBeers() {

   const url = urlBase + page + optionsABV + optionsIBU;

   // fetch
   const getPromise = await fetch(url);
   const beers =  await getPromise.json();

   // pagination
   page === 1 ? prevPage.disabled = true : prevPage.disabled = false;
   beers.lenght < 25  ? nextPage.disabled = true : nextPage.disabled = false;
   pageText.innerText = page;

   // render data
   const beerDiv = document.querySelector(".beers");

   let beerHtml = "";
   const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';

   // Add the rest of the beer data to the HTML template

   beers.forEach(beer => {
      beerHtml += `
      <div class="beer-wrapper card">
         <div class="beer">
            <img class="beer__img" src="${beer.image_url ? beer.image_url : genericBottle }">
            <h3>${beer.name}</h3>
            <span class="beer__info">
               <span>ABV: ${beer.abv}%</span>
               <span>IBU: ${beer.ibu}</span>
            </span>
         </div>
         <div class="beer__content">
            <div class="beer__name">${beer.name}</div>
            <div class="beer__tagline">${beer.tagline}</div>
            <div class="beer__description">${beer.description}</div>
            <div class="beer__food-pairing">
               Pair with: ${beer.food_pairing.join(', ')}
            </div>
         </div>
      </div>
      `;
   });
   beerDiv.innerHTML = beerHtml;
}

// pagination
prevPage.addEventListener('click', () => {
   page--;
   getBeers();
})
nextPage.addEventListener('click', () => {
   page++;
   getBeers();
})

// initial get
getBeers();