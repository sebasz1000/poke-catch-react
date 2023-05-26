import { useState, useEffect } from 'react'
import { fetchPokemons } from '../services/fetch-pokemons'
import { useFilters } from './useFilters'

export const usePokemons = () => {
  const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {currentFilters} = useFilters()

  
  const getPokemons = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const pokes = await fetchPokemons(API_URL)
      setPokemons(pokes)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPokemons()
  }, [])
  
  const filterPokemons = () => {
    
    const filteredPokemons = pokemons.filter( pokemon => {
      const pokemonsTypesNames = pokemon.types.map( ({type }) => type.name)
      return ( (currentFilters.type === 'all' || pokemonsTypesNames.includes(currentFilters.type))
          && (pokemon.weight >= +currentFilters.weight ))
    })
    
    return filteredPokemons
  }
  
  return {
    pokemons: filterPokemons(), 
    isLoading, 
    error
  }

}