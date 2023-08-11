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
      <aside className='cart' >
        <ul>
          {
            cart.map(item => <CartItem key={item.id} item={item} />)
          }
        </ul>
        <button className="removeAllBtn d-block mx-auto"
          onClick={clearCart}>
          Free all pokemons!
        </button>
      </aside>
    </>
  )
}

function CartItem({ item }) {
  const { name, weight, image, quantity } = item
  const { addItemQuantity, removeItemQuantity } = useCart()

  return (
    <li>
      <img src={image} alt={name} />
      <header>
        <h3 className="m-0">{name}</h3>
        <small>({weight}kg)</small>
      </header>
      <div className="quantity-btns">
        <button onClick={() => removeItemQuantity(item)} >
          {quantity === 1 ? <small>Let free</small> : '-'}
        </button>
        {quantity}
        <button onClick={() => addItemQuantity(item)}>
          +
        </button>
      </div>
    </li>
  )
}