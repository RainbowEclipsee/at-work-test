import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditProfilePage from "./pages/EditProfilePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/edit/:userId" element={<EditProfilePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
