import { assignColors } from "./types.js";
import getPokemons from "./fetch.js";
import { displayPokemons, displayByType } from "./display.js";
import { addRemove, deleteItem, buy } from "./cart.js";
import { searchPokemon } from "./search.js";

async function main() {
  document.querySelector("#search-bar input").value = "";
  window.onload = function () {
    assignColors();
    document.getElementById("container").style.display = "flex";
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
