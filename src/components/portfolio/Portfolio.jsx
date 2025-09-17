import React from 'react'
import './portfolio.css'
import PortfolioCards from './PortfolioCards'

function Portfolio({textEndRef}) {
    
  return (
    <section className='portfolio-section'>
        <h2>My <span style={{opacity: 0}} ref={textEndRef}>Portfolio</span></h2>


        <PortfolioCards />
    </section>
  )
}

export default Portfolio