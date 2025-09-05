import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verify } = useAuthStore();

  const handleChange = (index, value) => {
    const newcode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newcode[i] = pastedCode[i] || "";
      }
      setCode(newcode);

      const lastFiledIndex = newcode.findLastIndex((digit) => digit !== "");
      const focuseIndex = lastFiledIndex < 5 ? lastFiledIndex + 1 : 5;
      inputRefs.current[focuseIndex].focus();
    } else {
      newcode[index] = value;
      setCode(newcode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verify(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }

    try {
      await verifyEmail(verificationCode);
      navigate("/home");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <>
      <div className="align-items-center justify-content-center d-flex mt-5 container col-sm-7 col-md-4 col-lg-4">
        <form onSubmit={handleSubmit} className="form p-5 rounded-4">
          <label className="p-3" htmlFor="">
            Enter the 6 digit code sent to your email
          </label>
          <div className="d-flex ">
            {code.map((digit, index) => (
              <input
                type="text"
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="form-control m-1"
              />
            ))}
          </div>
          {error}
          <hr />
          <button
            type="submit"
            className="btn btn-lg btn-outline-success active w-100"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
