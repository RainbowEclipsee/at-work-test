import React from 'react'
import { Link } from 'react-router-dom'
import { photoProfile, btn } from '../../assets'
import './Card.css'

const Card = ({ user, onArchive, onUnarchive, onHide, openDropdownId, setOpenDropdownId }) => {
  
  const toggleDropdown = () => {
    setOpenDropdownId(openDropdownId === user.id ? null : user.id);
  };

  const handleArchive = (id) => {
    onArchive(id);          // Перемещаем в архив
    setOpenDropdownId(null); // Закрываем меню
  };

  const handleUnarchive = (id) => {
    onUnarchive(id);        // Активируем карточку
    setOpenDropdownId(null); // Закрываем меню
  };

  return (
    <div className="card">
      <img
        src={photoProfile}
        alt="Avatar"
        className={`avatar ${user.archived ? 'archived' : ''}`}
      />
      <div className="desc">
        <h3 className="user">{user?.username || "Имя не указано"}</h3>
        <p className="userAddress">{user.address?.city || "Город не указан"}</p>
        <p className="userCompany">{user.company?.name || "Компания не указана"}</p>
      </div>

      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <img src={btn} alt="btn" className="btn" />
        </button>

        {openDropdownId === user.id && (
          <div className="dropdown-menu">
            {user.archived ? (
              // Если пользователь в архиве, показываем только "Активировать"
              <button onClick={() => handleUnarchive(user.id)}>Активировать</button>
            ) : (
              // Если пользователь !в архиве, показываем все кнопки
              <>
                <button>
                  <Link to={`/edit/${user.id}`}>Редактировать</Link>
                </button>
                <button onClick={() => handleArchive(user.id)}>Архивировать</button>
                <button onClick={() => onHide(user.id)}>Скрыть</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card




