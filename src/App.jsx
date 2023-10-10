import React, { useState } from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Intro1 from "./pages/Intro1";
import Categories from "./pages/Categories";
import Entertainment from "./components/Entertainment";
import LeaderBoard from "./components/LeaderBoard";
import Astronomy from "./components/Astronomy/Astronomy";
import LoginAd from "./AdminPanel/Login/LoginAdmin";
import Dashboard from "./AdminPanel/Dashboard/Dashboard";
import Page2 from "./AdminPanel/Dashboard/Page2";
import History from "./components/History/History";
import Literature from "./components/Literature/Literature";
import Mathematics from "./components/Mathematics/Mathematics";
import Science from "./components/Science/Science";
import Technology from "./components/Technology/Technology";
import Wildlife from "./components/Wildlife/Wildlife";
import Geography from "./components/Geography/Geography";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/loginadmin" element={<LoginAd />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/page2" element={<Page2 />} />

          <Route path="/home" element={<Home />} />
          <Route path="/intro1" element={<Intro1 />} />
          <Route path="/cat/:doctorId" element={<Categories />} />

          <Route path="/enter/:doctorId" element={<Entertainment />} />
          <Route path="/astro/:doctorId" element={<Astronomy />} />
          <Route path="/hist/:doctorId" element={<History />} />
          <Route path="/liter/:doctorId" element={<Literature />} />
          <Route path="/maths/:doctorId" element={<Mathematics />} />
          <Route path="/science/:doctorId" element={<Science />} />
          <Route path="/tech/:doctorId" element={<Technology />} />
          <Route path="/wild/:doctorId" element={<Wildlife />} />
          <Route path="/geo/:doctorId" element={<Geography />} />

          <Route path="/leaderboard/:category" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
