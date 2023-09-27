import React from "react";

function FormModal() {
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
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"><i className="fas fa-envelope me-2 text-secondary"></i>
                    Email address 
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
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
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-info text-white btn-lg bg-blue"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormModal;