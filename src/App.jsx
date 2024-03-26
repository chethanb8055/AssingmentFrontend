import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./component/Auth/Login";
import Sinup from "./component/Auth/Sinup";
import Home from "./component/Home/Home";
import { Toaster } from "react-hot-toast";
import { Context } from "./ContexApi/CreateApi";
import Navbar from "./component/Layout/Navbar";
import Footer from "./component/Layout/Footer";
import axios from "axios";
import Jobs from "./component/Jobs/Jobs";
import JobDetail from "./component/Jobs/JobDetail";
import PostJob from "./component/Jobs/PostJob";
import Application from "./component/Application/Application";
import MyApplications from "./component/Application/MyApplication";

function App() {
  const [count, setCount] = useState(0);
  const { user, setIsAuthorized, isAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://assingmentbackend.onrender.com/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Sinup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
      </Routes>
      <Toaster />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
