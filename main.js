import './style.css'

const pokemonList = document.querySelector(".pokemon-list");
const pokemonTypeList = document.querySelector(".pokemon-type-list");
const selectedPokemon = document.querySelector(".selected-pokemon");
const searchForm = document.querySelector(".search-pokemon-form");
const searchInput = document.querySelector(".search-pokemon-input");
let searchInputValue = "";

searchInput.addEventListener("input", () => searchInputValue = searchInput.value)



// const pokemonImage = document.querySelector(".pokemon-image");

// search pokemon by type input or by name
//

const getPokemonsByType = async (pokemonType) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
  const data = await response.json();
  return data
}

const getPokemonsByName = async (pokemonName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  return data
}

// .then(pokemonImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png")
getPokemons()
.then(data => data.pokemon.forEach(pokemon => {
  const html = `<li>
  <p>${pokemon.pokemon.name}</p>
  </li>`;
  pokemonList.insertAdjacentHTML("beforeend", html)
}))
.catch()



searchForm.addEventListener("submit", () => {
  getPokemonsByName(searchInputValue.toLowerCase())
    .then()
    .catch()
})
