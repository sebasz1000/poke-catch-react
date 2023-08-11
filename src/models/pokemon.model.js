export function Pokemon({ id, name, weight, types, sprites}){
 
  return {
    id, 
    name,
    weight,
    types: types.map( ({type}) => type.name ), 
    image: sprites.other.home.front_default
  }
}