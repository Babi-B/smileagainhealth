import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import FormModal from "../components/FormModal";
import { db, storage } from "../firebase/config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import "../About.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function AllServices(props) {
  const [services, setServices] = useState(props.services);
  const [selectedService, setSelectedService] = useState(null);
  const [forEdit, setForEdit] = useState(false)

  const serviceCollectionRef = collection(db, "services");
  
  useEffect(() => {
    setServices(props.services);
  }, [props.services]);

  // ADD A SERVICE
  const addService = async (service, fileUpload) => {
    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, 'service-images/' + fileUpload.name);
      const snapshot = await uploadBytes(storageRef, fileUpload);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(serviceCollectionRef, {
        ...service,
        imageUrl: downloadURL, // Save the image URL in the Firestore document
      });

      const newService = {
        ...service,
        id: docRef.id, 
        imageUrl: downloadURL, // Include the image URL in the new service object
      };

      setServices([...services, newService]);
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
      props.refreshApp()
    } catch (error) {
      console.error(`COULD NOT DELETE SERVICE: ${error.message}`);
      alert(`COULD NOT DELETE SERVICE: ${error.message}`);
    }
  };

  return (
    <>
      <MiniNavbar location="Dashboard/Services" location_url="/dashboard/services" />
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
                  <th scope="col" className="text-wrap">Name</th>
                  <th scope="col" className="">Description</th>
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
          setEditFalse={() => setForEdit(false)}
          refreshApp={props.refreshApp}
        />
    </>
  );
}

export default AllServices;