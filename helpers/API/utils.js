"use client";

export const getAuthToken = () => {
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("USER_DATA"))?.token;
  }
  return user;
};
export const getLangCode = () => {
  return (
    (typeof window !== "undefined" && localStorage.getItem("language")) || "en"
  );
};
