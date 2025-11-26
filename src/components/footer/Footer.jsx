import React from 'react'
import './footer.css'

function Footer() {

    const year = new Date().getFullYear()

  return (
    <footer>
        <p>© {year} • Crafted with passion by Nikhil Kachi</p>
    </footer>
  )
}

export default Footer