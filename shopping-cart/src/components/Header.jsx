import { useFilters } from '../hooks/useFilters'
import { CartButtonH } from './Cart'
import './Header.css'
import { HamburgerMenu } from './Icons'

export function Header () {
  const { displayFilters } = useFilters()

  return (
    <>
      <header className='main-header-wrapper'>
        <h1 className='main-header-sm-screen'>React Shopping Cart ⚛️🛒</h1>
        <section className='main-header'>
          <div className='main-header-hamburger-menu'>
            <button onClick={() => displayFilters()} className='hamburger-manu-container'>
              <HamburgerMenu />
            </button>
          </div>
          <div className='main-header-title'>
            <h1>React Shopping Cart ⚛️🛒</h1>
          </div>
          <div className='main-header-btn-cart'>
            <CartButtonH className='in-header' />
          </div>
        </section>
      </header>
    </>
  )
}
