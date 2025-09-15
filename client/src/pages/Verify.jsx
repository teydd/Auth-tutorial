import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [localError, setLocalError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verify } = useAuthStore();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newcode = [...code];

    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newcode[i] = pastedCode[i] || "";
      }
      setCode(newcode);
      const lastFiledIndex = newcode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFiledIndex < 5 ? lastFiledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newcode[index] = value;
      setCode(newcode);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (!/^\d{6}$/.test(verificationCode)) {
      setLocalError("Please enter a valid 6-digit code.");
      return;
    }
    setLocalError("");
    try {
      await verify(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (err) {
      setLocalError(err.message || "Verification failed.");
    }
  };

  return (
    <div className="align-items-center justify-content-center d-flex mt-5 container col-sm-7 col-md-4 col-lg-4">
      <form onSubmit={handleSubmit} className="form p-5 rounded-4">
        <label className="p-3">
          Enter the 6 digit code sent to your email
        </label>
        <div className="d-flex ">
          {code.map((digit, index) => (
            <input
              type="text"
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="form-control m-1 text-center"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>
        {(localError || error) && (
          <p style={{ color: "red" }}>{localError || error}</p>
        )}
        <hr />
        <button
          type="submit"
          className="btn btn-lg btn-outline-success active w-100"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
