import React, { useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import IntroVid from "../assets/videos/kampus.mp4"
import HorizontalCard from "../components/HorizontalCard";
import BabyPic from "../assets/pics/little_baby.jpg"
import BabyIcon from "../assets/svg/baby.svg"

function Services(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return(
        <>
            <MiniNavbar location="Services" location_url="/services"/>

            {/* <!-- Intro vid --> */}
            <section id="about" className="container-lg my5">
                <h3 className="blue-text mt-5">We Offer A Range of Services</h3>
                <div className="custom-hr mb-5"></div>
                <div className="row justify-content-center align-items-center g-3">
                    <div className="col-md-6 embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item align-self-center" src={IntroVid} width="370" height="300" allowFullScreen></iframe>
                    </div>
                    <div className="col-md-6">
                        <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, repudiandae!</p>
                        <p className="my-4">Lorem ipsum, doloras quam quibusdam similiqerum voluptates facilis ducimus labore voluptatem dignissimos jbhujhuyg</p>
                        <button type="button" className="header-btn btn btn-danger btn-lg mt-2">Make An Appointment</button>
                    </div>
                </div>
            </section>

            {/* Service Cards */}
            <section id="services" className="mt-5">
                <div className="container-lg py-5">
                    <h3 className="blue-text ">Some Of Our Services Include</h3>
                    <div className="custom-hr mb-5"></div>
                    {props.services.map((service, index) => (
                        <HorizontalCard 
                        key={service.id}
                        img={service.imageUrl}
                        icon1=""
                        icon2=""
                        imgIcon={BabyIcon}
                        title={service.name}
                        description={service.description}
                    />
                    ))}
                    
                </div>
            </section>
            <section className="bg-blue text-white text-center" >
                <div className="cust-grad p-5">
                    <p className="lead ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, repudiandae!</p>
                    <p>Lorem ipsum, doloras quam quibusdam similiqerum voluptates facilis ducimus labore voluptatem dignissimos jbhujhuyg</p>
                    <button type="button" className="header-btn btn btn-danger btn-lg mt-2">Make An Appointment</button>
                </div>
            </section>
        </>
    )
}
export default Services