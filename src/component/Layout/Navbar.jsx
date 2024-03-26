import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../ContexApi/CreateApi";

function Navbar() {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/job/getall"}
              >
                JobDetails
              </Link>
            </li>

            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/job/post"}
                    onClick={() => setShow(false)}
                  >
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/job/me"}
                    onClick={() => setShow(false)}
                  >
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"applications/me"}
                >
                  My Application
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
