import { useEffect } from 'react'
import { useFilters } from '../hooks/useFilters'
import { useProducts } from '../hooks/useProducts'
import { ProductItem } from './ProductItem'

import './Products.css'
import { Skeleton } from './Skeleton'

export function Products () {
  const { filterProducts, firstSearchRef } = useFilters()
  const { products, getProducts, loading } = useProducts()
  const filteredProduct = filterProducts(products)

  const handleCount = () => {
    if (filteredProduct.length >= 12) return 12
    if (firstSearchRef.current === true) {
      return filteredProduct.length
    }
    return 12
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main className='products-main'>
      {
        products.length < 1 && firstSearchRef.current === true
          ? <p className='products-no-results'>No products were found. Try something different</p>
          : (
            <ul className='products-list'>
              {
                loading
                  ? <Skeleton count={handleCount()} />
                  : filteredProduct.slice(0, 12).map(product => {
                    return (
                      <ProductItem key={product.id} product={product} />
                    )
                  })
              }
            </ul>
            )
      }
    </main>
  )
}
