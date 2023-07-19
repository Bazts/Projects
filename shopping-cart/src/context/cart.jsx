import { useRef, useState, createContext } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const hasCartAppeared = useRef(showCart)

  const addToCart = (product, updateQuantity) => {
    const productIndexInCart = cart.findIndex(item => item.id === product.id)
    const quantity = parseInt(updateQuantity)

    if (productIndexInCart >= 0) {
      const newCart = [...cart]
      newCart[productIndexInCart].quantity = quantity
      setCart(newCart)
      const newTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)
      setTotalPrice(newTotalPrice)
    } else {
      setTotalPrice(prevState => prevState + product.price * product.quantity)
      setCart(prevState => ([
        ...prevState,
        {
          ...product,
          quantity: 1
        }
      ]))
    }

    hasCartAppeared.current = true
  }

  const removeFromCart = (product) => {
    const productIndexInCart = cart.findIndex(item => item.id === product.id)
    const newCart = cart.filter(item => item.id !== product.id)

    if (productIndexInCart >= 0) {
      const newTotalPrice = totalPrice - cart[productIndexInCart].price * cart[productIndexInCart].quantity
      setTotalPrice(newTotalPrice)
    }
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
    setTotalPrice(0)
  }

  const hideCart = () => {
    setShowCart(false)
  }

  const displayCart = () => {
    setShowCart(true)
  }

  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        showCart,
        setShowCart,
        removeFromCart,
        clearCart,
        checkProductInCart,
        setCart,
        hasCartAppeared,
        totalPrice,
        hideCart,
        displayCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
