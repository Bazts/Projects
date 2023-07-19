const PRODUCTS_ENDPOINT = 'https://dummyjson.com/products'

export const productsFetch = async (search) => {
  try {
    const res = await fetch(`${PRODUCTS_ENDPOINT}/search?q=${search}`)
    const json = await res.json()
    const { products } = json
    return products
  } catch (error) {
    console.log('No products were found.')
  }
}

export const initialProducts = async () => {
  try {
    const res = await fetch(PRODUCTS_ENDPOINT)
    const json = await res.json()
    const { products } = json
    return products
  } catch (error) {
    console.log('No products were found.')
  }
}

export const getProductsCategories = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products/categories')
    const json = await res.json()
    return json
  } catch (error) {
    console.log('No categories were found.')
  }
}
