// src/components/Card/Card.tsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { photoProfile, btn } from '../../assets'
import './Card.css'

import type { User } from '../../types/user'

interface CardProprs {
  user: User
  onArchive: (id: number) => void
  onUnarchive: (id: number) => void
  onHide: (id: number) => void
  openDropdownId: number | null
  setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>
}

const Card: React.FC<CardProprs> = ({ user, onArchive, onUnarchive, onHide, openDropdownId, setOpenDropdownId }) => {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setOpenDropdownId(openDropdownId === user.id ? null : user.id)
  }

  const handleArchive = (id: number) => {
    onArchive(id)
    setOpenDropdownId(null)
  }

  const handleUnarchive = (id: number) => {
    onUnarchive(id)
    setOpenDropdownId(null)
  }

  const handleHide = (id: number) => {
    onHide(id)
    setOpenDropdownId(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setOpenDropdownId])

  return (
    <div className="card" ref={cardRef}>
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
        <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
          <img src={btn} alt="btn" className="btn" />
        </button>

        {openDropdownId === user.id && (
          <div className="dropdown-menu">
            {user.archived ? (
              <button type="button" onClick={() => handleUnarchive(user.id)}>Активировать</button>
            ) : (
              <>
                <button>
                  <Link to={`/edit/${user.id}`} className="dropdown-link">Редактировать</Link>
                </button>
                <button type="button" onClick={() => handleArchive(user.id)}>Архивировать</button>
                <button type="button" onClick={() => handleHide(user.id)}>Скрыть</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
