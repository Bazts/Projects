import { useContext } from 'react'
import { ProductsContext } from '../context/products'

export function useProducts () {
  const context = useContext(ProductsContext)
  return context
}
