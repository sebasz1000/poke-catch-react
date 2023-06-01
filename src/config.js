const API_KEY = "https://pokeapi.co/api/v2/pokemon"

export function getApiUrl( ){
  
  if(!arguments)
    return API_KEY
  
  const argsArray = [...arguments]
  const query_params =  argsArray.join('&')
  
  return `${API_KEY}?${query_params}`
    
  
}