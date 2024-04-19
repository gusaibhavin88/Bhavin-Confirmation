import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const ViewUser = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  return (
    <div>
      <span onClick={openModal} style={{ cursor: "pointer" }}>
        {
          <FontAwesomeIcon
            icon={faEye}
            style={{
              alignSelf: "center",
              marginRight: "3rem",
              cursor: "pointer",
              fontSize: "1.5rem", // Adjust the size here
            }}
          />
        }
      </span>
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  User Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row gy-3 overflow-hidden">
                  <div className="row gy-3 overflow-hidden">
                    <div className={"mb-3 " + "col-md-6"}>
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={item?.email ? item?.email : " -"}
                        className={`form-control `}
                        id="email"
                        readOnly
                      />
                    </div>
                    <>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="contactNumber" className="form-label">
                          Contact Number
                        </label>
                        <input
                          type="Number"
                          defaultValue={
                            item?.contact_number ? item?.contact_number : " -"
                          }
                          className={`form-control`}
                          id="contact_number"
                          readOnly={true}
                        />
                      </div>
                    </>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue={
                          item?.first_name
                            ? item?.first_name + " " + item?.last_name
                            : "-"
                        }
                        style={{ maxWidth: "100%" }}
                        className={`form-control`}
                        readOnly={true}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="Name" className="form-label">
                        Gender
                      </label>
                      <input
                        type="text"
                        id="gender"
                        defaultValue={
                          item.gender || !item.gender === undefined
                            ? item?.gender
                            : "-"
                        }
                        style={{ maxWidth: "100%" }}
                        className={`form-control`}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Name" className="form-label">
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        defaultValue={
                          item.department || !item.department === undefined
                            ? item?.department
                            : "-"
                        }
                        style={{ maxWidth: "100%" }}
                        className={`form-control`}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Name" className="form-label">
                        Status
                      </label>
                      <input
                        type="text"
                        id="department"
                        defaultValue={item?.is_active ? "Active" : "Inactive"}
                        style={{ maxWidth: "100%" }}
                        className={`form-control`}
                        readOnly={true}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Name" className="form-label">
                        Verification Status
                      </label>
                      <input
                        type="text"
                        id="department"
                        defaultValue={
                          item?.is_verified
                            ? "Verified"
                            : "Verification Pending"
                        }
                        style={{ maxWidth: "100%" }}
                        className={`form-control`}
                        readOnly={true}
                      />
                    </div>

                    <div className="col-md-6 mb-3"></div>

                    <div className="col-md-12 mb-3">
                      <label htmlFor="Skill" className="form-label">
                        Skills
                      </label>

                      <Controller
                        name="skills"
                        control={control}
                        defaultValue={
                          item.skills && item.skills[0] ? item.skills : "-"
                        } // Set default value as an empty array for a multi-select
                        render={({ field }) => (
                          <Select
                            value={
                              item.skills && item.skills[0] ? item.skills : "-"
                            }
                            isDisabled={true}
                            isMulti
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ViewUser;
