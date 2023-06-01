import { useCart, useFilters, usePokemons } from '../hooks'
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
  const { isOnCart, removeFromCart, addToCart, getItemQuantity } = useCart()


  const getBtns = (item) => {
    return isOnCart(item)
      ? <button className='btn-free' onClick={() => removeFromCart(item)} >Let free!</button>
      : <button className='btn-catch' onClick={() => addToCart(item)}>Catch!</button>
  }

  const getQuantityBadge = (item) => {
    return isOnCart(item)
      ? <span className='quantity-badge'>{getItemQuantity(item)}</span>
      : null
  }
  return (
    <ul className='pokemon-list'>
      {
        items.map(item => {
          const { name, id, weight, image } = item
          return (
            <li key={id}>
              {getQuantityBadge(item)}
              <img src={image} alt={`${name} image thumbnail`} />
              <header>
                <h3>{name}</h3>
                <small>({weight}kg)</small>
              </header>
              {getBtns(item)}
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