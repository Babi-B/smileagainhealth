import React from "react"

function HorizontalCard(props) {
    
    return(
        <div className="row justify-content-center mb-5 text-white">
                <img className="col-sm-8 col-md-5 col-lg-4 col-xxl-3
                l-3 col-lg-3 p-0 " src={props.img} alt="old_man" />
                <div className="cust-card col-sm-8 col-md-5 col-lg-4 col-xxl-3
                l-3 col-lg-3 p-5">
                    { props.date ? 
                        <i className="fas fa-bullhorn fs-1 text-center d-block tilted-icon"></i>
                        :
                        <i className="fas fa-first-aid fs-1 text-center d-block"></i>}
                    <h5 className="py-2 text-center">{props.title}</h5>
                    <p className="card-text pb-3">{props.description}</p>
                    <a href="https://wa.me/+237671752479" className={`btn btn-outline-light border-2 d-block px-2 fw-bold ${props.noDisplay}`}>Make An Appointment</a>
                    {props.date && <div className="d-flex flex-wrap justify-content-between text-center">
                        <small className="mb-2">Venue<i className="fas fa-map-marker-alt mx-2"></i>: {props.place}</small>
                        <small className="mb-2">Date<i className="far fa-calendar-alt mx-2"></i>: {props.date}</small>
                        <small>Time <i className="fas fa-solid fa-clock mx-2"></i>: {props.time}</small>
                    </div>}
                </div>
            </div>
    )
}

export default HorizontalCard