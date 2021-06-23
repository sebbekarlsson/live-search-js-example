const inputField = document.getElementById("search-input");
const searchResultsDiv = document.getElementById("search-results");
const spinner = document.getElementById("spinner");


function createArticle(title, description) {
  const article = document.createElement("article");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");

  h4.innerText = title;
  p.innerText = description;

  article.appendChild(h4);
  article.appendChild(p);

  return article;
}


let timer = null;

inputField.addEventListener("keyup", async function(event){

  if (timer) {
    // finns det redan en timer, sa tar vi bort den.
    // sa att en ny skapas sedan.
    clearTimeout(timer);
    timer = null;
  }
  const value = event.target.value;

  if (value.length < 2) return;

  spinner.setAttribute("data-active", true);

  // innan vi visar de nya resultaten, rensa de gamla.
  searchResultsDiv.innerHTML = "";

  // vantar en halv sekund sedan kommer koden har i att koras.
  timer = setTimeout(async function(){
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    const obj = await response.json();
    const drinks = obj.drinks;

    console.log("Sorry server for spamming you.");

    // vi har fatt alla nya resultat,
    // dags att skicka in dom i varan div.
    (drinks || []).forEach(function(drink){
      const title = drink.strDrink;
      const description = drink.strInstructions;

      const article = createArticle(title, description);

      searchResultsDiv.appendChild(article);
    });

    spinner.removeAttribute("data-active");
  }, 500);
});
