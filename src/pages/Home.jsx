import React, { useEffect } from "react";
import Timetable from "../components/Timetable";
import Card from "../components/Card";
import FemaleDoctor from "../assets/pics/black-female-doctor-examining-small-boy-with-stethoscope-during-home-visit-due-covid19-pandemic.jpg"
import Injecting from "../assets/pics/injecting.jpg"
import AvailableDoctor from "../assets/pics/doctor_is_available.jpg"


function Home() {
    const styles = {
        width: {
            width: '18rem'
        },
        
    }
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
            <section id="section1">
                {/* CAROUSEL */}
                <div id="carousel">
                    <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                        <div className="carousel-item active" data-interval="100">
                            <img src={FemaleDoctor} className="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                            <h2>The Secret to Long Life</h2>
                            <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-interval="100">
                            <img src={Injecting} className="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                            <h2>We Offer Home Care Services</h2>
                            <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-interval="100">
                            <img src={AvailableDoctor} className="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                            <h2>Some other info</h2>
                            <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
             {/* xxxx CAROUSEL */}
            </section>
            
            {/* <!-- XXXXXXXX FIRST SECTION --> */}
            {/* <!-- Mini Column --> */}
            <section id="mini-column">
                <div className="text-center">
                    <button type="button" className="header-btn btn btn-danger btn-lg">Make An Appointment</button>
                </div>
                <div className="sectors container py-5">
                    <div className="row justify-content-center text-white gy-5 text-center">
                        <div className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="text-center">
                                <i className="fas fa-first-aid fs-1"></i>
                            </div>
                            <h4>Lorem ipsum dolor sit amet.</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat voluptas nihil a neque in nam repudiandae, tempora nisi! Itaque.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="text-center">
                                <i className="fas fa-capsules fs-1"></i>
                            </div>
                            <h4>Lorem ipsum dolor sit amet.</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat voluptas nihil a neque in nam repudiandae, tempora nisi! Itaque.</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="text-center">
                                <i className="fas fa-heartbeat fs-1"></i>
                            </div>
                            <h4>Lorem ipsum dolor sit amet.</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat voluptas nihil a neque in nam repudiandae, tempora nisi! Itaque.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- XXXXXX Mini Column --> */}
            
            {/* <!-- Services Section --> */}
            <section id="services">
                <div className="container-lg py-5">
                    <h3 className="blue-text ">Some of the services we offer include</h3>
                    <div className="custom-hr mb-5"></div>
                    <div className="row justify-content-center align-items-center g-4">
                        <Card 
                            img={Injecting} 
                            title="Vaccination"
                            description="Some quick example text to build on the card title and make up the bulk of the card's content."
                            />
                        <Card 
                            img={Injecting} 
                            title="Vaccination"
                            description="Some quick example text to build on the card title and make up the bulk of the card's content."
                            />
                        <Card 
                            img={Injecting} 
                            title="Vaccination"
                            description="Some quick example text to build on the card title and make up the bulk of the card's content."
                            />
                        <Card 
                            img={Injecting} 
                            title="Vaccination"
                            description="Some quick example text to build on the card title and make up the bulk of the card's content."
                            />
                    </div>
                </div>
            </section>
            <Timetable />
        </>
    )
}

export default Home