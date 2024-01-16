import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Signup({ handleToggle }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const authLoading = useSelector((state) => state?.AuthReducer?.authLoading);
  const handleChange = (event) => {
    const { name, value } = event;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit =  (e) => {
    e.preventDefault(); // handleCheckErrors(e)
    // if (formData) {
    // dispatch({ type: "REGISTER", payload: { formData } });
    // }
    // console.log(formData, "formData");
  };
  const handleCheckErrors = (event) => {
    const { name, value } = event.target;
    let newErrors = { ...errors };

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.match(emailRegex)) {
          newErrors[name] = "Invalid email address";
        } else {
          delete newErrors[name];
        }
        break;

      case "name":
        if (value.length < 3) {
          newErrors[name] = "Name must be at least 3 characters";
        } else {
          delete newErrors[name];
        }
        break;

      case "password":
        if (value.length < 6) {
          newErrors[name] = "Password must be at least 6 characters";
        } else {
          delete newErrors[name];
        }
        break;

      case "confirmPassword":
        if (value !== formData.password) {
          newErrors[name] = "Passwords do not match";
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };
  return (
    <div className=" col align-items-center flex-col sign-up">
      <div className="form-wrapper align-items-center">
        <form className="form sign-up" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="bx bxs-user" />
            <input
              name="name"
              onChange={(e) => handleChange(e.target)}
              type="text"
              placeholder="Username"
            />
            {errors?.name && <small>{errors?.name}</small>}
          </div>
          <div className="input-group">
            <i className="bx bx-mail-send" />
            <input
              name="email"
              onChange={(e) => handleChange(e.target)}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt" />
            <input
              name="password"
              onChange={(e) => handleChange(e.target)}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt" />
            <input
              name="confirmPassword"
              onChange={(e) => handleChange(e.target)}
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <button type="submit">
            {authLoading ? "loading..." : "Sign up"}
          </button>
          <p>
            <span>Already have an account?</span>
            <b onClick={handleToggle} className="pointer">
              Sign in here
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}
