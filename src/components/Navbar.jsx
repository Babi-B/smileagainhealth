import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import ContactIcons from "./ContactIcons";
import FormModal from "./FormModal";
import Logo from "../assets/pics/logo.png"

function Navbar(props) {
  
  
  return (
    <>
      <ContactIcons />
      <Header />
      <nav className="navbar navbar-expand-md navbar-light sticky-top bg-white">
        <div className="container-lg">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="logo" id="logo" height="60" width="60" />
          </Link>
          <button
            className="navbar-toggler"
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
            className="collapse navbar-collapse justify-content-end align-center"
            id="main-nav"
          >
            <ul className="navbar-nav fw-bold">
              <li className="nav-item">
                <Link to="/" className="nav-link navbar-link">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link navbar-link">
                  SERVICES
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about_us" className="nav-link navbar-link">
                  ABOUT US
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link navbar-link">
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
                    aria-expanded="false">
                  DASHBOARD
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* <Link className="dropdown-item" to="/dashboard/managers">All Managers</Link> */}
                  <Link className="dropdown-item" to="/dashboard/staff">All Staff</Link>
                  <Link className="dropdown-item" to="/dashboard/services">All Services</Link>
                  <Link className="dropdown-item" to="/dashboard/events">All Events</Link>
                </div>
              </li>
              }
              <li className="nav-item d-md-none">
                <Link to="/appointment" className="nav-link navbar-link">
                  APPOINTMENT
                </Link>
              </li>
              <li className="nav-item d-md-none">
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
              <li className="nav-item ms-2 d-none d-md-inline px-1 rounded" id="appoint-btn">
                <Link to="/appointment" className="nav-link text-white">
                  APPOINTMENT
                </Link>
              </li>
              <li className="nav-item ms-2 d-none d-md-inline px-2 rounded" id="signin">
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
          </div>
        </div>
      </nav>
      <Outlet />
      <FormModal taskID={1}/>
    </>
  );
}

export default Navbar;