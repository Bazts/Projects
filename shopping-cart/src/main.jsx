import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductsProvider } from './context/products.jsx'
import { FiltersProvider } from './context/filters.jsx'
import { CartProvider } from './context/cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <FiltersProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </FiltersProvider>
  </CartProvider>
)
