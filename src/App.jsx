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
import Testimonials from "./pages/Testimonials";


function App() {

  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [managers, setManagers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [timer, setTimer] = useState(null);

  const staffCollectionRef = collection(db, 'staff');
  const serviceCollectionRef = collection(db, "services");
  const eventCollectionRef = collection(db, "events");
  const managerCollectionRef = collection(db, "managers");
  const messageCollectionRef = collection(db, "messages");
  const testimonialCollectionRef = collection(db, "testimonials");


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
        setStaff(filteredData);
      } catch (error) {
        alert(`COULD NOT FETCH STAFF DATA. Error Message: ${error}`);
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
        alert(`COULD NOT FETCH SERVICES DATA. Error Message: ${error}`);
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
        alert(`COULD NOT FETCH EVENTS DATA. Error Message: ${error}`);
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
        alert(`COULD NOT FETCH MANAGERS DATA. Error Message: ${error}`);
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
        setMessages(filteredData);
      } catch (error) {
        alert(`COULD NOT FETCH MESSAGES DATA. Error Message: ${error}`);
      }
    };

    getMessageList();
    window.scrollTo(0, 0);
  }, []);

  // FETCH ALL TESTIMONIALS
  useEffect(() => {
    const getTestimonialList = async () => {
      try {
        const data = await getDocs(testimonialCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTestimonials(filteredData);
      } catch (error) {
        alert(`COULD NOT FETCH TESTIMONY DATA. Error Message: ${error}`);
      }
    };

    getTestimonialList();
    window.scrollTo(0, 0);
  }, [refresh]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      alert('SIGN OUT SUCCESSFUL');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(
        `LOGOUT attempt failed. Error Code: ${errorCode} || Error Message: ${errorMessage}`
      );
    }
  };

  // Sign out after 1 day of inactivity
  useEffect(() => {
    const userActivityTimeout = 24 * 60 * 60 * 1000; // 1 day in milliseconds

    // Function to sign out the user
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        // Perform any additional actions after sign-out
      } catch (error) {
        // Handle sign-out error
      }
    };

    // Function to reset the timer
    const resetTimer = () => {
      clearTimeout(timer);
      setTimer(setTimeout(handleSignOut, userActivityTimeout));
    };

    // Start tracking user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Set up the Firebase auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, reset the timer
        resetTimer();
      } else {
        // User is signed out, clear the timer
        clearTimeout(timer);
      }
    });

    // Clean up the event listeners and Firebase listener
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      unsubscribe();
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} logout={logout} refreshApp={refreshApp} />}>
            <Route index element={<Home services={services} events={events}/>} />
            <Route path="/services" element={<Services isLoggedIn={isLoggedIn} services={services}  />} />
            <Route path="/services/:servicePointer" element={<Services isLoggedIn={isLoggedIn} services={services}  />} />
            <Route path="/about_us" element={<About staff={staff} testimonials={testimonials}  />} />
            <Route path="/contact" element={<Contact messages={messages} refreshApp={refreshApp}  />} />

            { isLoggedIn ?
              <>
                <Route path="/dashboard/staff" element={<Staff staff={staff} refremessages={messages} refreshApp={refreshApp} />} /> 
                <Route path="/dashboard/services" element={<AllServices services={services} refreshApp={refreshApp}  />} /> 
                <Route path="/dashboard/events" element={<Events events={events} refreshApp={refreshApp} />} /> 
                <Route path="/dashboard/managers" element={<Managers managers={managers} refreshApp={refreshApp} />} /> 
                <Route path="/dashboard/messages" element={<Messages messages={messages}  refreshApp={refreshApp} />} /> 
                <Route path="/dashboard/testimonials" element={<Testimonials testimonials={testimonials}  refreshApp={refreshApp} />} /> 
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
