import { getApiUrl } from '../config'
import { Pokemon } from '../models/pokemon.model'
import { FetchError } from '../errors'

// Returns a pokemons list with a Pokemon model
export const fetchPokemons = async ({ limit = 151, offset = 0}) => {
  
  const query_params = `limit=${limit}&offset=${offset}`
  const API_URL = getApiUrl(query_params)

  try {
    const pokemonsList = await getPokemonsList(API_URL)
    const pokemonsData =  await getPokemonsData(pokemonsList)
    // * mapping and modeling data structure
    return pokemonsData.map(Pokemon)     
    return l 
  } catch (e) {
    return e
  }
}

// Gets pokemons list from API URL (no pokemons with details)
const getPokemonsList = async (url) => {
  try{
    const res = await fetch(url)

    if (!res.ok)
      throw new FetchError('Error fetching pokemons list objects')

    const data = await res.json()
    return data.results
    
  }catch(e){
    return e
  }
}

//Resolves an array of pokemons objects promises
const getPokemonsData = async (pokemonsList) => {
  try{
    const pokemonsDataPromises = pokemonsList.map(getPokemonData)
    //resolves every pokemon promise object 
    return await Promise.all(pokemonsDataPromises)
  }catch(e){
    return e
  }
}

//Gets data details for each pokemon. Returns a promise object for every pokemon
const getPokemonData = async (pokemon) => {
  try{
    const res = await fetch(pokemon.url)
    
    if(!res.ok)
      throw new FetchError('Error fetching pokemon data from url')
      
    return await res.json()
  }catch(e){
    return e
  }
}