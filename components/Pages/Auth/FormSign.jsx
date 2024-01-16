"use client";

import React, { useEffect, useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

export default function FormSign() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".containerA7")?.classList.add("sign-in");
    }, 200);
  }, []);
  const handleToggle = () => {
    document.querySelector(".containerA7")?.classList.toggle("sign-in");
    document.querySelector(".containerA7")?.classList.toggle("sign-up");
  };
  return (
    <div id="containerA7" className="containerA7 w-full">
      <div className="row">
        <Signup handleToggle={handleToggle} />
        <Signin handleToggle={handleToggle} />
      </div>
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome back</h2>
            <p className="hidden">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
              obcaecati, accusantium molestias, laborum, aspernatur deserunt
              officia voluptatum tempora dicta quo ab ullam. Assumenda enim
              harum minima possimus dignissimos deserunt rem.
            </p>
          </div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">

          <div className="text sign-up">
            <h2>Join us</h2>
            <p className="hidden">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
              obcaecati, accusantium molestias, laborum, aspernatur deserunt
              officia voluptatum tempora dicta quo ab ullam. Assumenda enim
              harum minima possimus dignissimos deserunt rem.
            </p>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
    </div>
  );
}
