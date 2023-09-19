import React from "react"

function Card(props) {
    const styles = {
        width: {
            width: '18rem'
        },
        
    }
    return(
        <div className="col-8 col-md-6 col-lg-4 col-xxl-3">
            <div className="card" style={styles.width}>
                <img className="card-img-top" src={props.img} alt="female_doc" />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{props.subtitle}</h6>
                    <p className="card-text">{props.description}</p>
                    <a href="#about" className="btn btn-outline-info border-2 d-block px-2 fw-bold">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default Card