import { useContext } from 'react'
import { FiltersContext } from '../context/FiltersContext'

export const useFilters = () => {
  
  const context = useContext(FiltersContext)
  const {currentFilters, setCurrentFilters, filtersInfo, setFiltersInfo} = context
  
  if(!context){
    throw new Error('useFilters must be withing a Context Provider')  
  }
  
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setCurrentFilters(prevState => ({ ...prevState, [name]: value }))
  }
  
  const getFiltersInfo = (items) => {
    if(items.length === 0 )
      return 
    let types = []
    let weights = []
    items.forEach( item => {
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
  }
  
  return{
    handleInputChange,
    getFiltersInfo,
    currentFilters,
    filtersInfo
  }
}