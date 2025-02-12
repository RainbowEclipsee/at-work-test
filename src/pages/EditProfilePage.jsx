import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchUserById, updateUser } from '../redux/usersSlice'

import { profileEditPage, Icon, arrowLeft } from '../assets'
import './EditProfilePage.css'

const EditProfilePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.users)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
    company: '',
  })

  const [isModalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchUserById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser?.name,
        username: currentUser?.username,
        email: currentUser?.email,
        city: currentUser?.address.city,
        phone: currentUser?.phone,
        company: currentUser?.company.name,
      })
    }
  }, [currentUser])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ id, ...formData }))

    setModalVisible(true)

    setTimeout(() => {
      setModalVisible(false)
      navigate('/')
    }, 4000)
  }

  return (
    <div>

      <div className="edit-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={arrowLeft} alt="Назад" className="back-icon" />
          Назад
        </button>
      </div>

      <div className="edit-container">
        <div className="card-left">
          <img src={profileEditPage} alt="Avatar" className="editAvatar" />
          <h2>Данные профиля</h2>
          <ul className="profile-options">
            <li>Рабочее пространство</li>
            <li>Приватность</li>
            <li>Безопасность</li>
          </ul>
        </div>

        <div className="card-right">
          <h2>Данные профиля</h2>
          <form onSubmit={handleSubmit}>
            <label>Имя</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Имя пользователя</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Почта</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Город</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <label>Телефон</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label>Название компании</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
            <button type="submit" className="editButton">
              Сохранить
            </button>
          </form>
        </div>

        {isModalVisible && (
          <div className="modal">
            <img src={Icon} alt="Success" className="modalImage" />
            <p>Изменения сохранены!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditProfilePage
