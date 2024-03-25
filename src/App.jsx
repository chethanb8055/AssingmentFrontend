import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./component/Auth/Login";
import Sinup from "./component/Auth/Sinup";
import Home from "./component/Home/Home";
import { Toaster } from "react-hot-toast";
import { Context } from "./ContexApi/CreateApi";
import Navbar from "./component/Layout/Navbar";
import Footer from "./component/Layout/Footer";

function App() {
  const [count, setCount] = useState(0);
  const val = useContext(Context);
  console.log(val);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Sinup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
