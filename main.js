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
const overlay = document.querySelector(".overlay");

let searchInputValue = "";

searchInput.addEventListener("input", () => searchInputValue = searchInput.value)
const baseUrl = "https://pokeapi.co/api/v2/"

// base url
const getPokemonsByType = async (pokemonType) => {
  try {
    const response = await fetch(baseUrl + `type/${pokemonType}`);
    // if (response.status !== 200) throw new Error("cannot fetch data")
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}

const getPokemonByName = async (pokemonName) => {
  try {
    const response = await fetch(baseUrl + `pokemon/${pokemonName}`);
    // if (response.status !== 200) throw new Error("cannot fetch data")
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

function displaySelectedPokemon(image, name, height, weight, type, id) {
  pokemonImage.src = image;
  pokemonName.textContent = name;
  pokemonHeight.textContent = `${height} ft`;
  pokemonWeight.textContent = `${weight} lb`;
  pokemonType.textContent = type;
  pokemonId.textContent = id;
  overlay.style.visibility = "visible"
  selectedPokemon.style.visibility = "visible"
}

function displayPokemonsList(data) {
  pokemonList.innerHTML = "";
  data.forEach(pokemon => {
    const html = `<li class="pokemon-list-item">
                    <p>${capitalizeFirstLetter(pokemon.pokemon.name)}</p>
                  </li>`;
    pokemonList.insertAdjacentHTML("beforeend", html)
  })
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  getPokemonByName(searchInputValue.toLowerCase())
    .then(data => {
      const { sprites: {front_default: image }, name: pokemonName, height, weight, types: [{type: {name: type}}], id} = data
      displaySelectedPokemon(image, capitalizeFirstLetter(pokemonName), height, weight, capitalizeFirstLetter(type), id);
    })
    .catch(err => console.log(err.message))
})

pokemonTypeList.addEventListener("click", (event) => {
  getPokemonsByType(event.target.closest("li").getAttribute("data-type"))
    .then(data => {
      displayPokemonsList(data.pokemon)
    })
    .catch(err => console.log(err.message))
})

pokemonList.addEventListener("click", (event) => {
  const currentSelectedPokemon = event.target.closest("li").querySelector("p");
  getPokemonByName(lowerCaseFirstLetter(currentSelectedPokemon.textContent))
    .then(data => {
      const { sprites: {front_default: image }, name: pokemonName, height, weight, types: [{type: {name: type}}], id} = data
      displaySelectedPokemon(image, capitalizeFirstLetter(pokemonName), height, weight, capitalizeFirstLetter(type), id)
    })
    .catch(err => console.log(err.message))
  displaySelectedPokemon()
})

overlay.addEventListener("click", () => {
  overlay.style.visibility = "hidden"
  selectedPokemon.style.visibility = "hidden";
  searchInput.focus()
})
