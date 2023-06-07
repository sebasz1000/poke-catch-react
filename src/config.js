const API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon"

export function getApiUrl(query_params){
  
  if(!query_params)
    return API_ENDPOINT
  
  return `${API_ENDPOINT}?${query_params}`
    
  
}