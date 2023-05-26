import '../styles/list.css'
export function Pokemons({ pokemons }) {
  const hasPokemons = pokemons.length > 0
  return (
    hasPokemons
      ? <List items={pokemons} />
      : <NoResults />
  )
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