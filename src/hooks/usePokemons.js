import { useState, useEffect } from 'react'
import { fetchPokemons } from '../services/fetch-pokemons'


export const usePokemons = () => {
 
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // const getPokemons = useCallback(async () => {
  //   try {
  //     setIsLoading(true)
  //     setError(null)
  //     const pokes = await fetchPokemons()
  //     setPokemons(pokes)
  //   } catch (e) {
  //     setError(e)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // },[])

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetchPokemons({ limit: 151, offset: 0 })
      .then( setPokemons )
      .catch( (e) => setError(e) )
      .finally(() => setIsLoading(false) )

  }, [])
  
  
  return {
    pokemons, 
    isLoading, 
    error
  }
 
}