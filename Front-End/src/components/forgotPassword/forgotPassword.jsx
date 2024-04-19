import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  adminForgotPasswordAction,
  userForgotPasswordAction,
} from "../../Redux/Auth/AuthAction";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email address is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Must be a valid email with .com domain"
    ),
});

const ModalWithDrawer = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loading = useSelector((state) => state.auth.forgotPassword.loading);
  const location = useLocation();
  const dispatch = useDispatch();
  const adminUrl = location.pathname.includes("admin");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const onComplete = (response) => {
    closeModal();
    toast.success(response.data.message);
    reset();
  };
  const onError = (response) => {
    toast.error(response.data.message);
  };
  const onClickButton = (data) => {
    if (adminUrl) {
      dispatch(
        adminForgotPasswordAction({
          functions: {
            onComplete: onComplete,
            formData: data,
            onError,
          },
        })
      );
    } else {
      dispatch(
        userForgotPasswordAction({
          functions: {
            onComplete: onComplete,
            formData: data,
            onError,
          },
        })
      );
    }
  };

  return (
    <div>
      <span onClick={openModal} style={{ cursor: "pointer" }}>
        <NavLink>Forgot password</NavLink>
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
                  Forgot Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className="row gy-3 overflow-hidden">
                  <div className="mb-1">
                    <label htmlFor="password" className="form-label">
                      Email{" "}
                      <span
                        style={{ fontSize: "1.2em" }}
                        className="text-danger"
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Please enter email"
                      {...register("email")}
                      onKeyDown={(e) => {
                        if (e.key === " ") e.preventDefault();
                      }}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>
                {/* </form> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  style={{ width: "100px" }}
                  onClick={handleSubmit(onClickButton)}
                  type="submit"
                  className="btn btn-primary"
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </>
                  ) : (
                    "Submit"
                  )}
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

export default ModalWithDrawer;
