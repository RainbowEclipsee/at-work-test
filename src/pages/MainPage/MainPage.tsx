import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  archiveUser,
  unarchiveUser,
  hideUser,
  fetchUsers,
} from '../../redux/usersSlice'
import Card from '../../components/Card/Card'
import './MainPage.css'

const MainPage = () => {
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.users)

  // Должны хранить ID карточки, у которой открыто меню (cвязано с компонентом Card)
  const [openDropdownId, setOpenDropdownId] = useState(null)

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

  return (
    <div className="container">
      <h2 className="section-title">Активные</h2>
      <div className="divider"></div>

      <div className="cards">
        {users
          .filter((user) => !user.archived)
          .map((user) => (
            <Card
              key={user.id}
              user={user}
              onArchive={(id) => dispatch(archiveUser(id))}
              onUnarchive={(id) => dispatch(unarchiveUser(id))}
              onHide={(id) => dispatch(hideUser(id))}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
            />
          ))}
      </div>

      <h2 className="section-title">Архив</h2>
      <div className="divider"></div>

      <div className="cards">
        {users
          .filter((user) => user.archived)
          .map((user) => (
            <Card
              key={user.id}
              user={user}
              onArchive={(id) => dispatch(archiveUser(id))}
              onUnarchive={(id) => dispatch(unarchiveUser(id))}
              onHide={(id) => dispatch(hideUser(id))}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
            />
          ))}
      </div>
    </div>
  )
}

export default MainPage
