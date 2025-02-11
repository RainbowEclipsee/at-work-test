import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPage = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    [...state.users.users, ...state.users.archived].find((u) => u.id === Number(id))
  );

  if (!user) return <p>Пользователь не найден</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Никнейм: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Город: {user.address.city}</p>
      <p>Телефон: {user.phone}</p>
      <p>Компания: {user.company.name}</p>
    </div>
  );
};

export default UserPage;
