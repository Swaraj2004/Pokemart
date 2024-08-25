import { assignColors } from "./types.js";
import getPokemons from "./fetch.js";
import { displayPokemons, displayByType } from "./display.js";
import { addRemove, deleteItem, buy } from "./cart.js";
import { searchPokemon } from "./search.js";

function checkScreenWidth() {
  if (window.innerWidth < 1200) {
    document.getElementById("container").style.display = "none";
    document.getElementById("view-error").style.display = "flex";
  } else {
    assignColors();
    document.getElementById("container").style.display = "flex";
    document.getElementById("view-error").style.display = "none";
  }
}

async function main() {
  document.querySelector("#search-bar input").value = "";
  window.onload = function () {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
  };

  const pokemon = await getPokemons();
  // console.log(pokemon);
  displayPokemons(pokemon);
  displayByType(pokemon);
  addRemove(pokemon);
  deleteItem(pokemon);
  searchPokemon(pokemon);
  buy(pokemon);
}
main();
