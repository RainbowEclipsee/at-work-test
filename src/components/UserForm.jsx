import React, { useState } from "react";
import "./UserForm.css";

const UserForm = ({ initialUser, onSave }) => {
  const [formData, setFormData] = useState(initialUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>Имя</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Никнейм</label>
      <input type="text" name="username" value={formData.username} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Город</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} required />

      <label>Телефон</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

      <label>Название компании</label>
      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

      <button type="submit">Сохранить</button>
    </form>
  );
};

export default UserForm;
