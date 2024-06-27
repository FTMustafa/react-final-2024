import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Pages/Home";
import Signin from "./components/Login/Signin";
import Profile from "./components/Pages/Profile";
import DefaultContent from "./components/Pages/DefaultContent";
import Exams from "./components/Pages/Exams";
import Results from "./components/Pages/Results";
import QuestionPage from "./components/Pages/QuestionPage";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<DefaultContent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="exams" element={<Exams />} />
            <Route path="results" element={<Results />} />
          </Route>
          <Route path="question-page" element={<QuestionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
