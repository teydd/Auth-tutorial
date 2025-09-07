import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import Verify from "./pages/Verify";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

function App() {
  const {isCheckingAuth,checkAuth,isAuthenticated,user} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log("isAuthenticated",isAuthenticated)
  console.log("user",user)
  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route
            path="/reset-password"
            element={<PasswordReset></PasswordReset>}
          ></Route>
          <Route path="/verify" element={<Verify></Verify>}></Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
