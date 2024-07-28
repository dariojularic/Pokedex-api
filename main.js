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

const getPokemonsByType = async (pokemonType) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
  const data = await response.json();
  console.log(data)
  return data
}

const getPokemonByName = async (pokemonName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();
  return data
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

searchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  selectedPokemon.style.visibility = "visible"
  getPokemonByName(searchInputValue.toLowerCase())
    .then(data => {
      pokemonImage.src = data.sprites.front_default;
      pokemonName.textContent = capitalizeFirstLetter(data.name);
      pokemonHeight.textContent = `${data.height} ft`;
      pokemonWeight.textContent = `${data.weight} lb`;
      pokemonType.textContent = capitalizeFirstLetter(data.types[0].type.name);
      pokemonId.textContent = data.id;
      overlay.style.visibility = "visible"
      console.log(data)
    })
    .catch()
})

pokemonTypeList.addEventListener("click", (event) => {
  getPokemonsByType(event.target.closest("li").getAttribute("data-type"))
    .then(data => {
      // console.log(data)
      // console.log(data.pokemon)
      // sta je data.pokemon, objekt ili array? kako to vidim?
      pokemonList.innerHTML = "";
      data.pokemon.forEach(pokemon => {
        const html = `<li class="pokemon-list-item">
                        <p>${capitalizeFirstLetter(pokemon.pokemon.name)}</p>
                      </li>`;
        pokemonList.insertAdjacentHTML("beforeend", html)
      })
    })
    .catch()
})

pokemonList.addEventListener("click", (event) => {
  const currentSelectedPokemon = event.target.closest("li").querySelector("p");
  getPokemonByName(lowerCaseFirstLetter(currentSelectedPokemon.textContent))
    .then(data => {
      console.log("currentdata", data)
      const image = data.sprites.front_default
      const name = data.name
      const height = data.height;
      const weight = data.weight;
      const type = data.types[0].type.name;
      const id = data.id;
      displaySelectedPokemon(image, name, height, weight, type, id)
    })
    .catch()
  displaySelectedPokemon()
})

overlay.addEventListener("click", () => {
  overlay.style.visibility = "hidden"
  selectedPokemon.style.visibility = "hidden";
})

searchInput.focus()
