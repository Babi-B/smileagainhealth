import React from "react";


function Header() {
    return (
        <header id="header">
            <div className="contacts container-lg d-flex flex-wrap py-1">
                <span className="mx-2"><i className="fas fa-phone me-1"></i>+237 620 777 290</span>
                <span className="mx-2"><a href="https://wa.me/+237671752479" className="me-4 text-reset" target="_blank"><i className="fab fa-whatsapp me-1"></i>+237 671 752 479</a></span>
                <span className="mx-2"><i className="fas fa-map-marker-alt me-1"></i>Limbe, Cameroon</span>
                <span className="mx-2"><a href="#"><i className="fas fa-envelope me-1"></i>smileagainhealth@gmail.com</a></span>
            </div>
        </header>
        );
}

export default Header