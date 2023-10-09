import React from "react"

function HorizontalCard(props) {
    
    return(
        <div className="row justify-content-center mb-5">
                <img className="col-sm-8 col-md-5 col-lg-4 col-xxl-3
                l-3 col-lg-3 p-0 " src={props.img} alt="old_man" />
                <div className="cust-card col-sm-8 col-md-5 col-lg-4 col-xxl-3
                l-3 col-lg-3 text-white p-5">
                    <i className="fas fa-first-aid fs-1 text-center d-block"></i>
                    <h5 className="py-2 text-center">{props.title}</h5>
                    <p className="card-text pb-3">{props.description}</p>
                    <a href="https://wa.me/+237671752479" className="btn btn-outline-light border-2 d-block px-2 fw-bold">Make An Appointment</a>
                </div>
            </div>
    )
}

export default HorizontalCard