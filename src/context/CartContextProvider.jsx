import { useReducer } from 'react'
import { CartContext } from './CartContext'
import { CART_TYPES } from '../types/cart.types'
import { cartReducer } from '../reducers/cart.reducer'

const initState = []

export function CartContextProvider({ children }) {

  const [state, dispatch] = useReducer(cartReducer, initState)

  const { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, ADD_ITEM_QUANTITY, REMOVE_ITEM_QUANTITY } = CART_TYPES

  const addToCart = (item) => {
    dispatch({
      type: ADD_TO_CART,
      payload: item
    })
  }

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item
    })
  }

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART
    })
  }

  const addItemQuantity = (item) => {
    dispatch({
      type: ADD_ITEM_QUANTITY,
      payload: item
    })
  }

  const removeItemQuantity = (item) => {
    dispatch({
      type: REMOVE_ITEM_QUANTITY,
      payload: item
    })
  }

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart,
      addItemQuantity,
      removeItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}