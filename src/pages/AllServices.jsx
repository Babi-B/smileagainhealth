import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import FormModal from "../components/FormModal";
import { db } from "../firebase/config";
import { getDocs, collection, addDoc } from "firebase/firestore";
import "../About.css";

function AllServices() {
  const [services, setServices] = useState([]);
  const [seriveList, setServiceList] = useState("")
  const [newSeriveImage, setNewServiceImage] = useState("")
  const [newSeriveName, setNewServiceName] = useState("")
  const [newSeriveDescription, setNewServiceDescription] = useState("")

  const serviceCollectionRef = collection(db, "services");

  useEffect(() => {
    const getServiceList = async () => {
      try {
        const data = await getDocs(serviceCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setServices(filteredData);
      } catch (error) {
        console.error(`COULD NOT FETCH DATA. Error Message: ${error}`);
      }
    };

    getServiceList();
    window.scrollTo(0, 0);
  }, []);

  const addService = async (service) => {
    try {
      const docRef = await addDoc(serviceCollectionRef, service);
      const newService = {
        ...service,
        id: docRef.id,
      };
      setServices([...services, newService]);
    } catch (error) {
      console.error(`COULD NOT ADD SERVICE. Error Message: ${error}`);
    }
  };

  return (
    <>
      <MiniNavbar location="Dashboard/Staff" location_url="/dashboard/staff" />
      <section id="team">
        <div className="container-lg py-5">
          <div className="d-flex justify-content-between flex-wrap mb-5">
            <h3 className="blue-text">Complete List of All Staff</h3>
            <button
              className="btn btn-success px-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              ADD SERVICE
            </button>
          </div>
          {services.length === 0 ? (
            <p className="fst-italic lead mb-4 text-center">
              No Manager Has Been Registered
            </p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td className="btn">
                      <i className="fas fa-trash text-danger"></i>
                    </td>
                    <td className="btn">
                      <i className="fas fa-edit text-success"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      <FormModal 
        taskID={3} 
        addService={addService} 
        />
    </>
  );
}

export default AllServices;