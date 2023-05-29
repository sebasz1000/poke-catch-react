import { useContext, useEffect, useRef, useCallback } from 'react'
import { FiltersContext } from '../context/FiltersContext'
import { usePokemons } from './usePokemons'

export const useFilters = () => {
  
  const { pokemons, error } = usePokemons()
  const context = useContext(FiltersContext)
  const {currentFilters, setCurrentFilters, filtersInfo, setFiltersInfo } = context
  let firstTime = useRef(true)

  
  if(!context){
    throw new Error('useFilters must be withing a Context Provider')  
  }
  
  useEffect(() => {

    if (!firstTime.current)
      return

    getFiltersInfo(pokemons)
    firstTime.current = pokemons.length === 0

  }, [pokemons]);

  
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setCurrentFilters(prevState => ({ ...prevState, [name]: value }))
  }
  
  const getFiltersInfo = useCallback((pokemons) => {
    if( error || pokemons.length === 0 )
      return 
    let types = []
    let weights = []
    pokemons.forEach( item => {
      const itemTypesNames = item.types.map( ({type}) => type.name )
      types = [...types, ...itemTypesNames]
      weights = [...weights, item.weight ]
    })
    
    const uniqueTypes =  new Set(types)
    
    setFiltersInfo({
      types: [ 'all',  ...uniqueTypes],
      weight: {
        min: Math.min(...weights),
        max: Math.max(...weights)
      }
    })
  }, [])
  
  const filterPokemons = useCallback(() => {
    return pokemons.filter( pokemon => {
      const pokemonsTypesNames = pokemon.types.map( ({type }) => type.name)
      return ( (currentFilters.type === 'all' || pokemonsTypesNames.includes(currentFilters.type))
          && (pokemon.weight >= +currentFilters.weight ))
    })
  }, [currentFilters, pokemons])
  
  
  return{
    handleInputChange,
    getFiltersInfo,
    currentFilters,
    filtersInfo,
    filteredPokemons: filterPokemons()
  }
}