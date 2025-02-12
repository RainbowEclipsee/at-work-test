import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ user, onArchive, onUnarchive, onHide }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className="card">
      <img
        src="/photoProfile.png"
        alt="Avatar"
        className={`avatar ${user.archived? 'archived' : ''}`}
      />
      <div className="desc">
        <h3 className="user">{user.username}</h3>
        <p className="userAddress">{user.address.city}</p>
        <p className="userCompany">{user.company.name}</p>
      </div>

      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <img src="/doth.svg" alt="doth" className="doth" />
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button>
              <Link to={`/edit/${user.id}`}>Редактировать</Link>
            </button>
            {user.archived ? (
              <button onClick={() => onUnarchive(user.id)}>Активировать</button>
            ) : (
              <button onClick={() => onArchive(user.id)}>Архивировать</button>
            )}
            <button onClick={() => onHide(user.id)}>Скрыть</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
