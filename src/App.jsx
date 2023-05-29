import { Pokemons, Filters } from './components'

export function App() {
  return (
    <div className="page">
      <header>
        <h1 className='text-center'>Poke catch'em all!!</h1>
        <Filters />
      </header>
      <main>
        <Pokemons />
      </main>
    </div>
  )
}
