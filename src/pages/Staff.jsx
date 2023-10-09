import React, { useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import Card from "../components/Card";
import FemaleDoc from "../assets/pics/female_doc.png"
import "../About.css"


function Staff(props) {
    const editButtons =   <div className="d-flex justify-content-between">
                                <button className="btn btn-success">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </div>
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return(
        <>
            <MiniNavbar location="Dashboard/Staff" location_url="/dashboard/staff"/>
            <section id="team">
                <div className="container-lg py-5">
                    <div className="d-flex justify-content-between flex-wrap mb-5">
                        <h3 className="blue-text">Complete List of All Staff</h3>
                        <button className="btn btn-success px-3">ADD STAFF</button>
                    </div>
                    <div className="row justify-content-center g-4 text-center"></div>
                    {
                        props.staff.length === 0 ? (
                            <p className="fst-italic lead mb-4 text-center">No Staff Has Been Registered</p>
                        ) : (
                            props.staff.map((staff) => (
                            <Card
                                img={FemaleDoc}
                                title={staff.name}
                                subtitle={staff.position}
                                description={staff.description}
                                noDisplay="d-none"
                                key={staff.id}
                                editButtons={editButtons}
                            />
                            ))
                        )
                    }
                </div>
            </section>
        </>
    )
}
export default Staff