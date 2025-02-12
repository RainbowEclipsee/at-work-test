import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'
import { mainPageLogo, featured, mi_notification, photoProfile } from "../assets";

const Header = () => {
  return (
    <header className="header">
      <Link to={`/`} className="no-underline">
        <div className="header-left">
          <img src={mainPageLogo} alt="Logo" className="logo" />
          <h1>
            at-<span>work</span>
          </h1>
        </div>
      </Link>

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
