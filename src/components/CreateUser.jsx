import React, { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";



function CreateUser(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = auth.currentUser;
  const error = ""
  
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true)
      alert("LOGGED IN SUCCESSFULLY")
    } catch (error) {
      alert(`SIGN IN FAILED: ${errorMessage}`);
    }
  };

  const createManager = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    }catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`SIGN UP FAILED : ${errorMessage}`);
    }
  }

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
              <img src="logo.png" alt="" className="modal-title" id="exampleModalLabel" height="50" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <p className="text-info my-3 mx-4" >For Staff Only *</p>

            <div className="modal-body mx-3">

              {/* Sign in/up form */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"><i className="fas fa-envelope me-2 text-secondary"></i>
                    Email address 
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="password" className="form-label"><i className="fas fa-lock me-2 text-secondary"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                </div>
              <p className="text-danger" >{error}</p>
                <div className="d-grid">
                  <button
                    className="btn btn-info text-white btn-lg bg-yellow"
                    onClick={ isLoggedIn ? createManager:signIn}
                  >
                    { isLoggedIn ? "CREATE MANAGER":"SIGN IN"}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;