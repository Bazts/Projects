import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export function useFilters () {
  const context = useContext(FiltersContext)

  return context
}
