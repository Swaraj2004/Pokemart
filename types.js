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

function assignColors() {
  for (let i = 0; i < Object.keys(types).length; i++) {
    const child = document.getElementById(`type-btns`).children.item(i);
    const childclr = types[i][child.innerHTML];
    child.style.backgroundColor = childclr;
    child.style.textTransform = "capitalize";
    child.setAttribute("class", "type");
  }
}

export { types, assignColors };
