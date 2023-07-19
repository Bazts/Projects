import { useRef, useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon, StarIcon } from './Icons'

export function ProductItem ({ product }) {
  const { addToCart, setShowCart, removeFromCart, hasCartAppeared, checkProductInCart } = useCart()

  const isProductInCart = checkProductInCart(product)

  const handleClick = (product) => {
    if (isProductInCart) {
      return removeFromCart(product)
    }
    if (hasCartAppeared.current === false) {
      setShowCart(true)
    }
    addToCart(product)
  }

  const buttonRef = useRef()

  useEffect(() => {
    const button = buttonRef.current
    if (button) {
      const handleTouchStart = () => {
        button.classList.add('hover')
      }
      const handleTouchEnd = () => {
        button.classList.remove('hover')
      }

      button.addEventListener('touchstart', handleTouchStart)
      button.addEventListener('touchend', handleTouchEnd)
      button.addEventListener('mouseenter', handleTouchStart)
      button.addEventListener('mouseleave', handleTouchEnd)
      return () => {
        button.removeEventListener('touchstart', handleTouchStart)
        button.removeEventListener('touchend', handleTouchEnd)
        button.removeEventListener('mouseenter', handleTouchStart)
        button.removeEventListener('mouseleave', handleTouchEnd)
      }
    }
  }, [])

  return (
    <li
      key={product.id}
      className='product-item'
    >
      <div className='product-background' />
      <article className='product-content'>
        <header className='product-img-cont'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='product-img'
          />
        </header>
        <div className='product-info'>
          <span className='product-price'>${product.price}</span>
          <p className='product-name'>{product.title}</p>
          <footer className='product-footer'>
            <div className='product-stars'>
              <StarIcon />
              <span className='product-rating'>{product.rating}</span>
            </div>
            <p className='product-stock'>Stock: {product.stock}</p>
            <button
              ref={buttonRef}
              className={`product-btn ${isProductInCart ? 'remove' : 'add'}`}
              onClick={() => handleClick(product)}
            >
              {
                isProductInCart
                  ? <RemoveFromCartIcon />
                  : <AddToCartIcon />
              }
            </button>
          </footer>
        </div>
      </article>
    </li>
  )
}
