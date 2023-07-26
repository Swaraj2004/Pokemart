const types = {
  0: { all: "#595959" },
  1: { normal: "#bfb97f" },
  2: { fighting: "#d32f2e" },
  3: { flying: "#9e87e1" },
  4: { poison: "#aa47bc" },
  5: { ground: "#dfb352" },
  6: { rock: "#bda537" },
  7: { bug: "#98b92d" },
  8: { ghost: "#7556a4" },
  9: { steel: "#b4b4cc" },
  10: { fire: "#e86513" },
  11: { water: "#2196f3" },
  12: { grass: "#4cb050" },
  13: { electric: "#fecd07" },
  14: { psychic: "#ec407a" },
  15: { ice: "#80deea" },
  16: { dragon: "#673bb7" },
  17: { fairy: "#f483bb" },
};

async function main() {
  document.querySelector("#search-bar input").value = "";
  assignColors();
  const pokemon = await getPokemons();
  console.log(pokemon);
  displayPokemons(pokemon);
  displayByType(pokemon);
  addRemove(pokemon);
  searchPokemon(pokemon);
  buy(pokemon);
}
main();

async function getPokemons() {
  let pokeObj = {};
  let pokeFetch = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
  const data = await pokeFetch.json();
  const resArr = data.pokemon_entries;
  for (let i in resArr) {
    let pokeOrder = resArr[i].entry_number,
      pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokeOrder}/`;
    let pokeData = await fetch(pokeUrl);
    const newdata = await pokeData.json();
    // console.log(newdata);
    let id = newdata.id,
      name = newdata.name,
      price = newdata.base_experience,
      count = 0,
      type1 = newdata.types[0].type.name,
      type2 = newdata.types[1]?.type.name,
      img = newdata.sprites.other["official-artwork"].front_default;

    pokeObj[i] = { id, name, price, count, type1, type2, img };
  }
  return pokeObj;
}

function assignColors() {
  for (let i = 0; i < Object.keys(types).length; i++) {
    const child = document.getElementById(`type-btns`).children.item(i);
    const childclr = types[i][child.innerHTML];
    child.style.backgroundColor = childclr;
    child.style.textTransform = "capitalize";
    child.setAttribute("class", "type");
  }
}

function displayPokemons(pokemon) {
  document.getElementById("poke-results").innerHTML = "";
  document.getElementById("load-more-btn").style.display = "none";
  for (let i = 0; i < 8; i++) {
    if (i == Object.keys(pokemon).length) {
      document.getElementById("load-more-all").style.display = "none";
      break;
    }
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
  document.getElementById("load-more-all").style.display = "block";
  addRemove(pokemon);
  loadMoreAll(pokemon);
}

function loadMoreAll(pokemon) {
  document.getElementById("load-more-all").onclick = () => {
    let nodes = document.getElementById("poke-results").childElementCount;
    for (let i = nodes; i < nodes + 8; i++) {
      if (i == Object.keys(pokemon).length) {
        document.getElementById("load-more-all").style.display = "none";
        break;
      }
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
    addRemove(pokemon);
  };
}

function displayByType(pokemon) {
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
      let read = 0;
      document.getElementById("poke-results").innerHTML = "";
      if (type == "all") {
        displayPokemons(pokemon);
        return;
      }
      for (let i = 0, count = 0; i < Object.keys(pokemon).length; i++) {
        if (pokemon[i].type1 == type || pokemon[i].type2 == type) {
          count++;
          if (count == 9 || read == Object.keys(pokemon).length) {
            break;
          }
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
            const results = document.getElementById("poke-results");
            const cardTemplate = document.getElementById("poke-card-template");
            const card = cardTemplate.content.cloneNode(true);
            card.querySelector(".poke-name").innerText = `${pokemon[i].name}`;
            card.querySelector(
              ".poke-price"
            ).innerText = `$${pokemon[i].price}`;
            card.querySelector(".poke-img img").src = `${pokemon[i].img}`;
            card.querySelector(".count").innerText = `${pokemon[i].count}`;
            card.querySelector(".minus").dataset.minus = `${pokemon[i].id}`;
            card.querySelector(".plus").dataset.plus = `${pokemon[i].id}`;
            results.append(card);
          }
          read = i + 1;
        }
        console.log(read);
        if (read < Object.keys(pokemon).length) {
          document.getElementById(`load-more-btn`).style.display = "block";
        } else {
          document.getElementById(`load-more-btn`).style.display = "none";
        }
      };
      addRemove(pokemon);
    });
  });
}

function searchPokemon(pokemon) {
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

function addRemove(pokemon) {
  const plusbtns = document.querySelectorAll(".plus");
  const minusbtns = document.querySelectorAll(".minus");
  const counts = document.querySelectorAll(".count");
  for (let i = 0; i < plusbtns.length; i++) {
    let plusbtn = plusbtns[i];
    let minusbtn = minusbtns[i];
    let countdisplay = counts[i];
    plusbtn.onclick = (e) => {
      const id = e.currentTarget.getAttribute("data-plus") - 1;
      pokemon[id].count++;
      countdisplay.innerText = `${pokemon[id].count}`;
      addItem(id, pokemon);
      billUpdater();
      itemListChecker();
      deleteItem(pokemon);
    };
    minusbtn.onclick = (e) => {
      const id = e.currentTarget.getAttribute("data-minus") - 1;
      if (pokemon[id].count > 0) {
        pokemon[id].count--;
        countdisplay.innerText = `${pokemon[id].count}`;
        removeItem(id, pokemon);
        billUpdater();
        itemListChecker();
        deleteItem(pokemon);
      }
    };
  }
}

function addItem(id, pokemon) {
  const name = pokemon[id].name;
  const count = pokemon[id].count;
  const price = pokemon[id].price;
  const itemList = document.getElementsByClassName("poke-item");
  let found = false;
  for (let i = 0; i < itemList.length; i++) {
    let nametext = itemList[i].children[0].innerText;
    if (nametext.toLowerCase() === name) {
      itemList[i].children[1].innerText = `x${count}`;
      itemList[i].children[2].innerText = `$${price * count}`;
      found = true;
      break;
    }
  }
  if (!found) {
    const itemTemplate = document.getElementById("poke-item-template");
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector(".item-name").innerText =
      name.charAt(0).toUpperCase() + name.slice(1);
    item.querySelector(".item-count").innerText = `x${count}`;
    item.querySelector(".item-price").innerText = `$${price}`;
    item.querySelector(".delete-btn").dataset.close = id;
    document.getElementById("cart").append(item);
  }
}

function removeItem(id, pokemon) {
  const name = pokemon[id].name;
  const count = pokemon[id].count;
  const price = pokemon[id].price;
  const itemList = document.getElementsByClassName("poke-item");
  for (let i = 0; i < itemList.length; i++) {
    let nametext = itemList[i].children[0].innerText;
    if (nametext.toLowerCase() === name) {
      itemList[i].children[1].innerText = `x${count}`;
      itemList[i].children[2].innerText = `$${price * count}`;
      if (itemList[i].children[1].innerText === `x${0}`) {
        itemList[i].remove();
      }
      break;
    }
  }
}

function billUpdater() {
  const itemList = document.getElementsByClassName("poke-item");
  let subtotal = 0;
  for (let i = 0; i < itemList.length; i++) {
    let price = parseInt(itemList[i].children[2].innerText.slice(1));
    subtotal += price;
  }
  document.getElementById("subtotal").innerText = `$${subtotal}`;
  document.getElementById("tax").innerText = `$${(subtotal * 0.18).toFixed(2)}`;
  document.getElementById("total").innerText = `$${(
    subtotal +
    subtotal * 0.18
  ).toFixed(2)}`;
}

function itemListChecker() {
  const itemList = document.getElementsByClassName("poke-item");
  if (itemList !== null && itemList.length > 0) {
    document.getElementById("no-items").style.display = "none";
    document.getElementById("bill").style.display = "flex";
  } else {
    document.getElementById("no-items").style.display = "block";
    document.getElementById("bill").style.display = "none";
  }
}

function deleteItem(pokemon) {
  const itemList = document.getElementsByClassName("poke-item");
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].children[3].onclick = () => {
      const id = itemList[i].children[3].dataset.close;
      itemList[i].remove();
      pokemon[id].count = 0;
      billUpdater();
      displayPokemons(pokemon);
      itemListChecker();
      deleteItem(pokemon);
    };
  }
}

function countReset(pokemon) {
  for (let i = 0; i < Object.keys(pokemon).length; i++) {
    pokemon[i].count = 0;
  }
}

function buy(pokemon) {
  document.getElementById("buy-btn").onclick = () => {
    document.getElementById("cart").innerHTML = "";
    itemListChecker();
    countReset(pokemon);
    displayPokemons(pokemon);
    setTimeout(function () {
      alert("Thanks for purchase! ❤️");
    }, 200);
  };
}
