import { useId } from "react";
import { CartIcon } from "./Icons";
import { useCart } from "../hooks";
import '../styles/cart.css'
export function Cart() {
  const cartBtnId = useId()
  const { cart, clearCart } = useCart()
  return (
    <>
      <label htmlFor={cartBtnId} className="cart-btn">
        <CartIcon />
      </label>
      <input type="checkbox" id={cartBtnId} hidden />
      <aside className="cart">
        <ul>
          {
            cart.map(item => <CartItem key={item.id} item={item} />)
          }
        </ul>
        <button className="removeAllBtn" onClick={clearCart}>Free all pokemons!</button>
      </aside>
    </>
  )
}

function CartItem({ item }) {
  const { name, weight, sprites, quantity } = item
  const { addItemQuantity, removeItemQuantity } = useCart()

  return (
    <li>
      <img src={sprites.other.home.front_default} alt={name} />
      <header>
        <h3 className="m-0">{name}</h3>
        <small>({weight}kg)</small>
      </header>
      <div className="quantity-btns">
        <button onClick={() => removeItemQuantity(item)} >
          {quantity === 1 ? <small>Let free</small> : '-'}
        </button>
        {quantity}
        <button onClick={() => addItemQuantity(item)}>+</button>
      </div>
    </li>
  )
}