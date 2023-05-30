import { useContext } from "react";
import { CartContext } from "../context/CartContext"
export const useCart = () => {
  const context = useContext(CartContext); 
  
  const {cart, updateCart} = context
  if(!context)
    throw new Error('useCart must be withing a cart context ')
  
  const removeAllCart = () => {
    updateCart([])
  }
  
  const isOnCart = (item) => {
    const { id } = item
    return cart.some( item => item.id === id )
  }
   const removeFromCart = (item) => {
    const { id } = item
    const newCart = cart.filter( item => item.id !== id )
    updateCart(newCart)
   }
   
   const addToCart = (item) => {
    updateCart(prevState => [...prevState, { ...item, quantity: 1}])
  }
  
  const addItemQuantity = (item ) => {
    if(isOnCart(item)){
      const {id} = item
      const newCart = structuredClone(cart)
      const itemIndex = newCart.findIndex( item => item.id === id)
      newCart[itemIndex].quantity += 1
      updateCart(newCart)
    }else{
      addToCart(item)
    }
  }
  
  const getItemQuantity = (item) => {
    if(cart?.length === 0 )
      return
    const {id} = item
    const element = cart.find( item => item.id === id )
    return element.quantity
  }
  
  const removeItemQuantity = (item) => {
    const {id} = item 
    const newCart = structuredClone(cart)
    const itemIndex = newCart.findIndex( item =>  item.id === id)
    const itemQuantity = newCart[itemIndex].quantity
    if(itemQuantity > 1){
      newCart[itemIndex].quantity -= 1
      updateCart(newCart)
    }else{
      removeFromCart(item)
    }
  }
  
  
  return {
    cart,
    updateCart, 
    removeAllCart,
    isOnCart, 
    removeFromCart,
    addToCart,
    addItemQuantity,
    removeItemQuantity,
    getItemQuantity
  }
}