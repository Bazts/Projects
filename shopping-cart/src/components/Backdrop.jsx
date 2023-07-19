import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './Backdrop.css'
import { useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { useFilters } from '../hooks/useFilters'

export const Backdrop = ({ show }) => {
  const { hideCart } = useCart()
  const { hideFilters } = useFilters()
  const nodeRef = useRef(null)

  const handleClick = () => {
    hideCart()
    hideFilters()
  }

  return createPortal(
    <CSSTransition nodeRef={nodeRef} in={show} classNames='backdrop-in' timeout={500} mountOnEnter unmountOnExit>
      <div
        ref={nodeRef}
        className='backdrop'
        onClick={() => handleClick()}
      />
    </CSSTransition>, document.getElementById('backdrop-hook')
  )
}
