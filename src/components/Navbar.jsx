import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import ContactIcons from "./ContactIcons";
import FormModal from "./FormModal";
import SearchBar from "./SearchBar";
import Logo from "../assets/pics/logo.png"

function Navbar(props) {
  const [searchResults, setSearchResults] = useState([])
  const components = [
    {
      title: 'Home',
      path: '/',
      description: 'Welcome to the home page. Our events, timetable, available time, working hours',
      content: 'This is the main content of the home page',
    },
    {
      title: 'Services',
      path: '/services',
      description: 'Explore our services. Different sicknesses, diseases, homecare treatments',
      content: 'Here are the services we offer',
    },
    {
      title: 'About Us',
      path: '/about_us',
      description: 'Learn about our company, our staff and administration, timetable, available time, working hours, location, place, social links, located',
      content: 'Find out more about our mission and values',
    },
    {
      title: 'Contact',
      path: '/contact',
      description: 'Learn about our company. Reach us on Whatsapp. volunteer. leave a message. write to us.',
      content: 'Make an appointment. We also offer free consultations.',
    },
  ];

  const handleSearch = (query) => {
    const filteredResults = components.filter(component =>
      component.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  
  return (
    <>
      <ContactIcons />
      <Header />
      <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-white">
        <div className="container-lg">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="logo" id="logo" height="60" width="60" />
          </Link>
          <button
            className="navbar-toggler"
            id="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Actual Nav links */}
          <div
            className="collapse navbar-collapse row g-4 justify-content-end align-center"
            id="main-nav"
          >
            <ul className="navbar-nav fw-bold col-sm-12 col-md-10 px-2">
              <li className="nav-item">
                <Link to="/" className="nav-link navbar-link">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link navbar-link" onClick={props.handleAutoCloseComponentClick}>
                  SERVICES
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about_us" className="nav-link navbar-link text-lg-center" onClick={props.handleAutoCloseComponentClick}>
                  ABOUT US
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link navbar-link" onClick={props.handleAutoCloseComponentClick}>
                  CONTACT
                </Link>
              </li>
              { props.isLoggedIn && 
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    >
                  DASHBOARD
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* <Link className="dropdown-item" to="/dashboard/managers">All Managers</Link> */}
                  <Link className="dropdown-item" to="/dashboard/staff" onClick={props.handleAutoCloseComponentClick}>All Staff</Link>
                  <Link className="dropdown-item" to="/dashboard/services" onClick={props.handleAutoCloseComponentClick}>All Services</Link>
                  <Link className="dropdown-item" to="/dashboard/events" onClick={props.handleAutoCloseComponentClick}>All Events</Link>
                  <Link className="dropdown-item" to="/dashboard/managers" onClick={props.handleAutoCloseComponentClick}>All Managers</Link>
                  <Link className="dropdown-item" to="/dashboard/messages" onClick={props.handleAutoCloseComponentClick}>All Messages</Link>
                  <Link className="dropdown-item" to="/dashboard/testimonials" onClick={props.handleAutoCloseComponentClick}>All Testimonials</Link>
                </div>
              </li>
              }
              <li className="nav-item d-lg-none" onClick={props.handleAutoCloseComponentClick}>
                <a href="https://wa.me/+237671752479" target="_blank" className="nav-link navbar-link">
                  APPOINTMENT
                </a>
              </li>
              <li className="nav-item d-lg-none" onClick={props.handleAutoCloseComponentClick} >
              { props.isLoggedIn ? 
                <Link
                  className="nav-link navbar-link"
                  onClick={props.logout}
                >
                  SIGN OUT
                </Link>
                  :
                <Link
                  className="nav-link navbar-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  SIGN IN
                </Link>
                }
              </li>
              <li className="nav-item ms-2 d-none d-lg-inline px-1 rounded text-lg-center" id="appoint-btn">
                <a href="https://wa.me/+237671752479" target="_blank" className="nav-link text-white">
                  APPOINTMENT
                </a>
              </li>
              <li className="nav-item ms-2 d-none d-lg-inline px-1 rounded text-lg-center" id="signin">
              { props.isLoggedIn ? 
                <Link
                  className="nav-link text-white"
                  onClick={props.logout}
                >
                  SIGN OUT
                </Link>
                :
                <Link
                  className="nav-link text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  SIGN IN
                </Link>
              }

              </li>
            </ul>
            <div className="col-md-8 col-lg-4">
              <SearchBar 
                onSearch={handleSearch}
                components={components}
                />
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <FormModal taskID={1} refreshApp={props.refreshApp} handleAutoCloseComponentClick={props.handleAutoCloseComponentClick} />
    </>
  );
}

export default Navbar;