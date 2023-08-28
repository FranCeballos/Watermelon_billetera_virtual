import { redirect } from "react-router-dom";

export const checkAuthLoader = () => {
  const token = localStorage.getItem("token");
  console.log("token check", token);
  if (!token) {
    return redirect("/auth");
  }
  return null;
};
