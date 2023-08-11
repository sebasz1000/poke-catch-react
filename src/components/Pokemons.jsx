import '../styles/list.css'
import { useState } from 'react'
import { useCart, useFilters, usePokemons } from '../hooks'
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
    console.error(error instanceof Error)
    return <ErrorMessage error={error} />
  }

  if (hasPokemons) {
    return <List items={filteredPokemons} />
  } else {
    return < NoResults />
  }
}

function List({ items }) {
  return (
    <ul className='pokemon-list'>
      {
        items.map(item => <ListItem item={item} key={item.id} />)
      }
    </ul>
  )
}

function ListItem({ item }) {

  const { isOnCart, removeFromCart, addToCart, getItemQuantity } = useCart()
  const [imageIsLoading, setImageIsLoading] = useState(true)
  const { name, weight, image } = item

  const getQuantityBadge = (item) => {
    return isOnCart(item)
      ? <span className='quantity-badge'>{getItemQuantity(item)}</span>
      : null
  }

  const getBtns = (item) => {
    return isOnCart(item)
      ? <button className='btn-free mx-auto d-block' onClick={() => removeFromCart(item)} >Let free!</button>
      : <button className='btn-catch mx-auto d-block' onClick={() => addToCart(item)}>Catch!</button>
  }

  return (
    (<li className={`list-item ${imageIsLoading ? 'skeleton' : ''}`} >
      {getQuantityBadge(item)}

      <img src={image}
        className='fadeIn'
        alt={`${name} image thumbnail`}
        loading="lazy"
        onLoad={() => setImageIsLoading(false)} />
      {imageIsLoading ? (<div className='skeleton-image' ></div>) : null}
      {
        imageIsLoading
          ? (<header className="skeleton-header"> </header>)
          : (<header className='fadeIn'>
            <h3>{name}</h3>
            <small>({weight}kg)</small>
          </header>)
      }
      {
        imageIsLoading
          ? (<div className="skeleton-button"></div>)
          : (<div className='fadeIn'>{getBtns(item)}</div>)
      }
    </li >)
  )
}

function NoResults() {
  return (<h4 className='text-center'>There are not pokemons to list with these filters</h4>)
}