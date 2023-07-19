import { createContext, useState, useRef } from 'react'
import { getProductsCategories, initialProducts, productsFetch } from '../services/products'

export const ProductsContext = createContext()

export function ProductsProvider ({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const productsCategories = useRef([])

  const getProducts = async (search) => {
    try {
      setLoading(true)
      if (!search) {
        const fetchProducts = await initialProducts()
        const newSearch = fetchProducts.map(product => {
          return {
            ...product,
            quantity: 1
          }
        })
        return setProducts(newSearch)
      }
      const fetchProducts = await productsFetch(search)
      const newSearch = fetchProducts.map(product => ({ ...product, quantity: 1 }))
      setProducts(newSearch)
    } catch (error) {
      console.log('Fetching products error', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }

  const getAllProductsCategories = async () => {
    const categoryResults = await getProductsCategories()
    productsCategories.current = categoryResults
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts,
        productsCategories,
        loading,
        getAllProductsCategories
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
