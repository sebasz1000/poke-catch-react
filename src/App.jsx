import { Pokemons, Loader, ErrorMessage, Filters } from './components'
import { usePokemons } from './hooks'

export function App() {

  const { pokemons, isLoading, error } = usePokemons()

  return (
    <div className="page">
      <header>
        <h1 className='text-center'>Poke catch'em all!!</h1>
        <Filters />
      </header>
      <main>
        {
          error
            ? <ErrorMessage error={error} />
            : null
        }
        {
          !isLoading
            ? <Pokemons pokemons={pokemons} />
            : <Loader size={80} />
        }
      </main>
    </div>
  )
}
