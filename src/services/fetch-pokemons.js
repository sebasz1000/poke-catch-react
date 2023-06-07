import { getApiUrl } from '../config'
import { Pokemon } from '../models/pokemon.model'

export const fetchPokemons = async ({ limit = 151, offset = 0}) => {
  
  const query_params = `limit=${limit}&offset=${offset}`
  const API_URL = getApiUrl(query_params)

  try {
    const res = await fetch(API_URL)

    if (!res.ok)
      throw new Error('Error fetching pokemons list objects')

    const data = await res.json()
    const pokemonsPromises = data.results.map(item => {
      return fetch(item.url)
        .then(res => {
          if (!res.ok)
            throw new Error('Error fetching pokemon data')
          return res.json()
        })
        .then(pokemon => pokemon)
    })

    //todo Pormise.allSettled() !!
    const pokemons = await Promise.all(pokemonsPromises)
    //Disable comment below to check api available properties
    //console.log(pokemons) 

    return pokemons.map(Pokemon)
        
  } catch (e) {
    return e
  }
}