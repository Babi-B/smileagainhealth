import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function MiniNavbar(props) {
    return(
        <>
          <section className="bg-blue">
                <div className="cust-grad">
                    <div className="container-lg">
                        <div className="d-flex justify-content-between text-white py-5">
                            <h2>{props.location}</h2>
                            <h4><Link to="/" className="text-white">Home</Link> | <Link to={props.location_url} className="text-info">{props.location}</Link></h4>
                        </div>        
                    </div>
                </div>
            </section> 
            <Outlet /> 
        </>
    )
}