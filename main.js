import { assignColors } from "./types.js";
import getPokemons from "./fetch.js";
import { displayPokemons, displayByType } from "./display.js";
import { addRemove, buy } from "./cart.js";
import { searchPokemon } from "./search.js";

async function main() {
  document.querySelector("#search-bar input").value = "";
  assignColors();
  const pokemon = await getPokemons();
  // console.log(pokemon);
  displayPokemons(pokemon);
  displayByType(pokemon);
  addRemove(pokemon);
  searchPokemon(pokemon);
  buy(pokemon);
}
main();
