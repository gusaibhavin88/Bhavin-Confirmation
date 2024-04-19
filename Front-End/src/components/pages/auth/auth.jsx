import logo from "../../../assets/butterfly.png";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAdminAction,
  loginUserAction,
  signupUserAction,
  verifyUserAction,
} from "../../../Redux/Auth/AuthAction";
import { useNavigate, useLocation } from "react-router-dom";
import defaultImage from "../../../assets/profileImg.webp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalWithDrawer from "../../forgotPassword/forgotPassword";
import { faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email address is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Must be a valid email with .com domain"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
      "Password must be at least 8 characters with an uppercase letter and a special character"
    ),
});

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email address is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Must be a valid email with .com domain"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
      "Password must be at least 8 characters with an uppercase letter and a special character"
    ),
  last_name: yup.string().required("Last name is required"),
  first_name: yup.string().required("First name is required"),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  contact_number: yup
    .string()
    .required("Contact number is required")
    .min(10, "Contact must be at least 10 characters")
    .max(13, "Contact must not exceed 13 characters")
    .matches(/^[0-9+-]+$/, "Contact can only contain numbers, +, and -")
    .nullable(),
});

const Auth = () => {
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state?.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const adminUrl = location.pathname.includes("admin");
  const signUp = location.pathname.includes("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signUp ? signUpSchema : loginSchema),
  });
  const onComplete = (response) => {
    if (!signUp) {
      if (response.data.data.user.role === "admin") {
        toast.success(response.data.message);
        navigate("/admin/dashboard");
      } else {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } else {
      reset();
      toast.success(response.data.message);
      navigate("/signin");
      setProfile("");
    }
  };
  const onError = (response) => {
    toast.error(response.data.message);
  };
  const onSubmit = (data) => {
    if (!signUp) {
      if (adminUrl) {
        dispatch(
          loginAdminAction({
            functions: {
              onComplete: onComplete,
              formData: data,
              onError,
            },
          })
        );
      } else {
        dispatch(
          loginUserAction({
            functions: {
              onComplete: onComplete,
              formData: data,
              onError,
            },
          })
        );
      }
    } else {
      const myForm = new FormData();
      for (const key in data) {
        myForm.append(key, data[key]);
      }
      // console.log([...myForm.entries()]);
      myForm.append("profile_image", previewProfile);
      dispatch(
        signupUserAction({
          functions: {
            onComplete: onComplete,
            formData: myForm,
            onError,
          },
        })
      );
    }
  };

  const onImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = await e.target.files[0];
      if (img) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setProfile(reader.result);
            setPreviewProfile(img);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  // Useffect
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "user") {
      navigate("/dashboard");
    }
  }, []);
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
                        <h3>{signUp ? "Sign Up" : "Sign In"}</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row gy-3 overflow-hidden">
                      {signUp && (
                        <>
                          <div class="mb-1">
                            <label for="firstName" class="form-label">
                              First Name{" "}
                              <span
                                style={{ fontSize: "1.2em" }}
                                className="text-danger"
                              >
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              class={`form-control ${
                                errors.first_name ? "is-invalid" : ""
                              }`}
                              placeholder="Enter your first name"
                              {...register("first_name")}
                              onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                              }}
                            />

                            {errors.first_name && (
                              <div className="invalid-feedback">
                                {errors.first_name.message}
                              </div>
                            )}
                          </div>
                          <div class="mb-1">
                            <label for="lastName" class="form-label">
                              Last Name{" "}
                              <span
                                style={{ fontSize: "1.2em" }}
                                className="text-danger"
                              >
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              class={`form-control ${
                                errors.last_name ? "is-invalid" : ""
                              }`}
                              id="last_name"
                              placeholder="Enter your last name"
                              {...register("last_name")}
                              onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                              }}
                            />

                            {errors.last_name && (
                              <div className="invalid-feedback">
                                {errors.last_name.message}
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="mb-1">
                        <label htmlFor="email" className="form-label">
                          Email Address{" "}
                          <span
                            style={{ fontSize: "1.2em" }}
                            className="text-danger"
                          >
                            *
                          </span>
                        </label>

                        <input
                          type="text"
                          class={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          placeholder="name@example.com"
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

                      {signUp && (
                        <div class="mb-1">
                          <label for="contactNumber" class="form-label">
                            Contact Number{" "}
                            <span
                              style={{ fontSize: "1.2em" }}
                              className="text-danger"
                            >
                              *
                            </span>
                          </label>{" "}
                          <input
                            type="number"
                            class={`form-control ${
                              errors.contact_number ? "is-invalid" : ""
                            }`}
                            id="contact_number"
                            placeholder="Enter your contact number"
                            {...register("contact_number")}
                            onKeyDown={(e) => {
                              if (
                                !(
                                  (e.key >= "0" && e.key <= "9") ||
                                  e.key === "Backspace" ||
                                  e.key === "Tab" ||
                                  e.key === "+" ||
                                  e.key === "-"
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.contact_number && (
                            <div className="invalid-feedback">
                              {errors.contact_number.message}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mb-1">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>{" "}
                        <span
                          style={{ fontSize: "1.2em" }}
                          className="text-danger"
                        >
                          *
                        </span>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            id="password"
                            placeholder="Password"
                            {...register("password")}
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
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password.message}
                            </div>
                          )}
                        </div>
                      </div>
                      {signUp && (
                        <div class="mb-1">
                          <label for="confirmPassword" class="form-label">
                            Confirm Password
                          </label>{" "}
                          <span
                            style={{ fontSize: "1.2em" }}
                            className="text-danger"
                          >
                            *
                          </span>
                          <div className="input-group">
                            <input
                              type={showConPassword ? "text" : "password"}
                              class={`form-control ${
                                errors.confirm_password ? "is-invalid" : ""
                              }`}
                              id="confirm_password"
                              placeholder="Confirm your password"
                              {...register("confirm_password")}
                              onKeyDown={(e) => {
                                if (e.key === " ") e.preventDefault();
                              }}
                            />

                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() =>
                                setShowConPassword(!showConPassword)
                              } // Toggle showPassword state
                            >
                              <FontAwesomeIcon
                                icon={showConPassword ? faEyeSlash : faEye}
                              />
                            </button>
                            {errors.confirm_password && (
                              <div className="invalid-feedback">
                                {errors.confirm_password.message}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {signUp && (
                        <>
                          <div
                            class="mb-1 
"
                          >
                            <label for="profile_image" class="form-label">
                              Profile Image
                            </label>
                            <div class="mb-2 d-flex  text-center align-middle  align-items-center gap-4">
                              <div class="d-flex r justify-content-center align-items-center">
                                <img
                                  id="selected_image"
                                  src={profile ? profile : defaultImage}
                                  alt="example placeholder"
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </div>

                              <div class="d-flex justify-content-center align-items-center ">
                                <div
                                  data-mdb-button-init
                                  data-mdb-ripple-init
                                  class="btn btn-primary btn-rounded"
                                  style={{
                                    width: "120px",
                                    display: "flex",
                                    height: "40px",
                                    padding: "5px",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  <label
                                    class="form-label text-white m-1"
                                    for="customFile1"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  >
                                    Choose file
                                  </label>
                                  <input
                                    type="file"
                                    class="form-control d-none"
                                    id="customFile1"
                                    accept="image/*"
                                    onChange={onImageChange}
                                  />
                                  {errors.password && (
                                    <div className="invalid-feedback">
                                      {errors.password.message}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {profile && (
                              <div
                                style={{
                                  position: "relative",
                                  top: -70,
                                  left: 30,
                                  display: profile ? "flex" : "none",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                  backgroundColor: "lightgray",
                                  cursor: "pointer",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={profile ? faTrash : ""}
                                  onClick={() => setProfile("")}
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    color: "#B22222",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {!signUp && (
                        <div class="col-12">
                          <div class="form-check d-flex justify-content-between">
                            <div>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                name="remember_me"
                                id="remember_me"
                                {...register("remember_me")}
                              />
                              <label
                                class="form-check-label text-secondary"
                                for="remember_me"
                              >
                                Keep me logged in
                              </label>
                            </div>
                            <ModalWithDrawer />
                          </div>
                        </div>
                      )}

                      <div class="col-12">
                        <div class="d-grid">
                          <button
                            class="btn btn-primary btn-lg"
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
                            ) : signUp ? (
                              "Sign Up"
                            ) : (
                              "Sign In"
                            )}
                          </button>
                        </div>
                      </div>
                      {!adminUrl && !signUp && (
                        <p>
                          Don't have an account? <a href="/signup">Sign up</a>
                        </p>
                      )}
                      {!adminUrl && signUp && (
                        <p>
                          Already have an account? <a href="/signin">Sign in</a>
                        </p>
                      )}
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

export default Auth;
