import React from "react"
import { Link } from "react-router-dom"

function Card(props) {
    return(
        <div className="col-sm-8 col-md-6 col-lg-4 col-xxl-3">
            <div className="card mx-auto" >
                <img className="card-img-top" src={props.img} alt="female_doc" />
                <div className="card-body">
                    <h5 className="card-title text-center">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{props.subtitle}</h6>
                    <p className="card-text">{props.description}</p>
                    <Link to={`/services/${props.servicePointer}`} className={`btn btn-outline-info border-2 d-block px-2 fw-bold ${props.noDisplay}`}>Read More</Link>
                        {props.editButtons}
                </div>
            </div>
        </div>
    )
}

export default Card