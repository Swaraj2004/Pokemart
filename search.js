import { addRemove } from "./cart.js";
import { displayPokemons, createCard } from "./display.js";

export function searchPokemon(pokemon) {
  document.querySelector("#search-bar input").addEventListener(
    "keyup",
    debounce((e) => {
      e.preventDefault();
      document.getElementById(`load-more-all`).style.display = "none";
      document.getElementById(`load-more-btn`).style.display = "block";
      document.getElementById("poke-results").innerHTML = "";
      document.getElementById("load-more-btn").dataset.type = "search";
      let value = e.target.value.toLowerCase();
      if (value == "") {
        document.getElementById("poke-results").innerHTML = "";
        displayPokemons(pokemon);
        return;
      }
      let read = 0;
      for (let i = 0, count = 0; i < Object.keys(pokemon).length; i++) {
        if (pokemon[i].name.includes(value)) {
          count++;
          if (count == 9 || read == Object.keys(pokemon).length) {
            break;
          }
          createCard(pokemon, i);
        }
        read = i + 1;
      }
      if (read >= Object.keys(pokemon).length) {
        document.getElementById(`load-more-btn`).style.display = "none";
      }
      document.querySelector('[data-type="search"]').onclick = () => {
        for (let i = read, count = 0; i < Object.keys(pokemon).length; i++) {
          if (pokemon[i].name.includes(value)) {
            count++;
            if (count == 9 || read == Object.keys(pokemon).length) {
              break;
            }
            createCard(pokemon, i);
          }
          read = i + 1;
        }
        if (read < Object.keys(pokemon).length) {
          document.getElementById(`load-more-btn`).style.display = "block";
        } else {
          document.getElementById(`load-more-btn`).style.display = "none";
        }
        addRemove(pokemon);
      };
      if (document.getElementById("poke-results").childElementCount == 0) {
        document.getElementById("poke-results").innerHTML =
          '<div id="not-found">No Pokemon Found<div>';
      }
      addRemove(pokemon);
    })
  );
}

function debounce(fn, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
