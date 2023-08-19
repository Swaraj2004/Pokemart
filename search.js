import { addRemove } from "./cart.js";
import { displayPokemons } from "./display.js";

export function searchPokemon(pokemon) {
  document.querySelector("#search-bar input").addEventListener(
    "keyup",
    debounce((e) => {
      e.preventDefault();
      document.getElementById(`load-more-all`).style.display = "none";
      document.getElementById(`load-more-btn`).style.display = "none";
      document.getElementById("poke-results").innerHTML = "";
      let value = e.target.value.toLowerCase();
      if (value == "") {
        document.getElementById("poke-results").innerHTML = "";
        displayPokemons(pokemon);
        return;
      }

      for (let i = 0; i < Object.keys(pokemon).length; i++) {
        if (pokemon[i].name.includes(value)) {
          const results = document.getElementById("poke-results");
          const cardTemplate = document.getElementById("poke-card-template");
          const card = cardTemplate.content.cloneNode(true);
          card.querySelector(".poke-name").innerText = `${pokemon[i].name}`;
          card.querySelector(".poke-price").innerText = `$${pokemon[i].price}`;
          card.querySelector(".poke-img img").src = `${pokemon[i].img}`;
          card.querySelector(".count").innerText = `${pokemon[i].count}`;
          card.querySelector(".minus").dataset.minus = `${pokemon[i].id}`;
          card.querySelector(".plus").dataset.plus = `${pokemon[i].id}`;
          results.append(card);
        }
      }
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
