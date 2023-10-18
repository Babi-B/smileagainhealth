import React, { useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import IntroVid from "../assets/videos/kampus.mp4"
import HorizontalCard from "../components/HorizontalCard";

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
                    <div className="col-md-6 embed-responsive embed-responsive-16by9 text-center">
                        <iframe className="embed-responsive-item align-self-center" src={IntroVid} width="370" height="300" allowFullScreen></iframe>
                    </div>
                    <div className="col-md-6">
                        <p className="my-4">At-home care can vary from a few hours a week of companionship, to round-the-clock health care. Our healthcare providers are thoroughly trained, insured/bonded professional caregivers who can assist with a wide range of daily activities such as: bathing, exercise, medication reminders, cooking, laundry, transportation and nursing care. </p>
                        <p>In addition to providing a trusted helper for your loved one, Smile Again Health’s in-home care is flexible to their changing health needs.</p>
                        <div className="text-center">
                            <a href="https://wa.me/+237671752479" target="_blank" className="header-btn btn btn-danger btn-lg mt-2">Book Free Consultation</a>
                        </div>
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
                        title={service.name}
                        description={service.description}
                    />
                    ))}
                    
                </div>
            </section>
            <section className="bg-blue text-white text-center" >
                <div className="cust-grad p-5">
                    <p className="lead ">INFORMATION  FOR THE FAMILY</p>
                    <p>It can be hard for any of us to accept difficult truths, especially when it comes to our own abilities. As our parents age, they will slowly lose their independence. They may face memory loss or even chronic disease; everyday tasks such as preparing a meal or driving to the store could pose a risk. Your primary concern is for their safety, but you also respect their desire for independence.</p>
                    <p>At Smile Again Health, we have helped thousands of families navigate the process of aging. We create personalized care plans for seniors so they receive the lifestyle assistance, personal care and companionship that suits their needs, while maintaining as much independence as possible. We provide families with peace of mind and older adults with security and comfort. Our framework for an open and honest discussion about home care can help you and your loved one recognize the need for care and understand how it can positively impact lives.</p>
                    <a href="https://wa.me/+237671752479" className="header-btn btn btn-danger btn-lg mt-2">Book Free Consultation</a>
                </div>
            </section>
        </>
    )
}
export default Services