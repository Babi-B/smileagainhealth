import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import Staff from "./pages/Staff"
import Events from "./pages/Events"
import NotFound from "./pages/NotFound"
import Messages from "./pages/Messages"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth } from "./firebase/config"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "./firebase/config";
import { getDocs, collection } from "firebase/firestore";

import AllServices from "./pages/AllServices";
import Managers from "./pages/Managers";

function App() {

  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [managers, setManagers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const staffCollectionRef = collection(db, 'staff');
  const serviceCollectionRef = collection(db, "services");
  const eventCollectionRef = collection(db, "events");
  const managerCollectionRef = collection(db, "managers");
  const messageCollectionRef = collection(db, "messages");


  const refreshApp = () => {
    setRefresh((prevRef) => !prevRef);
    window.location.reload();
  };

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
        console.error(`COULD NOT FETCH STAFF DATA. Error Message: ${error}`);
      }
    };

    getStaffList();
    window.scrollTo(0, 0);
  }, []);

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
        console.error(`COULD NOT FETCH SERVICES DATA. Error Message: ${error}`);
      }
    };

    getServiceList();
    window.scrollTo(0, 0);
  }, [refresh]);

  // FETCH ALL EVENTS
  useEffect(() => {
    const getEventList = async () => {
      try {
        const data = await getDocs(eventCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(filteredData);
      } catch (error) {
        console.error(`COULD NOT FETCH EVENTS DATA. Error Message: ${error}`);
      }
    };

  getEventList();
  window.scrollTo(0, 0);
  }, [refresh]);

  // FETCH ALL MANAGERS
  useEffect(() => {
    const getManagerList = async () => {
      try {
        const data = await getDocs(managerCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setManagers(filteredData);
      } catch (error) {
        console.error(`COULD NOT FETCH MANAGERS DATA. Error Message: ${error}`);
      }
    };

  getManagerList();
  window.scrollTo(0, 0);
  }, [refresh]);


   // FETCH ALL MESSAGES
   useEffect(() => {
    const getMessageList = async () => {
      try {
        const data = await getDocs(messageCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log(filteredData);
        setMessages(filteredData);
      } catch (error) {
        console.error(`COULD NOT FETCH MESSAGES DATA. Error Message: ${error}`);
      }
    };

    getMessageList();
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      alert('Signed Out...');
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
            <Route index element={<Home services={services} events={events}/>} />
            <Route path="/services" element={<Services isLoggedIn={isLoggedIn} services={services}  />} />
            <Route path="/services/:servicePointer" element={<Services isLoggedIn={isLoggedIn} services={services}  />} />
            <Route path="/about_us" element={<About staff={staff}  />} />
            <Route path="/contact" element={<Contact messages={messages} refreshApp={refreshApp}  />} />

            { isLoggedIn ?
              <>
                <Route path="/dashboard/staff" element={<Staff staff={staff} refremessages={messages} refreshApp={refreshApp} />} /> 
                <Route path="/dashboard/services" element={<AllServices services={services} refreshApp={refreshApp}  />} /> 
                <Route path="/dashboard/events" element={<Events events={events} refreshApp={refreshApp} />} /> 
                <Route path="/dashboard/managers" element={<Managers managers={managers} refreshApp={refreshApp} />} /> 
                <Route path="/dashboard/messages" element={<Messages messages={messages}  refreshApp={refreshApp} />} /> 
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
