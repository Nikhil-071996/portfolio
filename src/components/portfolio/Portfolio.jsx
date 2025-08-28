import React from 'react'
import './portfolio.css'
import PortfolioCards from './PortfolioCards'

function Portfolio() {
    
  return (
    <section className='portfolio-section'>
        <h2>My <span style={{opacity: 0}}>Portfolio</span></h2>


        <PortfolioCards />
    </section>
  )
}

export default Portfolio