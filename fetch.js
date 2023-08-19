export default async function () {
  let pokeObj = {};
  const urls = [];
  let pokeFetch = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
  const data = await pokeFetch.json();
  const resArr = data.pokemon_entries;
  // console.log(resArr);
  for (let i in resArr) {
    let pokeOrder = resArr[i].entry_number,
      pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokeOrder}/`;
    urls[i] = pokeUrl;
  }
  // console.log(urls);
  const promises = urls.map((url) =>
    fetch(url)
      .then((res) => res.json())
      .then((newdata) => {
        let id = newdata.id,
          name = newdata.name,
          price = newdata.base_experience,
          count = 0,
          type1 = newdata.types[0].type.name,
          type2 = newdata.types[1]?.type.name,
          img = newdata.sprites.other["official-artwork"].front_default;

        pokeObj[id - 1] = { id, name, price, count, type1, type2, img };
      })
      .catch((e) => {
        console.log(e);
      })
  );
  await Promise.all(promises);
  return pokeObj;
}
