import logo from "../../assets/butterfly.png";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  adminResetPasswordAction,
  userResetPasswordAction,
} from "../../Redux/Auth/AuthAction";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const resetPasswordSchema = yup.object().shape({
  new_password: yup
    .string()
    .required("New password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
      "Password must be at least 8 characters with an uppercase letter and a special character"
    ),
  confirm_new_password: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const loading = useSelector((state) => state.auth.resetPassword.loading);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminUrl = location.pathname.includes("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const onComplete = (response) => {
    if (adminUrl) {
      toast.success(response.data.message);
      navigate("/admin/signin");
    } else {
      toast.success(response.data.message);
      navigate("/signin");
    }
    reset();
  };
  const onError = (response) => {
    toast.error(response.data.message);
  };
  const onSubmit = (data) => {
    data = { ...data, token: token, email: email };
    if (adminUrl) {
      dispatch(
        adminResetPasswordAction({
          functions: {
            onComplete: onComplete,
            formData: data,
            onError,
          },
        })
      );
    } else {
      dispatch(
        userResetPasswordAction({
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
    <div class=" bg-primary vh-100 d-grid">
      <section class="d-flex bg-primary py-3 py-md-5 py-xl-8 align-items-center">
        <div class="container">
          <div class="row gy-4 align-items-center">
            <div class="col-12 col-md-6 col-xl-7">
              <div class="d-flex justify-content-center text-bg-primary">
                <div class="col-12 col-xl-9 ">
                  <img
                    class="img-fluid rounded "
                    loading="lazy"
                    src={logo}
                    width="200"
                    height="200"
                    alt="BootstrapBrain Logo"
                  />
                  <hr class="border-primary-subtle mb-4 " />
                  <h2 class="h1 mb-4">
                    We make digital products that drive you to stand out.
                  </h2>
                  <p class="lead mb-5">
                    We write words, take photos, make videos, and interact with
                    artificial intelligence.
                  </p>
                  <div class="text-endx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      class="bi bi-grip-horizontal"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xl-5">
              <div class="card border-0 rounded-4">
                <div class="card-body p-3 p-md-4 p-xl-5">
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-4">
                        <h3>Reset Password</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="mb-1">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          type="email"
                          class={`form-control `}
                          id="email"
                          value={email ? email : ""}
                          placeholder="name@example.com"
                          {...register("email")}
                          readOnly
                          onKeyDown={(e) => {
                            if (e.key === " ") e.preventDefault();
                          }}
                        />
                      </div>
                      <div className="mb-1">
                        <label htmlFor="newPassword" className="form-label">
                          New Password{" "}
                          <span
                            style={{ fontSize: "1.2em" }}
                            className="text-danger"
                          >
                            *
                          </span>
                        </label>

                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${
                              errors.new_password ? "is-invalid" : ""
                            }`}
                            id="newPassword"
                            placeholder="New password"
                            {...register("new_password")}
                            onKeyDown={(e) => {
                              if (e.key === " ") e.preventDefault();
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </button>
                          {errors.new_password && (
                            <div className="invalid-feedback">
                              {errors.new_password.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="confirmNewPassword"
                          className="form-label"
                        >
                          Confirm New Password{" "}
                          <span
                            style={{ fontSize: "1.2em" }}
                            className="text-danger"
                          >
                            *
                          </span>
                        </label>{" "}
                        <div className="input-group">
                          <input
                            type={showConfPassword ? "text" : "password"}
                            className={`form-control ${
                              errors.confirm_new_password ? "is-invalid" : ""
                            }`}
                            id="confirm_new_password"
                            placeholder="Confirm new password"
                            {...register("confirm_new_password")}
                            onKeyDown={(e) => {
                              if (e.key === " ") e.preventDefault();
                            }}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              setShowConfPassword(!showConfPassword)
                            }
                          >
                            <FontAwesomeIcon
                              icon={showConfPassword ? faEyeSlash : faEye}
                            />
                          </button>
                          {errors.confirm_new_password && (
                            <div className="invalid-feedback">
                              {errors.confirm_new_password.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                            disabled={loading}
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
                      <p>
                        Don’t want to reset your password?
                        <a href={adminUrl ? "/admin/signin" : "/signin"}>
                          {" "}
                          Sign in
                        </a>
                      </p>
                    </div>
                  </form>

                  <div class="row">
                    <div class="col-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
