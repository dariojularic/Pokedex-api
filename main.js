import './style.css'

const pokemonList = document.querySelector(".pokemon-list");
const pokemonTypeList = document.querySelector(".pokemon-type-list");
const selectedPokemon = document.querySelector(".selected-pokemon");
const searchForm = document.querySelector(".search-pokemon-form");
const searchInput = document.querySelector(".search-pokemon-input");
const pokemonImage = document.querySelector(".pokemon-image");
const pokemonName = selectedPokemon.querySelector(".pokemon-name");
const pokemonHeight = selectedPokemon.querySelector(".pokemon-height");
const pokemonWeight = selectedPokemon.querySelector(".pokemon-weight");
const pokemonType = selectedPokemon.querySelector(".pokemon-type");
const pokemonId = selectedPokemon.querySelector(".pokemon-id");

let searchInputValue = "";

searchInput.addEventListener("input", () => searchInputValue = searchInput.value)



// const pokemonImage = document.querySelector(".pokemon-image");

// search pokemon by type input or by name
//

const getPokemonsByType = async (pokemonType) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
  console.log(response)
  const data = await response.json();
  return data
}

const getPokemonsByName = async (pokemonName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  return data
}

// .then(pokemonImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png")
// getPokemons()
// .then(data => data.pokemon.forEach(pokemon => {
//   const html = `<li>
//   <p>${pokemon.pokemon.name}</p>
//   </li>`;
//   pokemonList.insertAdjacentHTML("beforeend", html)
// }))
// .catch()



searchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  getPokemonsByName(searchInputValue.toLowerCase())
    .then(data => {
      console.log(data)
      pokemonImage.src = data.sprites.front_default;
      pokemonName.textContent = data.name;
      pokemonHeight.textContent = data.height;
      pokemonWeight.textContent = data.weight;
      pokemonType.textContent = data.types[0].type.name;
      pokemonId.textContent = data.id;
    })
    .catch()
})

// id, name, height, img, weight, type
