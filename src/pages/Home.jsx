import React, { useEffect } from "react";
import Timetable from "../components/Timetable";
import Card from "../components/Card";
import FemaleDoctor from "../assets/pics/black-female-doctor-examining-small-boy-with-stethoscope-during-home-visit-due-covid19-pandemic.jpg"
import Injecting from "../assets/pics/injecting.jpg"
import AvailableDoctor from "../assets/pics/doctor_is_available.jpg"
import HorizontalCard from "../components/HorizontalCard";


function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const services = props.services.slice(0, 4);
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
                            <h3>Get Treated At Home</h3>
                            <p className="small">Smile Again Home Health Care played a very vital role in the clients’ life by keeping them healthy and happy at home, because there is no place like Home.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-interval="100">
                            <img src={Injecting} className="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                            <h3>We Offer Home Care Services</h3>
                            <p className="small">Our services are available to the clients who are Homebound, Bedbound, Wheelchair bound, or needing assistance with Daily Activities of Living (ADL).</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-interval="100">
                            <img src={AvailableDoctor} className="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                            <h3>Safe and Reliable Care</h3>
                            <p className="small">Our services are always provided under direct supervision of the physician and approved Care Plan.</p>
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
                    <a href="https://wa.me/+237671752479" target="_blank" className="header-btn btn btn-danger btn-lg" >Make An Appointment</a>
                </div>
                <div className="sectors container py-5">
                    <div className="row justify-content-center text-white gy-5 text-center">
                        <div className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="text-center">
                                <i className="fas fa-user-nurse fs-1 mb-3"></i>
                            </div>
                            <h4>Our caregivers are:</h4>
                            <p>Highly trained and experienced professionals</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="text-center">
                                <i className="fas fa-thumbs-up fs-1 mb-3"></i>
                            </div>
                            <h4>Reliable and Accountable</h4>
                            <p>We show up on time, and deliver above and beyond</p>
                        </div>
                        <div className="col-sm-6 col-lg-4 col-xxl-3">
                            <div className="text-center">
                                <i className="fas fa-heartbeat fs-1 mb-3"></i>
                            </div>
                            <h4>We are</h4>
                            <p>Passionate and caring people, and easily adapt to any situation</p>
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
                        {services.map((service,index) =>(
                            <Card 
                            key={index}
                            img={service.imageUrl} 
                            title={service.name}
                            description={service.description.length > 100
                                ? `${service.description.substring(0, 100)}...`
                                : service.description}
                            servicePointer={service.id}
                            />
                        ))}    
                    </div>
                </div>
            </section>
            
            <Timetable />
            {/* <!-- Events Section --> */}
            {props.events &&
                <section id="services" className="mt-5">
                    <div className="container-lg py-5">
                        <h3 className="blue-text ">Our Events Include</h3>
                        <div className="custom-hr mb-5"></div>
                        {props.events.map((event) => (
                            <HorizontalCard 
                            key={event.id}
                            img={event.imageUrl}
                            title={event.name}
                            description={event.description}
                            date={event.date}
                            place={event.place}
                            time={event.time}
                            noDisplay="d-none"
                        />
                        ))}
                        
                    </div>
                </section>
            }
        </>
    )
}

export default Home