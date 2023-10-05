import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import Staff from "./pages/Staff"
import Events from "./pages/Events"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth } from "./firebase/config"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "./firebase/config";
import { getDocs, collection } from "firebase/firestore";

import AllServices from "./pages/AllServices";

function App() {

  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const staffCollectionRef = collection(db, 'staff');
  const serviceCollectionRef = collection(db, "services");


  // FETCH ALL STAFF
  useEffect(() => {
    const getStaffList = async () => {
      try {
        const data = await getDocs(staffCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log(filteredData);
        setStaff(filteredData);
      } catch (error) {
        console.error(`COULD NOT FETCH DATA. Error Message: ${error}`);
      }
    };

    getStaffList();
    window.scrollTo(0, 0);
  }, [refresh]);

  // FETCH ALL SERVICES
  useEffect(() => {
    const getServiceList = async () => {
      try {
        const data = await getDocs(serviceCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setServices(filteredData);
      } catch (error) {
        console.error(`COULD NOT FETCH DATA. Error Message: ${error}`);
      }
    };

  getServiceList();
  window.scrollTo(0, 0);
}, [refresh]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [refresh]);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('Signed Out...');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(
        `LOGOUT attempt failed. Error Code: ${errorCode} || Error Message: ${errorMessage}`
      );
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} logout={logout} />}>
            <Route index element={<Home />} />
            <Route path="/services" element={<Services isLoggedIn={isLoggedIn} refresh={refresh} setRefresh={setRefresh} />} />
            <Route path="/about_us" element={<About staff={staff} refresh={refresh} setRefresh={setRefresh} />} />
            <Route path="/contact" element={<Contact />} />

            { isLoggedIn ?
              <>
                <Route path="/dashboard/staff" element={<Staff staff={staff} refresh={refresh} setRefresh={setRefresh}/>} /> 
                <Route path="/dashboard/services" element={<AllServices services={services} refresh={refresh} setRefresh={setRefresh} />} /> 
                <Route path="/dashboard/events" element={<Events staff={staff} refresh={refresh} setRefresh={setRefresh}/>} /> 
              </>
                :
              <Route path="*" element={<NotFound />} />
              }

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
