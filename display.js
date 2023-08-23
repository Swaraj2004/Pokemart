import { types } from "./types.js";
import { addRemove } from "./cart.js";

export function createCard(pokemon, i) {
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

export function displayPokemons(pokemon) {
  document.getElementById("poke-results").innerHTML = "";
  document.getElementById("load-more-btn").style.display = "none";
  for (let i = 0; i < 8; i++) {
    if (i == Object.keys(pokemon).length) {
      document.getElementById("load-more-all").style.display = "none";
      break;
    }
    createCard(pokemon, i);
  }
  document.getElementById("load-more-all").style.display = "block";
  addRemove(pokemon);
  loadMoreAll(pokemon);
}

export function loadMoreAll(pokemon) {
  document.getElementById("load-more-all").onclick = () => {
    let nodes = document.getElementById("poke-results").childElementCount;
    for (let i = nodes; i < nodes + 8; i++) {
      if (i == Object.keys(pokemon).length) {
        document.getElementById("load-more-all").style.display = "none";
        break;
      }
      createCard(pokemon, i);
    }
    addRemove(pokemon);
  };
}

export function displayByType(pokemon) {
  let divs = document.querySelectorAll(".type");
  divs.forEach(function (el) {
    el.addEventListener("click", (e) => {
      document.querySelector("#search-bar input").value = "";
      document.getElementById("load-more-all").style.display = "none";
      document.getElementById("load-more-btn").style.display = "block";
      let type = e.currentTarget.innerHTML;
      document.getElementById("load-more-btn").dataset.type = type;
      let typeno;
      Object.keys(types).forEach(
        (key) => {
          if (Object.keys(types[key])[0] == type) {
            typeno = key;
          }
        },
        type,
        typeno
      );
      if (type == "all") {
        displayPokemons(pokemon);
        return;
      }
      document.getElementById("poke-results").innerHTML = "";
      let read = 0;
      for (let i = 0, count = 0; i < Object.keys(pokemon).length; i++) {
        if (pokemon[i].type1 == type || pokemon[i].type2 == type) {
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
      document.querySelector(`[data-type="${type}"]`).onclick = () => {
        for (let i = read, count = 0; i < Object.keys(pokemon).length; i++) {
          if (pokemon[i].type1 == type || pokemon[i].type2 == type) {
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
      addRemove(pokemon);
    });
  });
}
