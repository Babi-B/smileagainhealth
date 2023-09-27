import React from "react"
import AvailableDoctor from "../assets/pics/doctor_is_available.jpg"


function Timetable() {
    return(
        <>
            <section id="time-table">
                <div className="container-lg py-5">
                    <h3 className="blue-text ">Our Available Times</h3>
                    <div className="custom-hr mb-5"></div>
                    <div className="row justify-content-center">
                        <img className="col-sm-8 col-md-5 col-lg-4 col-xxl-3
                        l-3 col-lg-3 p-0 " src={AvailableDoctor} alt="female_doc" />
                        <div className="cust-card col-sm-8 col-md-5 col-lg-4 col-xxl-3
                        l-3 col-lg-3 text-white p-5">
                            <p className="pb-3 lead"><i className="fas fa-solid fa-clock fs-2 me-2"></i>Our Available Hours Are:</p>
                            <p className="card-text pb-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="https://wa.me/+237671752479" target="_blank" className="btn btn-outline-light border-2 d-block px-2 fw-bold ">Make An Appointment</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Timetable