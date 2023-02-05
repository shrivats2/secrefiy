import React, { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Error from "./components/error";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import { createContext } from "react";
import About from "./components/about";

export const globalStateContext = createContext({});

const App = () => {
  const [redlink, setRedLink] = useState("");
  return (
    <div>
      <globalStateContext.Provider value={{ redlink, setRedLink }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/🔥" element={<Error />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </globalStateContext.Provider>
    </div>
  );
};

export default App;
