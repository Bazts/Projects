import { useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { CSSTransition } from 'react-transition-group'
import { CartIcon, ClearCartIcon, XMark } from './Icons'
import { createPortal } from 'react-dom'
import './Cart.css'
import { Unboxing } from './Illustrations'
import { Backdrop } from './Backdrop'

export function CartItem ({ title, thumbnail, price, item }) {
  const { removeFromCart, addToCart } = useCart()

  const handleQtyChange = (event) => {
    const inputValue = event.target.value
    addToCart(item, inputValue)
  }

  return (
    <>
      <div className='cart-background' />
      <article className='cart-product'>
        <header className='cart-product-img-container'>
          <button
            onClick={() => removeFromCart(item)}
            className='cart-item-remove'
          >
            <XMark />
          </button>
          <img className='cart-product-img' src={thumbnail} alt={title} />
        </header>
        <div className='cart-product-info'>
          <span className='cart-product-price'>${price}</span>
          <p className='cart-product-name'>{title}</p>
          <footer className='cart-product-footer'>
            <p className='cart-product-qty'>Qty:</p>
            <select name='' id='' className='cart-product-select' onChange={handleQtyChange}>
              {[...Array(item.stock).keys()].map(num => (
                <option
                  key={num}
                  value={num + 1}
                  className='cart-product-option'
                >
                  {num + 1}
                </option>
              ))}
            </select>

          </footer>
        </div>
      </article>
    </>
  )
}

export function CloseButton ({ show, className, onClick }) {
  const nodeRef = useRef(null)

  return (
    <CSSTransition nodeRef={nodeRef} in={show} classNames={`${className}-transition`} timeout={500} mountOnEnter unmountOnExit>
      <button onClick={() => onClick()} className={`${className} hide`} ref={nodeRef}>
        <XMark />
      </button>
    </CSSTransition>
  )
}

export const CartButtonH = ({ inHeader, className }) => {
  const { displayCart, totalPrice } = useCart()
  const nodeRef = useRef(null)

  return (
    <button
      ref={nodeRef}
      className={`cart-btn ${className}`}
      onClick={() => displayCart()}
    >
      <CartIcon />
      <span className='cart-btn-total'>${totalPrice}</span>
    </button>
  )
}

export function CartButton ({ inHeader }) {
  const { displayCart, showCart, totalPrice } = useCart()
  const nodeRef = useRef(null)

  const className = `cart-btn ${
    showCart && !inHeader
      ? 'hide'
      : 'show'
  }`

  return (
    <CSSTransition nodeRef={nodeRef} in={showCart} classNames='cart-btn-transition' timeout={500}>
      <button
        ref={nodeRef}
        className={`${className} ${inHeader ? 'in-header' : ''}`}
        onClick={() => displayCart()}
      >
        {
          showCart && !inHeader
            ? <XMark />
            : <CartIcon />
        }
        <span className='cart-btn-total'>${totalPrice}</span>
      </button>
    </CSSTransition>
  )
}

export function CartContent ({ children }) {
  const nodeRef = useRef(null)
  const { showCart, cart } = useCart()

  return (
    <CSSTransition nodeRef={nodeRef} in={showCart} classNames='cart-transition' timeout={500} mountOnEnter>
      <aside ref={nodeRef} className='cart-sidedrawer'>
        <section className={`cart-sidedrawer-content ${cart.length > 0 ? 'with' : 'without'}`}>
          {children}
        </section>
      </aside>
    </CSSTransition>
  )
}

export function Cart () {
  const { cart, clearCart, totalPrice, showCart, hideCart } = useCart()

  const withContent = (
    <>
      <p className='cart-total-price'>Cart Total: <span className='total'>${totalPrice}</span></p>
      <ul className='cart-list'>
        {
          cart.map(item => {
            return (
              <li key={item.id} className='cart-item'>
                <CartItem {...item} item={item} />
              </li>
            )
          })
        }
      </ul>
      <button
        className='cart-clear-btn'
        onClick={() => clearCart()}
      >
        <ClearCartIcon />
      </button>
    </>
  )

  const withoutContent = (
    <>
      <p className='cart-empty-cart'>Nothing here. Add something.</p>
      <Unboxing />
    </>
  )

  return (
    <>
      <Backdrop show={showCart} />
      {
        createPortal(
          <>
            <CloseButton className='cart-btn' show={showCart} onClick={hideCart} />
            <CartContent>
              {
                cart.length > 0
                  ? withContent
                  : withoutContent
              }
            </CartContent>
          </>, document.getElementById('side-cart')
        )
      }
    </>
  )
}
