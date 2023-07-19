import { useRef, useState, createContext } from 'react'

export const FiltersContext = createContext()

export function FiltersProvider ({ children }) {
  const [showFilters, setShowFilters] = useState(false)
  const firstSearchRef = useRef(false)
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 0
  })

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice && (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  const hideFilters = () => {
    setShowFilters(false)
  }

  const displayFilters = () => {
    setShowFilters(true)
  }

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        filterProducts,
        showFilters,
        hideFilters,
        displayFilters,
        firstSearchRef
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
