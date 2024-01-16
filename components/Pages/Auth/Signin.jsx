import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { PiEyeThin, PiEyeClosed } from 'react-icons/pi';
import {_login} from "store/actions/auth";
import Cookies from "js-cookie";
import {redirect, useRouter} from "next/navigation";


export default function Signin({ handleToggle }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const authLoading = useSelector((state) => state?.AuthReducer?.authLoading);
  const router = useRouter()
  const handleChange = (event) => {
    const { name, value } = event;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));

  };
  const validateFormData = (data) => {
    const errors = {};
    if (!data.email) {
      errors.email = 'Email This Field is required.';
    }
    if (!data.password) {
      errors.password = 'Password is required.';
    } else if (data.password.length < 8) {
      errors.password = 'Password should be at least 8 characters long.';
    }
    return errors;
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      _login(formData,
          (res) => {
        if (res?.user) {
          if (typeof window !== "undefined") {
            localStorage.setItem(
                "USER_DATA",
                JSON.stringify({
                  user: res?.user,
                })
            );
          }
          Cookies.set("token", res?.user?.api_token);
          Cookies.set("user", JSON.stringify({user: res?.user}));
          router.push("/")
          // redirect("/")
        }
      },
          (err) => {
      })
    }
  };
  return (
    <div className="col align-items-center flex-col sign-in">
      <div className="form-wrapper align-items-center">
        <form  onSubmit={handleSubmit} className="form sign-in">
          <div className="input-group">
            <i className="bx bxs-user" />
            <input
                onChange={(e) => handleChange(e.target)} name="email"  type="text" placeholder="Username" />
            {errors?.email && <small className="text-red-500">{errors?.email}</small>}
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt" />
            <input
                onChange={(e) => handleChange(e.target)} name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password" />
            <div
                className="eye-icon absolute w-6 h-6 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                  <PiEyeThin size={20} />
              ) : (
                  <PiEyeClosed size={20} />
              )}
            </div>

            {errors?.password && <small className="text-red-500">{errors?.password}</small>}
          </div>
          <button type="submit">
            {authLoading ? "loading..." : "Sign in"}
          </button>
          <p className="hidden">
            <b>Forgot password?</b>
          </p>
          <p className="hidden">
            <span>Don't have an account?</span>
            <b onClick={handleToggle} className="pointer">
              Sign up here
            </b>
          </p>
        </form>
      </div>
      <div className="hidden form-wrapper">
        <div className="hidden social-list align-items-center sign-in">
          <div className="align-items-center facebook-bg">
            <i className="bx bxl-facebook" />
          </div>
          <div className="align-items-center google-bg">
            <i className="bx bxl-google" />
          </div>
          <div className="align-items-center twitter-bg">
            <i className="bx bxl-twitter" />
          </div>
          <div className="align-items-center insta-bg">
            <i className="bx bxl-instagram-alt" />
          </div>
        </div>
      </div>
    </div>
  );
}
