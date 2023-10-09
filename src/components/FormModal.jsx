import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Logo from "../assets/pics/logo.png"

function FormModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [password, setPassword] = useState("");
  const [fileUpload, setFileUpload] = useState(null)

  const error = "";

  console.log(`FORM TASK ID ${props.taskID}`)

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
    if (props.service && props.service.imageUrl) {
      setFileUpload(props.service.imageUrl);
    } else {
      setFileUpload(null);
    }
  }, [props.service]);

  // CLEAR INPUT VALUES
  const clearValues = () => {
      setName("")
      setPassword("")
      setEmail("")
      setDescription("")
      setPlace("")
      setDate("")
      setTime("")
      setFileUpload(null)
  }

  // SIGN IN
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      clearValues();
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

  // FOR SERVICES ** TASK ID: 3
  const createService = async () => {
    try {
      // Save the service data to Firebase Firestore
      await props.addService({ name, description }, fileUpload);
      console.log("Service Created");
      clearValues();
      props.refreshApp()
    } catch (error) {
      console.error(`COULD NOT CREATE SERVICE : ${error.message}`);
      alert(`COULD NOT CREATE SERVICE : ${error.message}`);
    }
  };

  const updateService = async () => {
    try {
      // Update the service data in Firebase Firestore
      await props.editService(props.service.id, { name, description }, fileUpload);
      console.log("Service updated");
      props.setEditFalse();
      clearValues();
      props.refreshApp();
    } catch (error) {
      console.error(`COULD NOT UPDATE SERVICE: ${error.message}`);
      alert(`COULD NOT UPDATE SERVICE: ${error.message}`);
    }
  };

  // FOR STAFF ** TASK ID: 4
  const createStaff = async () => {
    console.log(`Creating Staff...`)
    try {
      // Save the service data to Firebase Firestore
      await props.addStaff({ name, description }, fileUpload);
      console.log("Staff Created");
      clearValues();
      props.refreshApp()
    } catch (error) {
      console.error(`COULD NOT CREATE STAFF : ${error.message}`);
      alert(`COULD NOT CREATE STAFF : ${error.message}`);
    }
  };

  const updateStaff = async () => {
    try {
      // Update the service data in Firebase Firestore
      await props.editStaff(props.staff.id, { name, description }, fileUpload);
      console.log("STAFF updated");
      props.setEditFalse();
      clearValues();
      props.refreshApp();
    } catch (error) {
      console.error(`COULD NOT UPDATE STAFF: ${error.message}`);
      alert(`COULD NOT UPDATE STAFF: ${error.message}`);
    }
  };

  // FOR EVENT ** TASK ID: 5
  const createEvent = async () => {
    console.log(`Creating Event...`)
    try {
      // Save the event data to Firebase Firestore
      await props.addEvent({ name, description, place, time, date }, fileUpload);
      console.log("Event Created");
      clearValues();
      props.refreshApp()
    } catch (error) {
      console.error(`COULD NOT CREATE EVENT : ${error.message}`);
      alert(`COULD NOT CREATE EVENT : ${error.message}`);
    }
  };

  const updateEvent = async () => {
    try {
      // Update the event data in Firebase Firestore
      await props.editEvent(props.event.id, { name, description, place, time, date }, fileUpload);
      console.log("Event updated");
      props.setEditFalse();
      clearValues();
      props.refreshApp();
    } catch (error) {
      console.error(`COULD NOT UPDATE EVENT: ${error.message}`);
      alert(`COULD NOT UPDATE EVENT: ${error.message}`);
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
                onClick={clearValues}
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

                {/* CREATE AND EDIT SERVICE AND STAFF */}
                {props.taskID === 3 || props.taskID === 4 ?
                <>
                  <input 
                    type="file" 
                    id="img"
                    className="mb-3" 
                    onChange= {(e) => {setFileUpload(e.target.files[0]);}}
                    accept="image/png, image/jpg, image/jpeg"
                    required 
                    />
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
                    <label htmlFor="description" className="form-label">
                    <i className="fas fa-info-circle me-2 text-secondary"></i>
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
                </> : 
                
                <>
                {/* CREATE AND EDIT EVENTS */}
                <input 
                  type="file" 
                  id="img"
                  className="mb-3" 
                  onChange={(e) => {setFileUpload(e.target.files[0]);}}
                  accept="image/png, image/jpg, image/jpeg"
                  required 
                />

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
                    onChange={(e) => {setName(e.target.value);}}
                    required
                />
                </div>

                <div className="my-3">
                  <label htmlFor="description" className="form-label">
                    <i className="fas fa-info-circle me-2 text-secondary"></i>
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

                <div className="my-3">
                  <label htmlFor="date" className="form-label"><i className="far fa-calendar-alt me-2 text-secondary"></i>
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => {setDate(e.target.value)}}
                    required
                  />
                </div>

                <div className="my-3">
                  <label htmlFor="time" className="form-label"><i className="fas fa-solid fa-clock me-2 text-secondary"></i>
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={(e) => {setTime(e.target.value)}}
                    required
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="place" className="form-label">
                  <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                    Place
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="place"
                    value={place}
                    onChange={(e) => {setPlace(e.target.value)}}
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
                    updateService: props.taskID === 3 ?
                    createService: props.taskID === 4 && props.forEdit ?
                    updateStaff: props.taskID === 4 ?
                    createStaff: props.taskID === 5 && props.forEdit ?
                    updateEvent: createEvent
                  }
                >
                  {props.taskID === 1 ? 
                  "SIGN IN" : props.taskID === 2 ? 
                  "CREATE MANAGER": props.taskID === 3 && props.forEdit ? 
                  "UPDATE SERVICE":  props.taskID === 3 ?
                  "CREATE SERVICE": props.taskID === 4 && props.forEdit ?
                  "UPDATE STAFF": props.taskID === 4 ?
                  "ADD STAFF": props.taskID === 5 && props.forEdit ?
                  "UPDATE EVENT":"ADD EVENT" }
                </button>
              </div>
              </div>
              </div>
          </div>
        </div>
    </>
  );
}

export default FormModal;