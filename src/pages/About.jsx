import React, { useEffect, useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import GroupPic from "../assets/pics/group.jpg"
import Card from "../components/Card";
import FemaleDoc from "../assets/pics/female_doc.png"
import Timetable from "../components/Timetable";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import "../About.css"


function About(props) {
    const [staff, setStaff] = useState([])
    const staffCollectionRef = collection(db, "staff")
    useEffect(() => {
        const getStaffList = async () => {
            // READ THE DATA
            // SET THE LIST
            try{
                const data = await getDocs(staffCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id:doc.id
                }));
                console.log(filteredData)
                setStaff(filteredData)
            }catch(error){
                console.error(`COULD NOT FETCH DATA. Error Msge ${error}`)
            }
        }
        getStaffList();

        // Scroll to top
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
                        staff.map((staff) => (
                            <Card 
                                img={FemaleDoc} 
                                title={staff.name}
                                subtitle={staff.position}
                                description={staff.description}
                                noDisplay="d-none"
                                isLoggedIn={props.isLoggedIn}
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
                                    Why Choose Us?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                </div>
                                </div>
                                <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Our Principles/Philosopy
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
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