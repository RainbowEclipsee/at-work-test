import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) =>
        setUser({
          name: data.name,
          username: data.username,
          email: data.email,
          city: data.address.city,
          phone: data.phone,
          companyName: data.company.name,
        })
      );
  }, [userId]);

  const handleSave = (updatedUser) => {
    console.log("Сохраненные данные:", updatedUser);
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="edit-profile">
      <h1>Редактирование профиля</h1>
      <UserForm initialUser={user} onSave={handleSave} />
    </div>
  );
};

export default EditProfilePage;
