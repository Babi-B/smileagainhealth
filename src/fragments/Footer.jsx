import React from "react";

function Footer() {
    const styles = {
        background: {
            backgroundColor:'rgba(0, 0, 0, 0.05)'
        } 
    }
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
                            <a href="" className="me-4 text-reset">
                                <i className="fab fa-instagram fs-1"></i>
                            </a>
                            <a href="" className="me-4 text-reset">
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
                        Content
                        <h6 className="text-uppercase fw-bold mb-4"><i className="fas fa-gem me-3"></i>SACFU</h6>
                        <p>Here you can use rows and columns to organize your footer content. Lorem ipsum
                        dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    {/* Grid column */}
            
                    {/* Grid column */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">
                        {/* Services */}
                        </h6>
                        <p><a href="#services" className="text-reset">24/7 home care</a></p>
                        <p><a href="#services" className="text-reset">Other</a></p>
                        <p><a href="#services" className="text-reset">Other</a></p>
                        <p><a href="#services" className="text-reset">Other</a></p>
                    </div>
                    {/* Grid column */}
            
                    {/* Grid column */}
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">Our Other Platforms</h6>
                        <p><a href="#!" className="text-reset">Smile Again Edu</a></p>
                        <p><a href="#!" className="text-reset">Smile Again Charity</a></p>
                        <p><a href="#!" className="text-reset">Other</a></p>
                        <p><a href="#!" className="text-reset">Other</a></p>
                    </div>
                    {/* Grid column */}
            
                    {/* Grid column */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                        <p><i className="fas fa-home me-3"></i> Buea, SW 10012, CMR</p>
                        <p><i className="fas fa-envelope me-3"></i>info@example.com</p>
                        <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                        <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                    </div>
                    {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </div>
            </section>
            {/* XX Section: Links  */}
        
            {/* Copyright */}
            <div className="text-center p-4" style={styles.background}>
                <a className="text-reset fw-bold" href="https://github.com/Babi-B">Babi Beulah (Developer)</a>. All Rights Reserved
            </div>
            {/* Copyright */}
        </footer>
        {/* Footer */}
    </> 
    );
}

export default Footer