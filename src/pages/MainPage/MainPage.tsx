import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { archiveUser, unarchiveUser, hideUser, fetchUsers } from '../../redux/usersSlice'
import type { User } from '../../types/user'
import Card from '../../components/Card/Card'

import './MainPage.css'


const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { users, loading } = useAppSelector((state) => state.users)

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    )
  }

  const handleArchive = (id: number) => dispatch(archiveUser(id))
  const handleunUarchive = (id: number) => dispatch(unarchiveUser(id))
  const handleHide = (id: number) => dispatch(hideUser(id))

  return (
    <div className="container">
      <h2 className="section-title">Активные</h2>
      <div className="divider"></div>

      <div className="cards">
        {users
          .filter((user: User) => !user.archived)
          .map((user: User) => (
            <Card
              key={user.id}
              user={user}
              onArchive={handleArchive}
              onUnarchive={handleunUarchive}
              onHide={handleHide}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
            />
          ))}
      </div>

      <h2 className="section-title">Архив</h2>
      <div className="divider"></div>

      <div className="cards">
        {users
          .filter((user: User) => user.archived)
          .map((user: User) => (
            <Card
              key={user.id}
              user={user}
              onArchive={handleArchive}
              onUnarchive={handleunUarchive}
              onHide={handleHide}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
            />
          ))}
      </div>
    </div>
  )
}

export default MainPage
