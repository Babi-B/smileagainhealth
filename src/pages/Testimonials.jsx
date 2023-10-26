import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import FormModal from "../components/FormModal";
import { db, storage } from "../firebase/config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Testimonials(props) {
  const [testimonials, setTestimonials] = useState(props.testimonials);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [forEdit, setForEdit] = useState(false)

  const testimonialCollectionRef = collection(db, "testimonials");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTestimonials(props.testimonials);
  }, [props.testimonials]);

  // ADD A SERVICE
  const addTestimonial = async (testimonial, fileUpload) => {
    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, 'testimonial-images/' + fileUpload.name);
      const snapshot = await uploadBytes(storageRef, fileUpload);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(testimonialCollectionRef, {
        ...testimonial,
        imageUrl: downloadURL, // Save the image URL in the Firestore document
      });

      const newTestimonial = {
        ...testimonial,
        id: docRef.id, 
        imageUrl: downloadURL, // Include the image URL in the new service object
      };

      setTestimonials([...testimonials, newTestimonial]);
      alert("TESTIMONIAL ADDED")
    } catch (error) {
      alert(`COULD NOT ADD TESTIMONIAL. Error Message: ${error}`);
    }
  };

  // EDIT A TESTIMONIAL
  const editTestimonial = async (testimonialId, updatedTestimonial, fileUpload) => {
    try {
          // Upload the new image to Firebase Storage
    const storageRef = ref(storage, 'testimonial-images/' + fileUpload.name);
    const snapshot = await uploadBytes(storageRef, fileUpload);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the service data in Firebase Firestore, including the new image URL
    await updateDoc(doc(db, "testimonials", testimonialId), {
      ...updatedTestimonial,
      imageUrl: downloadURL, // Include the new image URL in the updated service data
    });

    // Update the services state with the updated service
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimonial) =>
      testimonial.id === testimonialId ? { ...testimonial, ...updatedTestimonial, imageUrl: downloadURL } : testimonial
      )
    );
      alert("TESTIMONIAL UPDATED");
    } catch (error) {
      alert(`COULD NOT UPDATE TESTIMONIAL: ${error.message}`);
      alert(`COULD NOT UPDATE TESTIMONIAL: ${error.message}`);
    }
  };

  // DELETE A TESTIMONIAL
  const deleteTestimonial = async (testimonialId) => {
    try {
      // Delete the service from Firebase Firestore
      await deleteDoc(doc(db, "testimonials", testimonialId));
      // Update the services state by removing the deleted service
      setTestimonials((prevTestimonials) =>
        prevTestimonials.filter((testimonial) => testimonial.id !== testimonialId)
      );
      props.refreshApp()
      alert("Testimonial deleted");
    } catch (error) {
      alert(`COULD NOT DELETE TESTIMONIAL: ${error.message}`);
    }
  };

  return (
    <>
      <MiniNavbar location="Dashboard/Testimonials" location_url="/dashboard/testimonials" />
      <section id="team">
        <div className="container-lg py-5">
          <div className="d-flex justify-content-between flex-wrap mb-5">
            <h3 className="blue-text">Complete List of All Testimonials</h3>
            <button
              className="btn btn-success px-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              ADD TESTIMONIAL
            </button>
          </div>
          {props.testimonials.length === 0 ? (
            <p className="fst-italic lead mb-4 text-center">
              No Testimonials Has Been Registered
            </p>
          ) : (
            <div className="table-responsive table-responsive-sm">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Image</th>
                    <th scope="col" className="text-wrap">Name</th>
                    <th scope="col" className="">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.testimonials.map((testimonial, index) => (
                    <tr key={testimonial.id}>
                      <th scope="row">{index + 1}</th>
                      <td><img src={testimonial.imageUrl} alt={testimonial.name} height="40" /></td>
                      <td>{testimonial.name}</td>
                      <td>{testimonial.description}</td>
                      <td className="btn">
                        <i 
                          className="fas fa-trash text-danger"
                          onClick={() => deleteTestimonial(testimonial.id)}
                        ></i>
                      </td>
                      <td className="btn">
                        <i 
                          className="fas fa-edit text-success"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setForEdit(true)
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
        <FormModal 
          taskID={6} 
          addTestimonial={addTestimonial} 
          editTestimonial={editTestimonial}
          testimonial={selectedTestimonial}
          forEdit={forEdit}
          setEditFalse={() => setForEdit(false)}
          refreshApp={props.refreshApp}
        />
    </>
  );
}

export default Testimonials;