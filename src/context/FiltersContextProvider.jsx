import { useState } from 'react'
import { FiltersContext } from "./FiltersContext"
import { POKEMON_GENERATIONS } from '../types/pokemon-generations.types'

export function FiltersContextProvider({ children }) {

  const [currentFilters, setCurrentFilters] = useState({
    weight: 0,
    type: 'all',
    generation: POKEMON_GENERATIONS[0].name
  })

  const [filtersInfo, setFiltersInfo] = useState({
    weight: {
      min: 0,
      max: undefined
    },
    types: [],
    generations: POKEMON_GENERATIONS
  })

  return (
    <FiltersContext.Provider value={{
      currentFilters,
      setCurrentFilters,
      filtersInfo,
      setFiltersInfo
    }}>
      {children}
    </FiltersContext.Provider>
  )
}