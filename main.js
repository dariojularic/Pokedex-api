import './style.css'

const pokemonList = document.querySelector(".pokemon-list");
const pokemonTypeList = document.querySelector(".pokemon-type-list");
const selectedPokemon = document.querySelector(".selected-pokemon");
// const pokemonImage = document.querySelector(".pokemon-image");

const getPokemons = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/1/`)
  console.log(response)
  const data = await response.json()
  console.log(data)
  return data
}

// .then(pokemonImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png")
getPokemons()
  .then()
  .catch()
