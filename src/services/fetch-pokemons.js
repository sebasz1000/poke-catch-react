export const fetchPokemons = async (url) => {
  try {
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Error fetching pokemons list objects')

    const data = await res.json()
    const pokemonsPromise = data.results.map(item => {
      return fetch(item.url)
        .then(res => {
          if (!res.ok)
            throw new Error('Error fetching pokemon data')
          return res.json()
        })
        .then(pokemon => pokemon)
    })

    //todo Pormise.allSettled() !!
    const pokemons = await Promise.all(pokemonsPromise)
    return pokemons
  } catch (e) {
    return e
  }
}