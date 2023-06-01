const API_KEY = "https://pokeapi.co/api/v2/pokemon"

export function getApiUrl(query_params){
  
  if(!query_params)
    return API_KEY
  
  return `${API_KEY}?${query_params}`
    
  
}