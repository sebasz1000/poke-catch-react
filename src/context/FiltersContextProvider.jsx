import { useState } from 'react'
import { FiltersContext } from "./FiltersContext"

export function FiltersContextProvider({ children }) {

  const [currentFilters, setCurrentFilters] = useState({
    weight: 0,
    type: 'all'
  })
  const [filtersInfo, setFiltersInfo] = useState({
    weight: {
      min: 0,
      max: undefined
    },
    types: []
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