export function Pokemon({ id, name, weight, types, sprites}){
 
  return {
    id, 
    name,
    weight,
    types, 
    image: sprites.other.home.front_default
  }
}