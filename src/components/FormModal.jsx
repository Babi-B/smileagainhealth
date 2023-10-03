import React, { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



function FormModal(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert(`User ${user.uid} has been signed in with ${user.email}`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Sign-in attempt failed. Error Code: ${errorCode} || Error Message: ${errorMessage}`);
    }
  };
  
  const signUp = async () => {
    console.log("Loading ...")
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    console.log("Successfull ...")

    }catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Sign-in attempt failed. Error Code: ${errorCode} || Error Message: ${errorMessage}`);
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
              <img src="logo.png" alt="" className="text-center modal-title" id="exampleModalLabel" height="50" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
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
                <div className="d-grid">
                  <button
                    className="btn btn-info text-white btn-lg bg-blue"
                    onClick={props.text ? signIn: signUp}
                  >
                    {props.text ? "SIGN IN":"CREATE USER"}
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