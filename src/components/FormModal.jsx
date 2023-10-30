import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../assets/pics/logo.png"

function FormModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [fileUpload, setFileUpload] = useState(null)

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

  // Password Visibility
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); 
  };

  // SIGN IN
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("SIGN IN SUCCESSFULL");
      props.handleAutoCloseComponentClick()
      props.refreshApp();
    } catch (error) {
      alert(`SIGN IN FAILED`);
      return
    }
  };

  // FOR MANAGERS ** TASK ID: 2
  const createManager = async () => {
    try {
      const manager = await createUserWithEmailAndPassword(auth, email, password, { name });
      alert("MANAGER CREATED")
      props.addManager({name, email, password})
      props.handleAutoCloseComponentClick()
      props.refreshApp()
    } catch (error) {
      alert(`FAILED TO CREATE MANAGER`);
    }
  };

  const updateManager = async () => {
    try {
      // Update the service data in Firebase Firestore
      await props.editManager(props.service.id, { name, description }, fileUpload);
      props.setEditFalse();
      props.handleAutoCloseComponentClick()
      props.refreshApp();
    } catch (error) {
      alert(`COULD NOT UPDATE SERVICE`);
    }
  };

  // FOR SERVICES ** TASK ID: 3
  const createService = async () => {
    try {
      // Save the service data to Firebase Firestore
      await props.addService({ name, description }, fileUpload);
      props.handleAutoCloseComponentClick()
      props.refreshApp()
    } catch (error) {
      alert(`COULD NOT CREATE SERVICE : ${error.message}`);
    }
  };

  const updateService = async () => {
    try {
      // Update the service data in Firebase Firestore
      await props.editService(props.service.id, { name, description }, fileUpload);
      props.setEditFalse();
      props.handleAutoCloseComponentClick()
      props.refreshApp();
    } catch (error) {
      alert(`COULD NOT UPDATE SERVICE: ${error.message}`);
    }
  };

  // FOR STAFF ** TASK ID: 4
  const createStaff = async () => {
    try {
      // Save the service data to Firebase Firestore
      await props.addStaff({ name, description }, fileUpload);
      props.handleAutoCloseComponentClick()
      props.refreshApp()
    } catch (error) {
      alert(`COULD NOT CREATE STAFF : ${error.message}`);
    }
  };

  const updateStaff = async () => {
    try {
      // Update the service data in Firebase Firestore
      await props.editStaff(props.staff.id, { name, description }, fileUpload);
      props.setEditFalse();
      props.handleAutoCloseComponentClick()
      props.refreshApp();
    } catch (error) {
      alert(`COULD NOT UPDATE STAFF: ${error.message}`);
    }
  };

  // FOR EVENT ** TASK ID: 5
  const createEvent = async () => {
    try {
      // Save the event data to Firebase Firestore
      await props.addEvent({ name, description, place, time, date }, fileUpload);
      props.handleAutoCloseComponentClick()
      props.refreshApp()
    } catch (error) {
      alert(`COULD NOT CREATE EVENT : ${error.message}`);
    }
  };

  const updateEvent = async () => {
    try {
      // Update the event data in Firebase Firestore
      await props.editEvent(props.event.id, { name, description, place, time, date }, fileUpload);
      alert("Event updated");
      props.setEditFalse();
      props.handleAutoCloseComponentClick()
      props.refreshApp();
    } catch (error) {
      alert(`COULD NOT UPDATE EVENT: ${error.message}`);
    }
  };

  // FOR Testimonial ** TASK ID: 3
  const createTestimonial = async () => {
    try {
      // Save the service data to Firebase Firestore
      await props.addTestimonial({ name, description }, fileUpload);
      props.handleAutoCloseComponentClick()
      props.refreshApp()
    } catch (error) {
      alert(`COULD NOT CREATE Testimonial : ${error.message}`);
    }
  };

  const updateTestimonial = async () => {
    try {
      // Update the service data in Firebase Firestore
      await props.editTestimonial(props.testimonial.id, { name, description }, fileUpload);
      props.setEditFalse();
      props.handleAutoCloseComponentClick()
      props.refreshApp();
    } catch (error) {
      alert(`COULD NOT UPDATE SERVICE: ${error.message}`);
    }
  };


  // TASK ID 1 --> SIGN IN
  // TASK ID 2 --> MANAGER
  // TASK ID 3 --> SERVICE
  // TASK ID 4 --> STAFF
  // TASK ID 5 --> EVENT
  // TASK ID 6 --> TESTIMONIAL

  useEffect(() => {
    if(props.forEdit) {
      if (props.taskID == 3 ) {
        setName(props.service.name);
        setDescription(props.service.description);
        setFileUpload(props.service.imageUrl);
      } else if (props.taskID == 6) {
        setName(props.testimonial.name);
        setDescription(props.testimonial.description);
        setFileUpload(props.testimonial.imageUrl);
      }else if (props.taskID == 4) {
        setName(props.staff.name);
        setDescription(props.staff.description);
        setFileUpload(props.staff.imageUrl);
      } else if (props.taskID == 5) {
        setName(props.event.name);
        setDescription(props.event.description);
        setFileUpload(props.event.imageUrl);
        setTime(props.event.time)
        setDate(props.event.date)
        setPlace(props.event.place)
      } else if (props.taskID == 2) {
        setName(props.manager.name);
        setEmail(props.message.email)
        setPassword(props.message.password)
      }
     else {
        clearValues()
      }
    }
  }, [props.forEdit]);



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
                id="btn-close"
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
                    <span
                        className="ms-2 text-secondary"
                        onClick={handlePasswordToggle}
                      >
                        {showPassword ? (
                          <i className="fas fa-eye-slash"></i>
                        ) : (
                          <i className="fas fa-eye"></i>
                        )}
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
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
                      value={name}
                      placeholder="Enter the name"
                      onChange= {(e) => {setName(e.target.value);}}
                      required
                    />
                  </div>
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
                      value={email}
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                </>
              }

                {/* CREATE AND EDIT SERVICE, STAFF, AND TESTIMONIAL */}
                {props.taskID === 3 || props.taskID === 4 || props.taskID === 6 ?
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
                </> : null
                }
                {props.taskID === 5 &&
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
                
              <div className="d-grid">
                <button
                  className="btn btn-info text-white btn-lg bg-blue"
                  onClick={props.taskID === 1 ? 
                    signIn : props.taskID === 2 && props.forEdit?
                    updateManager : props.taskID === 2 ?
                    createManager: props.taskID === 3 && props.forEdit ? 
                    updateService: props.taskID === 3 ?
                    createService: props.taskID === 4 && props.forEdit ?
                    updateStaff: props.taskID === 4 ?
                    createStaff: props.taskID === 5 && props.forEdit ?
                    updateEvent:  props.taskID === 5 ?
                    createEvent:  props.taskID === 6 && props.forEdit ?
                    updateTestimonial:createTestimonial
                  }
                >
                  {props.taskID === 1 ? 
                  "SIGN IN" : props.taskID === 2 && props.forEdit? 
                  "UPDATE MANAGER": props.taskID === 2 ? 
                  "CREATE MANAGER": props.taskID === 3 && props.forEdit ? 
                  "UPDATE SERVICE":  props.taskID === 3 ?
                  "CREATE SERVICE": props.taskID === 4 && props.forEdit ?
                  "UPDATE STAFF": props.taskID === 4 ?
                  "ADD STAFF": props.taskID === 5 && props.forEdit ?
                  "UPDATE EVENT": props.taskID === 5?
                  "ADD EVENT":props.taskID === 6 && props.forEdit ?
                  "UPDATE TESTIMONY":"CREATE TESTIMONY"
                }
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