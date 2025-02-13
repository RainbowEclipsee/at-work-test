import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'
import { featured, mi_notification, photoProfile, logo } from "../../assets";

const Header = () => {
  return (
    <header className="header">
      
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo"/>
        </div>

      <div className="header-right">
        <Link>
          <img src={featured} alt="Profile" className="profile-featured" />
        </Link>
        <Link>
          <img
            src={mi_notification}
            alt="Profile"
            className="profile-notify"
          />
        </Link>
        <Link>
          <img
            src={photoProfile}
            alt="Profile"
            className="profile-avatar"
          />
        </Link>
        <span className="username">Ivan1234</span>
      </div>
    </header>
  )
}

export default Header
