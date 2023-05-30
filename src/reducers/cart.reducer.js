import { CART_TYPES } from "../types/cart.types"

export const cartReducer = (state = [], action) => {
  const { type, payload } = action
  const { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, ADD_ITEM_QUANTITY, REMOVE_ITEM_QUANTITY } = CART_TYPES

  switch (type) {
    case ADD_TO_CART:
      return [...state, { ...payload, quantity: 1 }]
      break
    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== payload.id)
      break
    case CLEAR_CART:
      return []
      break
    case ADD_ITEM_QUANTITY: {
      const { id } = payload
      if (state.some(item => item.id === id)) { //isOnCart?
        const newCart = structuredClone(state)
        const itemIndex = newCart.findIndex(item => item.id === id)
        newCart[itemIndex].quantity += 1
        return newCart
      } else {
        return [...state, { ...payload, quantity: 1 }]
      }
      break
    }
    case REMOVE_ITEM_QUANTITY: {
      const { id } = payload
      const newCart = structuredClone(state)
      const itemIndex = newCart.findIndex(item => item.id === id)
      const itemQuantity = newCart[itemIndex].quantity
      if (itemQuantity > 1) {
        newCart[itemIndex].quantity -= 1
        return newCart
      } else {
        return newCart.filter(item => item.id !== id)
      }
      break
    }
    default:
      return state
      break
  }
}

