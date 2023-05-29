import { useFilters, usePokemons } from '../hooks'
import '../styles/list.css'
import { ErrorMessage } from './ErrorMessage'
import { Loader } from './Loader'
export function Pokemons() {
  const { error, isLoading } = usePokemons()
  const { filteredPokemons } = useFilters()
  const hasPokemons = filteredPokemons.length > 0

  if (isLoading) {
    return <Loader size={80} />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (hasPokemons) {
    return <List items={filteredPokemons} />
  } else {
    <NoResults />
  }
}

function List({ items }) {
  return (
    <ul className='pokemon-list'>
      {
        items.map(item => {
          const { name, id, weight, sprites } = item
          return (
            <li key={id}>
              <img src={sprites.other.home.front_default} alt={`${name} image thumbnail`} />
              <header>
                <h3>{name}</h3>
                <small>({weight}kg)</small>
              </header>
              <button className='btn-catch'>Catch!</button>
            </li>
          )
        })
      }
    </ul>
  )
}

function NoResults() {
  return <h4>There are not pokemons to list</h4>
}