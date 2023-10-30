import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import FormModal from "../components/FormModal";
import { db, storage } from "../firebase/config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Staff(props) {
  const [allStaff, setStaff] = useState(props.staff);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [forEdit, setForEdit] = useState(false)

  const staffCollectionRef = collection(db, "staff");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setStaff(props.staff);
  }, [props.staff]);

  // ADD A SERVICE
  const addStaff = async (staff, fileUpload) => {
    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, 'staff-images/' + fileUpload.name);
      const snapshot = await uploadBytes(storageRef, fileUpload);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(staffCollectionRef, {
        ...staff,
        imageUrl: downloadURL, // Save the image URL in the Firestore document
      });

      const newStaff = {
        ...staff,
        id: docRef.id, 
        imageUrl: downloadURL, // Include the image URL in the new service object
      };

      setStaff([...allStaff, newStaff]);
      alert("STAFF ADDED")
    } catch (error) {
      alert(`COULD NOT ADD STAFF. Error Message: ${error}`);
    }
  };

  // EDIT A SERVICE
  const editStaff = async (staffId, updatedStaff, fileUpload) => {
    try {
          // Upload the new image to Firebase Storage
    const storageRef = ref(storage, 'staff-images/' + fileUpload.name);
    const snapshot = await uploadBytes(storageRef, fileUpload);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the service data in Firebase Firestore, including the new image URL
    await updateDoc(doc(db, "staff", staffId), {
      ...updatedStaff,
      imageUrl: downloadURL, // Include the new image URL in the updated service data
    });

    // Update the services state with the updated service
    setStaff((prevStaff) =>
      prevStaff.map((staff) =>
        staff.id === staffId ? { ...staff, ...updatedStaff, imageUrl: downloadURL } : staff
      )
    );
    alert("STAFF UPDATED")
    } catch (error) {
      alert(`COULD NOT UPDATE STAFF: ${error.message}`);
    }
  };

  // DELETE A STAFF
  const deleteStaff = async (staffId) => {
    try {
      // Delete the staff from Firebase Firestore
      await deleteDoc(doc(db, "staff", staffId));
      // Update the services state by removing the deleted service
      setStaff((prevStaff) =>
        prevStaff.filter((staff) => staff.id !== staffId)
      );
      props.refreshApp()
      alert("Staff deleted");
    } catch (error) {
      alert(`COULD NOT DELETE STAFF: ${error.message}`);
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
              ADD STAFF
            </button>
          </div>
          {props.staff.length === 0 ? (
            <p className="fst-italic lead mb-4 text-center">
              No Staff Has Been Registered
            </p>
          ) : (
            <div className="table-responsive table-responsive-sm">
              <table className="table ">
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
                  {props.staff.map((staff, index) => (
                    <tr key={staff.id}>
                      <th scope="row">{index + 1}</th>
                      <td><img src={staff.imageUrl} alt={staff.name} height="40" /></td>
                      <td>{staff.name}</td>
                      <td>{staff.description}</td>
                      <td className="btn me-3">
                        <i 
                          className="fas fa-trash text-danger"
                          onClick={() => deleteStaff(staff.id)}
                        ></i>
                      </td>
                      <td className="btn">
                        <i 
                          className="fas fa-edit text-success"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setSelectedStaff(staff);
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
          taskID={4} 
          addStaff={addStaff} 
          editStaff={editStaff}
          staff={selectedStaff}
          forEdit={forEdit}
          setEditFalse={() => setForEdit(false)}
          refreshApp={props.refreshApp}
          handleAutoCloseComponentClick={props.handleAutoCloseComponentClick}
        />
    </>
  );
}

export default Staff;