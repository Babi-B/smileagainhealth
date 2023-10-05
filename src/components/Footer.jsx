import React from "react";

function Footer() {
    return (
       <>
        <footer className="text-center text-lg-start text-white pt-5">
            {/* Section: Social media */}
            <section className="py-4 border-bottom">
                {/* Left */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className=" col-sm-6 col-lg-3 mb-3">
                            <span>Get connected with us on social networks:</span>
                        </div>
                        {/* Left */}
                    
                        {/* Right (the icons) */}
                        <div className="col-sm-6 col-lg-3">
                            <a href="" className="me-4 text-reset">
                                <i className="fab fa-facebook fs-1"></i>
                            </a>
                            <a href="https://www.instagram.com/smileagain_homehealthcare?r=nametag" target="_blank" className="me-4 text-reset">
                                <i className="fab fa-instagram fs-1"></i>
                            </a>
                            <a href="https://wa.me/+237671752479" className="me-4 text-reset" target="_blank">
                                <i className="fab fa-whatsapp fs-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Right */}
            </section>
            {/* XX-- Section: Social media --XX */}
    
            {/* Section: Links  */}
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    {/* Grid row */}
                    <div className="row mt-3">
                    {/* Grid column */}
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4"><img src="logo.png" height="30" alt="logo" className="me-2" />SACFU</h6>
                        <p>Some description</p>
                    </div>
                    {/* Grid column */}
            
                    {/* Grid column */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">
                        {/* Services */}
                        </h6>
                        <p><a href="#logo" className="text-reset">24/7 home care</a></p>
                        {/* <p><a href="#services" className="text-reset">Other</a></p>
                        <p><a href="#services" className="text-reset">Other</a></p>
                        <p><a href="#services" className="text-reset">Other</a></p> */}
                    </div>
                    {/* Grid column */}
            
                    {/* Grid column */}
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">Our Other Platforms</h6>
                        <p><a href="https://www.instagram.com/smileagain_cameroon?igshid=ZGUzMzM3NWJiOQ" target="_blank" className="text-reset"><i className="fab fa-instagram me-1"></i>Smile Again Cameroon</a></p>
                        {/* <p><a href="#!" className="text-reset">Smile Again Charity</a></p>
                        <p><a href="#!" className="text-reset">Other</a></p>
                        <p><a href="#!" className="text-reset">Other</a></p> */}
                    </div>
                    {/* Grid column */}
            
                    {/* Grid column */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                        <a className="d-block text-decoration-none text-white my-2"><i className="fas fa-home me-3"></i> Post Office Box # 49, Limbe</a>
                        <a className="d-block text-decoration-none text-white my-2"><i className="fas fa-envelope me-3"></i>info@example.com</a>
                        <a className="d-block text-decoration-none text-white my-2"><i className="fas fa-phone me-3"></i>+237 620 777 290 </a>
                        <a href="https://wa.me/+237671752479" className="d-block text-decoration-none text-white my-2"><i className="fab fa-whatsapp me-3"></i>+237 671 752 479 </a>
                    </div>
                    {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </div>
            </section>
            {/* XX Section: Links  */}
        
            {/* Copyright */}
            <div className="text-center p-4 cust-grad" >
                <a className="text-reset fw-bold" href="https://github.com/Babi-B">Babi Beulah (Developer)</a>. All Rights Reserved
            </div>
            {/* Copyright */}
        </footer>
    </> 
    );
}

export default Footer