import React from 'react'
import { EntypoGauge } from 'react-entypo'
import '../css/Header.css'

const Header = () => (
  <div className="navbar navbar-inverse">
    <div className="navbar-header">
      <span className="navbar-brand">
        <EntypoGauge />
        <span className="navbar-title">Buy Vs Lease</span>
      </span>
      <span className="navbar-subtitle">
        Make the best financial decision for your car.
      </span>
    </div>
  </div>
)

export default Header
