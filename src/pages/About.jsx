import React, { useEffect, useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import GroupPic from "../assets/pics/group.jpg"
import Card from "../components/Card";
import FemaleDoc from "../assets/pics/female_doc.png"
import Timetable from "../components/Timetable";
import "../About.css"


function About(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return(
        <>
            <MiniNavbar location="About Us" location_url="/about_us"/>
            {/* <!-- Main About Us Section --> */}
                <section id="bg-infomation">
                    <div className="container-lg py-5">
                        <h3 className="blue-text">Who We Are</h3>
                        <div className="custom-hr mb-5"></div>
                        <div className="row justify-content-center">
                            <div className="col-sm-8 col-md-6 p-0">
                                <img src={GroupPic} alt="the team" className="w-100" />
                            </div>
                            <div className="col-sm-8 col-md-6 bg-gray p-5 bottom-border">
                                {/* <h5 className="blue-text">Lorem ipsum dolor sit amet.</h5> */}
                                <p>
                                    We are a non-profit, humanitarian association called Smile Again Charity Foundation for the Underprivileged with acronym S.A.C.F.U. with head office in Newtown, Limbe, SWR-237, Cameroon. We provide benevolent support to underprivileged children and underprivileged communities by empowering the children with standardized vocational training, work placement, Health sensitization and Entrepreneurial skill development
                                </p>
                                <p>
                                    To achieve these, S.A.C.F.U. set up the Smile Again Health System which serves as a fundraiser for the association to attain its goals and to provide dignified health care services to patients.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* <!-- Services Section --> */}
            <section id="team">
                <div className="container-lg py-5">
                    <h3 className="blue-text">Our Healthcare Administration</h3>
                    <div className="custom-hr mb-5"></div>
                    <div className="row justify-content-center g-4 text-center"></div>
                    {
                        props.staff.map((staff) => (
                            <Card 
                                img={FemaleDoc} 
                                title={staff.name}
                                subtitle={staff.position}
                                description={staff.description}
                                noDisplay="d-none"
                                key={staff.id}
                            />
                    ))
                    }
                </div>
            </section>

            {/* <!-- More Information --> */}
            <section id="bg-infomation">
                <div className="container-lg py-5">
                    <div className="row g-4">
                        <div className="col-md-12 col-lg-6">
                            <h3 className="blue-text ">More About Us</h3>
                            <div className="custom-hr mb-5"></div> 
                            <div className="accordion accordion-flush justify-self-center" id="accordionFlushExample">
                                <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Our Services Are Specialized
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">At Smile Again Health we know that every patient is unique and require specialized care well designed to fit their everyday needs that is why before we provide care to our patients, we review them for their detailed need, produce tentative care plans to improve the patient’s health condition. </div>
                                </div>
                                </div>
                                <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Our Principles/Philosopy
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Nurturing Care, Guided by Kindness: At our core, we embody a culture of compassion. With unwavering commitment, we provide personalized care that prioritizes kindness, care, and consideration. Adaptable to any environment, we deliver exceptional services and ensure the well-being of every patient. By blending expertise with empathy, we create a nurturing experience, fostering strong relationships and promoting holistic well-being.</div>
                                </div>
                                </div>
                                <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    Our Mission
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Our purpose is to improve the provision of health care services to every Cameroonian by providing solutions to some of the factors limiting access to standardized health care. 
                                    </div>
                                </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                        How We Do It
                                    </button>
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        The Smile Again Health System now has Healthcare providers both institutions and individuals working in partnership to provide care to patients in the comfort of their homes hence guaranteeing Confidentiality, Affordability, Comfort, and Uniquely Specialized care to fit the patients needs which intend increases efficiency. 
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <!-- Testimonies --> */}
                        <div id="testimonies" className=" col-md-12 col-lg-6">
                            <h3 className="blue-text ">Testimonials</h3>
                            <div className="custom-hr mb-5"></div>
                            <div id="carousel">
                                <div id="carouselExampleCaptions" className="carousel slide py-5 px-3" data-bs-ride="carousel">
                                    <div className="carousel-inner text-center">
                                    <div className="carousel-item active" data-interval="10">
                                        <img src={FemaleDoc} alt="..." />
                                        <p className="fst-italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur tenetur architecto obcaecati laborum itaque. Nihil quia amet architecto dolores at?</p>
                                    </div>
                                    <div className="carousel-item" data-interval="10">
                                        <img src={FemaleDoc} alt="..." />
                                        <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quis et praesentium eos sed? Voluptas, illum. Saepe delectus rem at?</p>
                                    </div>
                                    <div className="carousel-item" data-interval="10">
                                        <img src={FemaleDoc} alt="..." />
                                        <p className="fst-italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id mollitia atque corporis sapiente impedit dolorem velit aliquam, a nihil. Animi.</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Timetable />
        </>
    )
}

export default About