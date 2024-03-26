import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { Context } from "../../ContexApi/CreateApi";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get(
            "https://assingmentbackend.onrender.com/api/v1/application/employer/getall",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(
            "https://assingmentbackend.onrender.com/api/v1/application/jobseeker/getall",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(
          `https://assingmentbackend.onrender.com/api/v1/application/delete/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="container-fluid">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container ">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="">
      <div className="border-1 p-3 border  border flex-md-row flex-column  d-flex justify-content-between align-items-center">
        <div className=" ">
          <p>
            <span className="fw-bold fs-5 p-1">Name:</span>{" "}
            <span className="fs-5">{element.name}</span>
          </p>
          <p>
            <span className="fw-bold fs-5 p-1">Email:</span>{" "}
            <span className="fs-5">{element.email}</span>
          </p>
          <p>
            <span className="fw-bold fs-5 p-1">Phone:</span>{" "}
            <span className="fs-5"> {element.phone}</span>
          </p>
          <p>
            <span className="fw-sm-bold fs-5 p-1">Address:</span>{" "}
            <span className="fs-5">{element.address}</span>
          </p>
          <p>
            <span className="fw-bold fs-5 p-1">CoverLetter:</span>{" "}
            <span className="fs-5">{element.coverLetter}</span>
          </p>
        </div>
        <div className="d-none d-md-block">
          <img
            src={element.resume.url}
            className="img-fluid w-25"
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button
            onClick={() => deleteApplication(element._id)}
            className="btn btn-primary w-100"
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};
