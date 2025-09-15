import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, error } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    name: "",
    tel: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, tel } = form;
    // Basic validation
    if (!email || !password || !name || !tel) {
      setLocalError("All fields are required.");
      return;
    }
    setLocalError("");
    setLoading(true);
    try {
      await signup(email, password, name, tel); // Pass tel if needed
      navigate("/verify");
    } catch (error) {
      setLocalError(error.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form onSubmit={handleSubmit} className="form p-5 rounded-4">
        <p className="text-center">Sign up and have an account</p>
        <hr />
        <input
          onChange={handleOnchange}
          value={form.email}
          className="form-control"
          type="email"
          name="email"
          placeholder="Email Address"
        />
        <br />
        <input
          onChange={handleOnchange}
          value={form.name}
          className="form-control"
          type="text"
          name="name"
          placeholder="Name"
        />
        <br />
        <input
          onChange={handleOnchange}
          value={form.tel}
          className="form-control"
          type="tel"
          name="tel"
          placeholder="Phone number"
        />
        <br />
        <input
          onChange={handleOnchange}
          value={form.password}
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter Password"
        />
        <br />
        {(localError || error) && (
          <p style={{ color: "red" }}>{localError || error}</p>
        )}
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
        <hr />
        <p>
          Already have an account? <Link to="/signin">Signin</Link>
        </p>
      </form>
    </div>
  );
}
