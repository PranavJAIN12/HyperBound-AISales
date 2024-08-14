import React from 'react'
import '../App.css'
export default function Navbar() {
  return (
    <div className='navbar'>
      <p style={{fontSize:'1.6rem', fontWeight: 'bold'}}>Hyperbound</p>
      <button className='btn'>Create New</button>
      <ul className="navbar-items" style={{listStyleType: 'none'}}>
        <li>LeaderBoard</li>
        <li>Buyer Bots</li>
        <li>Call History</li>
        <li>Training Plans</li>
        <li>Analytics</li>
        <li>Coaching</li>
      </ul>
    </div>
  )
}
