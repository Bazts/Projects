import { Products } from './components/Products'
import { Header } from './components/Header'
import { FiltersPage } from './components/Filters'
import { Cart } from './components/Cart'

import './App.css'

function App () {
  return (
    <>
      <Header />
      <Cart />
      <div className='mid-cont'>
        <FiltersPage />
        <Products />
      </div>
    </>
  )
}

export default App
