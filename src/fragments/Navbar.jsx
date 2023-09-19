import React from "react"
import Logo from "../assets/pics/logo.png"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light sticky-top bg-white">
            <div className="container-lg">
                <a href="./home.html" className="navbar-brand">
                    <img src={Logo} alt="logo"  id="logo" height="60" width="60" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Actual Nav links */}
                <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul className="navbar-nav fw-bold">
                        <li className="nav-item">
                            <a href="#" className="nav-link blue-text">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a href="./services.html" className="nav-link">SERVICES</a>
                        </li>
                        <li className="nav-item">
                            <a href="./about.html" className="nav-link">ABOUT US</a>
                        </li>
                        <li className="nav-item">
                            <a href="./contact.html" className="nav-link">CONTACT</a>
                        </li>
                        <li className="nav-item d-md-none">
                            <a href="#appointment" className="nav-link">APPOINTMENT</a>
                        </li>
                        <li className="nav-item d-md-none">
                            <a href="#signin" className="nav-link">SIGN IN</a>
                        </li>
                        <li className="nav-item ms-2 d-none d-md-inline px-1 rounded" id="appoint-btn">
                            <a href="#appointment" className="nav-link text-white">APPOINTMENT</a>
                        </li>
                        <li className="nav-item ms-2 d-none d-md-inline px-2 rounded" id="signin">
                            <a href="#signin" className="nav-link text-white">SIGN IN</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar