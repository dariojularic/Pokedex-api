import './style.css'

const pokemonList = document.querySelector(".pokemon-list");
const pokemonTypeList = document.querySelector(".pokemon-type-list");
const selectedPokemon = document.querySelector(".selected-pokemon");

const getPokemons = async () => {
  const response = await fetch(`https://img.pokemondb.net/artwork/bulbasaur.jpg`)
  console.log(response)
  const data = await response.json()
  console.log(data)
  return data
}

getPokemons()
  .then()
  .catch()
