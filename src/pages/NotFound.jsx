import React from "react";

function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-3 fw-bold mb-4">404 - Page Not Found</h1>
      <p className="lead text-center">
        We're sorry, but the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;