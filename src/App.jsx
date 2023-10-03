import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth } from "./firebase/config"
import { signOut } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []); 

  const logout = async () => {
    try {
      await signOut(auth)
      console.log("Signed Out ...")
    }catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`LOGOUT attempt failed. Error Code: ${errorCode} || Error Message: ${errorMessage}`);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} logout={logout} />}>
            <Route index element={<Home />} />
            <Route path="/services" element={<Services isLoggedIn={isLoggedIn} />} />
            <Route path="/about_us" element={<About isLoggedIn={isLoggedIn} />} />

            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
