import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Logo from "../assets/pics/logo.png"

function FormModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const error = "";

  console.log(`SERVICE NAME ${props.taskID}`)

  useEffect(() => {
    if (props.service && props.service.name) {
      setName(props.service.name);
    } else {
      setName("");
    }
  
    if (props.service && props.service.description) {
      setDescription(props.service.description);
    } else {
      setDescription("");
    }
  }, [props.service]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      console.log("LOGGED IN");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // return error = "Invalid Email or Password"
      alert(`SIGN IN FAILED: ${errorMessage}`);
    }
  };

  // const createManager = async () => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password, { name });
  //     console.log("User Created")
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     alert(`SIGN UP FAILED : ${errorMessage}`);
  //   }
  // };

  const createService = async () => {
    try {
      // Save the service data to Firebase Firestore
      await props.addService({ name, description });
      console.log("Service Created");
    } catch (error) {
      console.error(`COULD NOT CREATE SERVICE : ${error.message}`);
      alert(`COULD NOT CREATE SERVICE : ${error.message}`);
    }
  };

  const updateService = async () => {
    try {
      // Update the service data in Firebase Firestore
      await props.editService(props.service.id, { name, description });
      console.log("Service updated");
      props.closeModal();
      props.setEditFalse();
    } catch (error) {
      console.error(`COULD NOT UPDATE SERVICE: ${error.message}`);
      alert(`COULD NOT UPDATE SERVICE: ${error.message}`);
    }
  };

  // TASK ID 1 --> SIGN IN
  // TASK ID 2 --> CREATE MANAGER
  // TASK ID 3 --> CREATE SERVICE
  // TASK ID 4 --> CREATE STAFF
  // TASK ID 5 --> CREATE EVENT



  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <img src={Logo} alt="" className="modal-title" id="exampleModalLabel" height="50" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-3">

              {/* SIGN IN */}
              {props.taskID === 1 && 
              <>
                <p className="text-info my-3 mx-4">For Staff Only *</p>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="fas fa-envelope me-2 text-secondary"></i>
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    required
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="password" className="form-label">
                      <i className="fas fa-lock me-2 text-secondary"></i>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                </>
                }

                {/* CREATE MANAGER */}
                {props.taskID === 2 &&
                <>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      <i className="fas fa-user me-2 text-secondary"></i>
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter the name"
                      onChange= {(e) => {setName(e.target.value);}}
                      required
                    />
                  </div>
                </>
                }

                {/* CREATE AND EDIT SERVICE */}
                {props.taskID === 3 &&
                <>
                  <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-user me-2 text-secondary"></i>
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter the name"
                    value={name}
                    onChange= {(e) => {setName(e.target.value);}}
                    required
                  />
                  </div>
                    <div className="my-3">
                    <label htmlFor="password" className="form-label">
                      <i className="fas fa-lock me-2 text-secondary"></i>
                      Description
                    </label>
                    <textarea
                      type="textarea"
                      className="form-control"
                      id="description"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => {setDescription(e.target.value)}}
                      required
                    />
                  </div>
                </>
                }
              <p className="text-danger">{error}</p>
              <div className="d-grid">
                <button
                  className="btn btn-info text-white btn-lg bg-blue"
                  onClick={props.taskID === 1 ? 
                    signIn : props.taskID === 2 ?
                    createManager: props.taskID === 3 && props.forEdit ? 
                    updateService:createService}
                >
                  {props.taskID === 1 ? 
                  "SIGN IN" : props.taskID === 2 ? 
                  "CREATE MANAGER": props.taskID === 3 && props.forEdit ? 
                  "UPDATE SERVICE":  props.taskID === 3 ?
                  "CREATE SERVICE": "ADD STAFF" }
                </button>
              </div>
              </div>
              </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default FormModal;