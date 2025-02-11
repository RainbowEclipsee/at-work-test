import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/usersSlice";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=6")
      .then(res => res.json())
      .then(data => dispatch(setUsers(data)));
  }, [dispatch]);

  return (
    <div className="main-page">
      <h1>Активные</h1>
      <div className="cards-container">
        {users.map(user => (
          <Link to={`/edit/${user.id}`} key={user.id}>
            <Card name={user.username} location={user.address.city} image="https://via.placeholder.com/150" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
