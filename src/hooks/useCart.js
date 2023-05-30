import { useContext } from "react";
import { CartContext } from "../context/CartContext"
export const useCart = () => {
  const context = useContext(CartContext); 
  
  const {cart, addToCart, removeFromCart, clearCart, addItemQuantity, removeItemQuantity} = context
  
  if(!context)
    throw new Error('useCart must be withing a cart context ')
  

  const isOnCart = (item) => {
    const { id } = item
    return cart.some( item => item.id === id )
  }

  
  const getItemQuantity = (item) => {
    if(cart?.length === 0 )
      return
    const {id} = item
    const element = cart.find( item => item.id === id )
    return element.quantity
  }
  
  
  return {
    cart,
    clearCart,
    isOnCart, 
    removeFromCart,
    addToCart,
    addItemQuantity,
    removeItemQuantity,
    getItemQuantity
  }
}