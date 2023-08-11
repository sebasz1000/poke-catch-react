import { useContext, useEffect, useCallback } from 'react'
import { ContextError } from '../errors'
import { FiltersContext } from '../context/FiltersContext'
import { usePokemons } from './usePokemons'

export const useFilters = () => {
  
  const { pokemons } = usePokemons()
  const context = useContext(FiltersContext)
  
  if(!context){
    throw new ContextError('useFilters must be withing a Context Provider')  
  }
  
  const {currentFilters, setCurrentFilters, filtersInfo, setFiltersInfo, error } = context
  
  useEffect(() => {
    getFiltersInfo(pokemons)
  }, [pokemons]);

  
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setCurrentFilters(prevState => ({ ...prevState, [name]: value }))
  }
  
  //Gets Pokemons types and weights to set up filters values dynamically
  const getFiltersInfo = useCallback((pokemons = []) => {
    if( error || pokemons.length === 0 )
      return 
    let types = []
    let weights = []
    pokemons.forEach( pokemon => {
      //const itemTypesNames = item.types.map( ({type}) => type.name )
      types = [...types, ...pokemon.types]
      weights = [...weights, pokemon.weight ]
    })
    
    const uniqueTypes =  new Set(types)
    
    setFiltersInfo( prevState => ({
      ...prevState,
      types: [ 'all',  ...uniqueTypes],
      weight: {
        min: Math.min(...weights),
        max: Math.max(...weights)
      }
    })
    )
  }, [pokemons])
  
  
  const filterPokemons = useCallback(( pokemons = []) => {
    
    if(pokemons.length === 0)
      return []

    const filteredPokemons = pokemons.filter( pokemon => {
      //const pokemonsTypesNames = pokemon.types.map( ({type}) => type.name)
      return ( (currentFilters.type === 'all' 
               || pokemon.types.includes(currentFilters.type))
               && (pokemon.weight >= +currentFilters.weight ))
    })
    
    return filteredPokemons
    
  }, [currentFilters, pokemons])
  
  
  return{
    handleInputChange,
    currentFilters,
    filtersInfo,
    filteredPokemons: error ? [] : filterPokemons(pokemons)
  }
}