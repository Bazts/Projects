import { useId, useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import { useFilters } from '../hooks/useFilters'
import { useProducts } from '../hooks/useProducts'
import debounce from 'just-debounce-it'
import './Filters.css'
import { CSSTransition } from 'react-transition-group'
import { createPortal } from 'react-dom'
import { Backdrop } from './Backdrop'
import { CloseButton } from './Cart'

export const Filters = forwardRef(({ props }, ref) => {
  const searchProductsId = useId()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const [searchInput, setSearchInput] = useState('')

  const { filters, setFilters, firstSearchRef } = useFilters()
  const [xAxis, setXAxis] = useState(0)
  const { getProducts, productsCategories, getAllProductsCategories } = useProducts()

  useEffect(() => {
    getAllProductsCategories()
  }, [])

  const categorySet = [...new Set(productsCategories.current)]

  const searchDebounce = useCallback(
    debounce(search => {
      getProducts(search)
    }, 350)
    , [getProducts]
  )

  const handlePriceChange = (event) => {
    const inputValue = event.target.value
    const { max, clientWidth } = event.target

    setFilters((prevState) => ({
      ...prevState,
      minPrice: inputValue
    }))
    setXAxis((inputValue / max) * clientWidth)
  }

  const handleCategoryChange = (event) => {
    const inputValue = event.target.value
    setFilters((prevState) => ({
      ...prevState,
      category: inputValue
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getProducts(searchInput)
  }

  const handleChange = (event) => {
    const inputValue = event.target.value
    if (inputValue === ' ') return
    setSearchInput(inputValue)
    searchDebounce(inputValue)
    firstSearchRef.current = true
  }

  return (
    <aside ref={ref} className='products-filters-aside'>
      <section className='products-filters'>
        <div className='products-filters-background-wrapper'>
          <div className='products-filters-background' />
        </div>
        <form action='#' onSubmit={handleSubmit}>
          <section className='products-filters-item search'>
            <label htmlFor={searchProductsId}>Search Products</label>
            <input onChange={handleChange} value={searchInput} className='product-input-search' type='text' name='' id={searchProductsId} autoComplete='off' />
            <button className='products-btn-search' type='submit'>Search</button>
          </section>
          <section className='products-filters-item'>
            <label htmlFor={minPriceFilterId}>Min Order</label>
            <div className='product-range-group'>
              <input
                onChange={handlePriceChange}
                value={filters.minPrice}
                min={0}
                max={1000}
                className='product-input-range'
                type='range'
                name=''
                id={minPriceFilterId}
              />
              <div
                style={{
                  left: `${xAxis}px`
                }}
                className='product-price-tooltip'
              >
                {filters.minPrice}
              </div>
            </div>
            <p className='product-price-rate'>
              <span>0</span> <span>1000</span>
            </p>
          </section>
          <section className='products-filters-category'>
            <label htmlFor={categoryFilterId}>Category</label>
            <select
              onChange={handleCategoryChange}
              className='products-category'
              name=''
              id={categoryFilterId}
            >
              <option value='all'>All</option>
              {categorySet.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                )
              })}
            </select>
          </section>
        </form>
      </section>
    </aside>
  )
})

export function SideDrawerFilters ({ show }) {
  const nodeRef = useRef(null)

  return (
    <CSSTransition nodeRef={nodeRef} in={show} classNames='filters-in' timeout={500} mountOnEnter>
      <Filters ref={nodeRef} />
    </CSSTransition>
  )
}

export function FiltersPage () {
  const { showFilters, hideFilters } = useFilters()
  return (
    <>
      <Filters />
      <Backdrop show={showFilters} />
      {
        createPortal(
          <>
            <SideDrawerFilters show={showFilters} />
            <CloseButton className='filters-btn' show={showFilters} onClick={hideFilters} />
          </>, document.getElementById('side-filters')
        )
      }
    </>
  )
}
