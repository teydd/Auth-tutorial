import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      setLocalError("Email and password are required.");
      return;
    }
    setLocalError("");
    try {
      const result = await login(email, password);
      if (result?.success) {
        navigate("/dashboard");
      } else {
        setLocalError(result?.message || "Login failed.");
      }
    } catch (err) {
      setLocalError(err.message || "Login failed.");
    }
  };

  return (
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
          placeholder="Email Address"
        />
        <br />
        <input
          onChange={handleChange}
          value={form.password}
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <Link to="/forgot-password" className="nav-link">
          <i>Forgot Password?</i>
        </Link>
        {(localError || error) && (
          <p style={{ color: "red" }}>{localError || error}</p>
        )}
        <hr />
        <button
          type="submit"
          className="btn btn-outline-success active w-100"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
