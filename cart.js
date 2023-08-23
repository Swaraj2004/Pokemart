import { displayPokemons } from "./display.js";

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
      itemUpdater("add")(id, pokemon);
      billUpdater();
      itemListChecker();
      deleteItem(pokemon);
    };
    minusbtn.onclick = (e) => {
      const id = e.currentTarget.getAttribute("data-minus") - 1;
      if (pokemon[id].count > 0) {
        pokemon[id].count--;
        countdisplay.innerText = `${pokemon[id].count}`;
        itemUpdater("remove")(id, pokemon);
        billUpdater();
        itemListChecker();
        deleteItem(pokemon);
      }
    };
  }
}

function itemUpdater(operation) {
  return function (id, pokemon) {
    const name = pokemon[id].name;
    const count = pokemon[id].count;
    const price = pokemon[id].price;
    const itemList = document.getElementsByClassName("poke-item");
    switch (operation) {
      case "add":
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
        break;
      case "remove":
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
        break;
      default:
        console.log("Invalid opration!");
    }
  };
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
    document.querySelector("#search-bar input").value = "";
    itemListChecker();
    countReset(pokemon);
    displayPokemons(pokemon);
    setTimeout(function () {
      alert("Thanks for purchase! ❤️");
    }, 0);
  };
}

export { addRemove, buy };
