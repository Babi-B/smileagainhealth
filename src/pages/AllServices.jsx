import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import FormModal from "../components/FormModal";
import { db } from "../firebase/config";
import { getDocs, collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import "../About.css";

function AllServices(props) {
  const [services, setServices] = useState(props.services);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [forEdit, setForEdit] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const serviceCollectionRef = collection(db, "services");
  
  
  const [seriveList, setServiceList] = useState("")
  const [newSeriveImage, setNewServiceImage] = useState("")
  const [newSeriveName, setNewServiceName] = useState("")
  const [newSeriveDescription, setNewServiceDescription] = useState("")

  // ADD A SERVICE
  const addService = async (service) => {
    try {
      const docRef = await addDoc(serviceCollectionRef, service);
      const newService = {
        ...service,
        id: docRef.id,
      };
      setServices([...services, newService]);
      setRefresh(true)
      console.log("SERVICE ADDED")
    } catch (error) {
      console.error(`COULD NOT ADD SERVICE. Error Message: ${error}`);
    }
  };

  // EDIT A SERVICE
  const editService = async (serviceId, updatedService) => {
    try {
      // Update the service in Firebase Firestore
      await updateDoc(doc(db, "services", serviceId), updatedService);
      // Update the services state with the updated service
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === serviceId ? { ...service, ...updatedService } : service
        )
      );
      setRefresh(true)
      console.log("Service updated");
    } catch (error) {
      console.error(`COULD NOT UPDATE SERVICE: ${error.message}`);
      alert(`COULD NOT UPDATE SERVICE: ${error.message}`);
    }
  };

  // DELETE A SERVICE
  const deleteService = async (serviceId) => {
    try {
      // Delete the service from Firebase Firestore
      await deleteDoc(doc(db, "services", serviceId));
      // Update the services state by removing the deleted service
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
      console.log("Service deleted");
    } catch (error) {
      console.error(`COULD NOT DELETE SERVICE: ${error.message}`);
      alert(`COULD NOT DELETE SERVICE: ${error.message}`);
    }
  };
  
  // const handleEditService = (serviceName, serviceDescription) => {
  //   setSelectedServiceName(serviceName);
  //   setSelectedServiceDescription(serviceDescription);
  // };

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
          {props.services.length === 0 ? (
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
                {props.services.map((service, index) => (
                  <tr key={service.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td className="btn">
                      <i 
                        className="fas fa-trash text-danger"
                        onClick={() => deleteService(service.id)}
                      ></i>
                    </td>
                    <td className="btn">
                      <i 
                        className="fas fa-edit text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setSelectedService(service);
                          setIsEditModalOpen(true);
                          setForEdit(true)
                        }}
                      ></i>
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
          editService={editService}
          service={selectedService}
          forEdit={forEdit}
          closeModal={() => setIsEditModalOpen(false)}
          setEditFalse={() => setForEdit(false)}
          refresh={refresh}
        />
    </>
  );
}

export default AllServices;