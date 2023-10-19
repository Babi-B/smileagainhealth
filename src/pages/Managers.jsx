import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import FormModal from "../components/FormModal";
import { auth, db } from "../firebase/config";
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc, where, query, getDocs } from "firebase/firestore";
import { deleteUser, getAuth } from "firebase/auth";
import "../About.css";

function Managers(props) {
  const [managers, setManagers] = useState(props.managers);
  const [selectedManager, setSelectedManager] = useState(null);
  const [forEdit, setForEdit] = useState(false)

  const managerCollectionRef = collection(db, "managers");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setManagers(props.managers);
  }, [props.managers]);

  // ADD A MANAGER
  const addManager = async (manager) => {
    try {

      const docRef = await addDoc(managerCollectionRef, {...manager});

      const newManager = {...manager, id: docRef.id};

      setManagers([...managers, newManager]);
      alert("MANAGER ADDED")
    } catch (error) {
      alert(`COULD NOT ADD MANAGER. Error Message: ${error}`);
    }
  };

  // EDIT A MANAGER
  const editManager = async (managerId, updatedDetails) => {
    try {
      // Construct the document reference using the managerCollectionRef and managerId
      const managerDocRef = doc(managerCollectionRef, managerId);
  
      // Update the manager document with the new details
      await updateDoc(managerDocRef, updatedDetails);
  
      // Update the user's email in Firebase Authentication
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        await updateEmail(user, updatedDetails.email);
  
        // Update user custom claims (if needed)
        await auth.setCustomUserClaims(user.uid, updatedDetails.customClaims);
      }
  
      // Handle success or show appropriate message
      alert("MANAGER UPDATED");
    } catch (error) {
      // Handle error or show appropriate message
      alert("Error editing manager details and user authentication:", error);
    }
  };

  // DELETE A Manager
  const deleteManager = async (managerId) => {
    try {
      // Construct the document reference using the managerCollectionRef and managerId
      const managerDocRef = doc(managerCollectionRef, managerId);
  
      // Delete the manager document from the collection
      await deleteDoc(managerDocRef);
  
      // Delete the user from Firebase Authentication
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
      }
  
      // Handle success or show appropriate message
      alert("MANAGER DELETED");
    } catch (error) {
      // Handle error or show appropriate message
      alert("Error deleting manager and user:", error);
    }
  };

  return (
    <>
      <MiniNavbar location="Dashboard/Managers" location_url="/dashboard/managers" />
      <section id="team">
        <div className="container-lg py-5">
          <div className="d-flex justify-content-between flex-wrap mb-5">
            <h3 className="yellow-text">Complete List of All Services</h3>
            <button
              className="btn btn-success px-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              ADD MANAGER
            </button>
          </div>
          {props.managers.length === 0 ? (
            <p className="fst-italic lead mb-4 text-center">
              No Manager Has Been Registered
            </p>
          ) : (
            <div className="table-responsive table-responsive-sm">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-wrap">Name</th>
                    <th scope="col" className="text-wrap">Email</th>
                    <th scope="col" className="">Password</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.managers.map((manager, index) => (
                    <tr key={manager.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{manager.name}</td>
                      <td>{manager.email}</td>
                      <td>{manager.password}</td>
                      <td className="btn">
                        <i 
                          className="fas fa-trash text-danger"
                          onClick={() => deleteManager(manager.id)}
                        ></i>
                      </td>
                      <td className="btn">
                        <i 
                          className="fas fa-edit text-success"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setSelectedManager(manager);
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
          taskID={2} 
          addManager={addManager} 
          editManager={editManager}
          service={selectedManager}
          forEdit={forEdit}
          setEditFalse={() => setForEdit(false)}
          refreshApp={props.refreshApp}
        />
    </>
  );
}

export default Managers;