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
  card.querySelector(".count").dataset.count = `${pokemon[i].id}`;
  results.append(card);
}

export function displayPokemons(pokemon) {
  document.getElementById("poke-results").innerHTML = "";
  const loadMoreBtn = document.getElementById("load-more-btn");
  loadMoreBtn.dataset.type = "all";
  loadMoreBtn.style.display = "block";
  for (let i = 0; i < 8; i++) {
    if (i == Object.keys(pokemon).length) {
      loadMoreBtn.style.display = "none";
      break;
    }
    createCard(pokemon, i);
  }
  document.querySelector('[data-type="all"]').onclick = () => {
    const nodes = document.getElementById("poke-results").childElementCount;
    for (let i = nodes; i < nodes + 8; i++) {
      if (i == Object.keys(pokemon).length) {
        loadMoreBtn.style.display = "none";
        break;
      }
      createCard(pokemon, i);
    }
    addRemove(pokemon);
  };
  addRemove(pokemon);
}

export function displayByType(pokemon) {
  const loadMoreBtn = document.getElementById("load-more-btn");
  const typeBtns = document.getElementById("type-btns");
  typeBtns.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
      document.querySelector("#search-bar input").value = "";
      loadMoreBtn.style.display = "block";
      let type = e.target.innerText.toLowerCase();
      loadMoreBtn.dataset.type = type;
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
        loadMoreBtn.style.display = "none";
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
          loadMoreBtn.style.display = "block";
        } else {
          loadMoreBtn.style.display = "none";
        }
        addRemove(pokemon);
      };
      addRemove(pokemon);
    }
  });
}
