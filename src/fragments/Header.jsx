import React from "react";


function Header() {
    return (
        <header id="header">
            <div className="contacts container-lg d-flex flex-wrap">
                <span className="mx-2"><i className="fas fa-phone me-1"></i>+237-612-345-678</span>
                <span className="mx-2 my-1"><a href="#"><i className="fab fa-whatsapp me-1"></i>+237612345678</a></span>
                <span className="mx-2 my-1"><i className="fas fa-map-marker-alt me-1"></i>Buea, Cameroon</span>
                <span className="mx-2 my-1"><a href="#"><i className="fas fa-envelope me-1"></i>smileagainhealth@gmail.com</a></span>
            </div>
        </header>
        );
}

export default Header