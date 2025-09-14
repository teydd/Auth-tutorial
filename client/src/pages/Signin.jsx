import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading, error } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const { email, password } = form;
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard")
  };
  return (
    <>
      <div className="align-items-center justify-content-center d-flex mt-5 ">
        <form onSubmit={handleSubmit} className="form p-5 rounded-4">
          <p className="text-center">Sign in to your account</p>
          <hr />
          <input
            onChange={handleChange}
            value={form.email}
            className="form-control"
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
          />
          <br />
          <input
            onChange={handleChange}
            value={form.password}
            className="form-control mb-3"
            type="password"
            name="password"
            id=""
            placeholder="Enter Password"
          />
          <a href="/forgot-password" className="nav-link">
            <i>Forgot Password?</i>
          </a>
          {error && <p>{error}</p>}
          <hr />
          <button
            type="submit"
            className="btn  btn-outline-success active  w-100"
          >
            Sign in
          </button>
          <hr />
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
}
