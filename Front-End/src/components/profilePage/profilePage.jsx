import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import defaultImage from "../../assets/profileImg.webp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import data from "../../assets/data.json";
import Select from "react-select";
import {
  getSkillListAction,
  userProfileGetAction,
  userProfileUpdateAction,
} from "../../Redux/User/UserAction";
import {
  adminProfileGetAction,
  adminProfileUpdateAction,
} from "../../Redux/Admin/AdminAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { clearUser, logOut } from "../../Redux/Auth/AuthSlice";
const apiUrl = import.meta.env.VITE_BASE_URL;

const userSchema = yup.object().shape({
  last_name: yup.string().required("Last name is required"),
  first_name: yup.string().required("First name is required"),
  contact_number: yup
    .string()
    .required("Contact number is required")
    .min(10, "Contact must be at least 10 characters")
    .max(13, "Contact must not exceed 13 characters")
    .matches(/^[0-9+-]+$/, "Contact can only contain numbers, +, and -")
    .nullable(),
});
const adminSchema = yup.object().shape({
  last_name: yup.string().required("Last name is required"),
  first_name: yup.string().required("First name is required"),
});

const ProfilePage = () => {
  const loading = useSelector((state) => state.user.profile.loading);
  const user = useSelector((state) => state?.auth.user);
  const skills = useSelector((state) => state?.user.skillList.skills);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const adminUrl = location.pathname.includes("admin");
  const [mode, setMode] = useState("view");
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [customSkill, setCustomSkill] = useState("");

  if (user?.role === "admin" && !adminUrl) {
    navigate("/signin");
  }
  if (!user?.role === "admin" && adminUrl) {
    navigate("/admin/signin");
  }

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(adminUrl ? adminSchema : userSchema),
  });
  const onComplete = (response, isRequired, type) => {
    if (!isRequired) {
      toast.success(response.data.message);
    }
    if (type === "update") {
      if (adminUrl) {
        dispatch(
          adminProfileGetAction({
            functions: {},
          })
        );

        setMode("view");
      } else {
        dispatch(
          userProfileGetAction({
            functions: {},
          })
        );
        setMode("view");
        dispatch(
          getSkillListAction({
            functions: {
              onComplete: onComplete,
              onError,
            },
          })
        );
      }
    }
  };
  const onError = (response) => {
    toast.error(response.data.message);
  };
  const onSubmit = (data) => {
    const myForm = new FormData();
    for (const key in data) {
      myForm.append(key, data[key]);
    }
    myForm.append("profile_image", previewProfile);

    if (selectedSkills && selectedSkills?.[0]) {
      myForm.append("skills", JSON.stringify(selectedSkills));
    } else {
      myForm.delete("skills");
    }
    if (!profile) {
      myForm.delete("profile_image");
    }

    // console.log([...myForm.entries()]);

    if (adminUrl) {
      dispatch(
        adminProfileUpdateAction({
          functions: {
            onComplete: onComplete,
            formData: myForm,
            onError,
          },
        })
      );
    } else {
      dispatch(
        userProfileUpdateAction({
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
        // await userSchema.validate({ image: img });

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

  ///   react select

  const handleChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };

  const handleInputChange = (newValue) => {
    setCustomSkill(newValue);
  };

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0)?.toUpperCase() + string.slice(1);
  };

  const handleCreateOption = () => {
    if (
      customSkill.trim() !== "" &&
      !skills?.some(
        (option) =>
          option.label.toLowerCase() === customSkill.trim().toLowerCase()
      )
    ) {
      if (selectedSkills === null) {
        setSelectedSkills([
          {
            label: capitalizeFirstLetter(customSkill.trim()),
            value: customSkill.trim(),
          },
        ]);
      } else {
        setSelectedSkills([
          ...selectedSkills,
          {
            label: capitalizeFirstLetter(customSkill.trim()),
            value: customSkill.trim(),
          },
        ]);
      }
      setCustomSkill("");
    }
  };

  // Useffect
  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    } else if (user?.role === "admin" && !adminUrl) {
      dispatch(logOut());
      navigate("/admin/signin?logout=true");
    } else if (user?.role === "user" && adminUrl) {
      dispatch(logOut());
      navigate("/signin?logout=true");
    }
  }, []);

  useEffect(() => {
    dispatch(
      getSkillListAction({
        functions: {
          onComplete: onComplete,
          onError,
        },
      })
    );
  }, []);

  useEffect(() => {
    if (adminUrl) {
      dispatch(
        adminProfileGetAction({
          functions: {},
        })
      );
    } else {
      dispatch(
        userProfileGetAction({
          functions: {},
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        if (key === "skills") {
          setSelectedSkills(user[key]);
        } else {
          setValue(key, user[key]);
        }
      });
      if (user?.profile_image) {
        setProfile(`${apiUrl}/${user?.profile_image}`);
      }
    }
  }, [user]);

  return (
    <div class="card-body px-3 px-md-7 px-xl-4" style={{ marginTop: "-15px" }}>
      <div class="row">
        <div class="d-flex justify-content-between">
          <div class="mb-4 col-5">
            <h3>View Profile</h3>
          </div>
          {mode === "view" && (
            <div class="m-2">
              <button
                class="btn btn-primary  btn-lg"
                onClick={() => setMode("edit")}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gy-3 overflow-hidden">
          <div className={"mb-3 " + (!adminUrl ? "col-md-6" : "col-md-12")}>
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="name@example.com"
              {...register("email")}
              readOnly
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          {!adminUrl && (
            <>
              <div className="col-md-6 mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  Contact Number
                </label>
                <input
                  type="Number"
                  className={`form-control ${
                    errors.contact_number ? "is-invalid" : ""
                  }`}
                  id="contact_number"
                  placeholder="Enter your contact number"
                  {...register("contact_number")}
                  readOnly={mode === "view" ? true : false}
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
            </>
          )}
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              style={{ maxWidth: "100%" }}
              className={`form-control ${
                errors.first_name ? "is-invalid" : ""
              }`}
              placeholder="Enter your first name"
              {...register("first_name")}
              readOnly={mode === "view" ? true : false}
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
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
              id="last_name"
              readOnly={mode === "view" ? true : false}
              placeholder="Enter your last name"
              {...register("last_name")}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
            {errors.last_name && (
              <div className="invalid-feedback">{errors.last_name.message}</div>
            )}
          </div>
          {!adminUrl && (
            <>
              <div className="col-md-6 mb-3">
                <label htmlFor="Gender" className="form-label">
                  Gender
                </label>
                <select
                  class="form-select "
                  aria-label="Default select example"
                  {...register("gender")}
                  disabled={mode === "view" ? true : false}
                >
                  <option selected disabled>
                    Select Gender
                  </option>
                  {data.gender.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Department" className="form-label">
                  Department
                </label>
                <select
                  className="form-select"
                  aria-label="Select Department"
                  {...register("department")}
                  disabled={mode === "view" ? true : false}
                >
                  <option value="" selected disabled>
                    Select Department
                  </option>
                  {data.departments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Skill" className="form-label">
                  Skills
                </label>
                <Controller
                  name="skills"
                  control={control}
                  defaultValue={selectedSkills} // Set default value as an empty array for a multi-select
                  render={({ field }) => (
                    <Select
                      value={selectedSkills}
                      onKeyDown={(e) => {
                        if (e.key === " ") e.preventDefault();
                      }}
                      isDisabled={mode === "view" ? true : false}
                      isMulti
                      onChange={handleChange}
                      options={skills?.concat({
                        label: capitalizeFirstLetter(customSkill),
                        value: customSkill,
                      })}
                      onInputChange={handleInputChange}
                      onCreateOption={handleCreateOption}
                    />
                  )}
                />
              </div>
            </>
          )}
          {!adminUrl && <div className="col-md-6 mb-3"></div>}

          <div className="col-md-6 mb-3">
            <label htmlFor="profile_image" className="form-label">
              Profile Image
            </label>
            <div className="mb-2 d-flex text-center align-middle align-items-center gap-4">
              <div className="d-flex r justify-content-center align-items-center">
                <img
                  id="selected_image"
                  src={profile ? profile : defaultImage}
                  alt="example placeholder"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </div>

              {mode === "edit" && (
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-rounded"
                    style={{
                      width: "120px",
                      display: "flex",
                      height: "40px",
                      padding: "5px",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: mode === "view" ? "#999" : "",
                      borderColor: mode === "view" ? "#999" : "",
                      color: mode === "view" ? "#fff" : "",
                      cursor: "pointer",
                    }}
                  >
                    <label
                      className="form-label text-white m-1 cursor-pointer"
                      htmlFor="customFile1"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Choose file
                    </label>

                    <input
                      type="file"
                      class="form-control d-none cursor-pointer" // Add 'disabled' class here
                      id="customFile1"
                      accept="image/*"
                      onChange={onImageChange}
                      disabled={mode === "view" ? true : false}
                    />
                    {errors.image && (
                      <div className="invalid-feedback">
                        {errors.image.message}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {mode === "edit" && (
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

          {mode === "edit" && (
            <div className="col-12">
              <div className="d-grid d-flex">
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  disabled={loading}
                  style={{ width: "150px", marginTop: "-30px" }}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
