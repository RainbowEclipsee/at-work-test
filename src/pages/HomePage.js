import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const HomePage = () => {
  const { users, archived, status } = useSelector((state) => state.users);

  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed") return <p>Ошибка загрузки</p>;

  return (
    <div>
      <h2>Активные</h2>
      <div className="cards-grid">
        {users.map((user) => (
          <Link key={user.id} to={`/user/${user.id}`}>
            <Card name={user.username} location={user.address.city} />
          </Link>
        ))}
      </div>

      <h2>Архив</h2>
      <div className="cards-grid">
        {archived.map((user) => (
          <Card key={user.id} name={user.username} location={user.address.city} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
