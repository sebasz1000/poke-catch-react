import { useState } from 'react'
import { CartContext } from './CartContext'
export function CartContextProvider({ children }) {
  const [cart, updateCart] = useState([])

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  )
}