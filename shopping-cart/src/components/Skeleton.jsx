import './Skeleton.css'

export function Skeleton ({ count }) {
  const skeletons = []
  for (let i = 0; i < count; i++) {
    skeletons.push(
      <li key={i} className='product-skeleton'>
        <div className='background-skeleton' />
        <article className='product-skeleton-content'>
          <header className='product-header-skeleton loading' />
          <section className='product-info-skeleton'>
            <div className='product-price-skeleton loading' />
            <div className='product-title-skeleton loading' />
            <footer className='product-footer-skeleton loading' />
          </section>
        </article>
      </li>
    )
  }
  return skeletons
}
