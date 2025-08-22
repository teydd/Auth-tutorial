import React, { useState } from "react";

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted successfully");
  };
  return (
    <div className="align-items-center justify-content-center d-flex mt-5 ">
      <form onSubmit={handleSubmit} className="form p-5 rounded-4">
        <label className="p-3" htmlFor="">
          Enter email associated with the account
        </label>
        <input
          onChange={handleChange}
          value={form.email}
          className="form-control"
          type="email"
          name="email"
          id=""
          placeholder="Your Email Address"
        />
        <br />
        <hr />
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
