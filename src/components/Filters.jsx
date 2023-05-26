import '../styles/filters.css'
import { useFilters, usePokemons } from '../hooks'
import { useEffect, useId, useRef } from 'react'
import { Loader } from './Loader'

export function Filters() {

  const { pokemons } = usePokemons()
  const { handleInputChange, currentFilters, getFiltersInfo, filtersInfo } = useFilters()
  let firstTime = useRef(true)


  useEffect(() => {

    //console.log(firstTime.current)

    if (!firstTime.current)
      return

    getFiltersInfo(pokemons)
    firstTime.current = pokemons.length === 0

  }, [pokemons]);

  const { types, weight } = filtersInfo


  return (
    <div className="filters-box">
      <WeightFilter min={weight.min} max={weight.max} onChange={handleInputChange} value={currentFilters.weight} />
      <TypesFilter types={types} onChange={handleInputChange} value={currentFilters.type} />
    </div>
  )
}

function TypesFilter({ types, onChange, value }) {
  const typeInputId = useId()
  const hasTypes = types.length > 0

  const getSelectOpts = () => {
    return types.map(type => (<option value={type} key={type} >{type}</option>))
  }

  return (
    hasTypes
      ? (<div className='d-block'>
        <label htmlFor={typeInputId}>Type</label>
        <select name="type" id={typeInputId} onChange={onChange} value={value}>
          {getSelectOpts()}
        </select>
      </div>)
      : <Loader size={40} />
  )
}

function WeightFilter({ min, max, onChange, value }) {
  const weightInputId = useId()
  const hasMaxValue = max !== undefined
  return (
    hasMaxValue
      ? (<div>
        <label htmlFor={weightInputId}>Weight</label>
        <div className='slider-box'>
          <input type="range"
            name='weight'
            min={min}
            max={max}
            id={weightInputId}
            onChange={onChange}
            value={value} />
          <small><strong>{value}</strong>Kg</small>
        </div>
      </div>)
      : <Loader size={40} />
  )
}