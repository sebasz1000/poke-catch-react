import { useState, useEffect, useCallback } from 'react'
import { fetchPokemons } from '../services/fetch-pokemons'

export const usePokemons = () => {
  const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

    
  const getPokemons = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const pokes = await fetchPokemons(API_URL)
      setPokemons(pokes)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  },[])

  useEffect(() => {
    getPokemons()
  }, [])
  
  
  return {
    pokemons, 
    isLoading, 
    error
  }

}