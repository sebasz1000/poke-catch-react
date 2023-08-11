import { useState, useEffect, useContext } from 'react'
import { fetchPokemons } from '../services/fetch-pokemons'
import { POKEMON_GENERATIONS } from '../types/pokemon-generations.types'
import { FiltersContext } from '../context/FiltersContext'
import { ContextError } from '../errors'


export const usePokemons = () => {
 
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(FiltersContext)
  
  if(!context)
    throw new ContextError('usePokemon should be within a context Provider')
    
  const { currentFilters, setError, error } = context
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    const generation_type = POKEMON_GENERATIONS.find( type => type.name.toLocaleLowerCase() === currentFilters.generation.toLocaleLowerCase() )
    
    const params = {
      limit: generation_type.limit,
      offset: generation_type.offset  
    }
    
    fetchPokemons(params)
      .then( setPokemons )
      .catch( (e) => setError(e) )
      .finally(() => setIsLoading(false) )
  }, [currentFilters.generation])
  
  //todo: vaalidate if FetchError to retry fetch connection with setTimeout
  // https://www.youtube.com/watch?v=OhE-mEt37iA  MIDU ERRORS
  return {
    pokemons, 
    isLoading, 
    error
  }
 
}