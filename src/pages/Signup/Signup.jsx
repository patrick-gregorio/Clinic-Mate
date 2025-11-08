import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, usersDB } from "../../firebase-config";
import { ref, set } from "firebase/database";
import { NavLink } from "react-router";
import logo from "../../assets/logo/logo2.png";
import { motion as Motion } from "framer-motion";
import AuthModal from "../LogIn/AuthModal";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [hasNoMiddle, setHasNoMiddle] = useState(false);
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [othersValue, setOthersValue] = useState("");
  const [birthday, setBirthday] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function RegisterUser() {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = user.uid;
        const userData = {
          fullName: {
            firstName: firstName,
            middleName: hasNoMiddle ? "N/A" : middleName,
            lastName: lastName,
          },
          gender: gender,
          birthday: birthday,
          contact: contact,
          email: email,
          createdAt: new Date().toISOString(),
        };
        await set(ref(usersDB, `/users/${uid}`), userData);
        alert("User Successfully Registered: " + user.email);
      } catch (error) {
        let errorMessage = "Registration failed. Please try again.";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered.";
            document.getElementById("errEmail").innerHTML =
              "This email is already registered";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Operation not allowed.";
            break;
          default:
            errorMessage = error.message;
        }

        setErrorMessage(errorMessage);
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  }

  function validateFirstName(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errFirstName");
    err.innerHTML = "";
    setFirstName(null);
    if (!value) err.innerHTML = "First Name is required";
    else if (value.length < 3)
      err.innerHTML = "Must be at least 3 characters long";
    else setFirstName(value);
  }
  function validateMiddleName(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errMiddleName");
    err.innerHTML = "";
    setMiddleName(null);
    if (hasNoMiddle) {
      setMiddleName("N/A");
      return;
    }
    if (!value) err.innerHTML = "Middle Name is required";
    else if (value.length < 2)
      err.innerHTML = "Must be at least 2 characters long";
    else setMiddleName(value);
  }
  function validateLastName(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errLastName");
    err.innerHTML = "";
    setLastName(null);
    if (!value) err.innerHTML = "Last Name is required";
    else if (value.length < 2)
      err.innerHTML = "Must be at least 2 characters long";
    else setLastName(value);
  }
  function validateGender(e) {
    const value = e.target.value;
    const err = document.getElementById("errGender");
    err.innerHTML = "";
    setGender(null);

    if (!value) err.innerHTML = "Please select a gender";
    else if (value === "others") setGender("others");
    else {
      setGender(value);
      setOthersValue("");
    }
  }
  function validateBirthday(e) {
    const value = e.target.value;
    const err = document.getElementById("errBirthday");
    err.innerHTML = "";
    setBirthday(null);
    if (!value) {
      err.innerHTML = "Date of Birth is required";
    } else {
      const birthDate = new Date(value);
      const today = new Date();
      const birthDay = new Date(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );
      const todayMidnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      if (birthDay > todayMidnight)
        err.innerHTML = "Birthday cannot be in the future";
      else setBirthday(value);
    }
  }
  function validateContact(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errContact");
    err.innerHTML = "";
    setContact(null);
    if (!value) err.innerHTML = "Contact Number is required";
    else if (!/^09\d{9}$/.test(value))
      err.innerHTML = "enter a valid 11-digit phone number (09XXXXXXXXX)";
    else setContact(value);
  }
  function validateEmail(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errEmail");
    err.innerHTML = "";
    setEmail(null);
    if (!value) err.innerHTML = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      err.innerHTML = "enter a valid email address";
    else setEmail(value);
  }
  function validatePassword(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errPassword");
    err.innerHTML = "";
    setPassword(null);
    if (!value) err.innerHTML = "Password is required";
    else if (value.length < 8)
      err.innerHTML = "Must be at least 8 characters long";
    else if (!/[A-Z]/.test(value))
      err.innerHTML = "Must contain an uppercase letter";
    else if (!/[a-z]/.test(value))
      err.innerHTML = "Must contain at least one lowercase letter";
    else if (!/[0-9]/.test(value))
      err.innerHTML = "Password Must contain a number";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      err.innerHTML = "must contain at least one special character";
    else setPassword(value);
  }
  function validateConfirm(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errConfirm");
    err.innerHTML = "";
    setConfirm(null);
    if (!value) err.innerHTML = "Please confirm your password";
    else if (value !== password) err.innerHTML = "Passwords do not match";
    else setConfirm(value);
  }
  function handleNoMiddleChange(e) {
    const isChecked = e.target.checked;
    setHasNoMiddle(isChecked);
    const middleInput = document.querySelector('input[name="middleName"]');
    const err = document.getElementById("errMiddleName");
    if (isChecked) {
      middleInput.disabled = true;
      err.innerHTML = "";
      setMiddleName("N/A");
    } else {
      middleInput.disabled = false;
      setMiddleName("");
    }
  }
  function handleAgreeChange(e) {
    setAgree(e.target.checked);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // steps
  const isStep1Valid =
    firstName && lastName && (middleName || hasNoMiddle) && gender && birthday;
  const isStep2Valid = contact && email && password && confirm && agree;
  const isFormValid = isStep1Valid && isStep2Valid;
  const nextStep = () => {
    if (isStep1Valid) setCurrentStep(2);
  };
  const prevStep = () => {
    setCurrentStep(1);
  };

  return (
    <>
      {/* Use min-h-svh to play nicely with mobile browser chrome */}
      <div className="grid min-h-svh grid-cols-1 md:grid-cols-2 bg-[#E6F5FF]">
        {/* Left brand panel (hidden on mobile) */}
        <div className="relative hidden md:flex flex-col bg-[#0288D0]">
          <NavLink to="/login" className="absolute left-0 top-0">
            <p className="text-white text-lg md:text-2xl p-3">← Return</p>
          </NavLink>

          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <Motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 2 }}
            >
              <img
                className="w-48 md:w-64 lg:w-80"
                src={logo}
                alt="ClinicMate Logo"
              />
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 2 }}
            >
              <p className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
                ClinicMate
              </p>
            </Motion.div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex items-center justify-center  p-4 sm:p-6">
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full max-w-md sm:max-w-lg md:max-w-[520px] bg-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 space-y-4">
              {/* top (stepper) */}
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold">Sign Up</h1>
                <div className="flex justify-center mt-2 mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 1
                          ? "bg-[#0A8CD2] text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      1
                    </div>
                    <div
                      className={`w-12 sm:w-16 h-1 ${
                        currentStep >= 2 ? "bg-[#0A8CD2]" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= 2
                          ? "bg-[#0A8CD2] text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      2
                    </div>
                  </div>
                </div>
                <hr className="border-gray-200" />
              </div>

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full sm:w-1/2">
                      <label className="block font-semibold text-sm mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                        value={firstName}
                        onChange={validateFirstName}
                      />
                      <p
                        id="errFirstName"
                        className="text-red-500 text-[10px] h-4"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="block font-semibold text-sm mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                        onChange={validateLastName}
                        value={lastName}
                      />
                      <p
                        id="errLastName"
                        className="text-red-500 text-[10px] h-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-sm mb-1">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                      onChange={validateMiddleName}
                      disabled={hasNoMiddle}
                      value={hasNoMiddle ? "N/A" : middleName}
                    />
                    <p
                      id="errMiddleName"
                      className="text-red-500 text-[10px] h-4"
                    />
                    <label className="flex items-center gap-2 mt-2 text-sm">
                      <input
                        type="checkbox"
                        className="accent-[#0A8CD2]"
                        onChange={handleNoMiddleChange}
                      />
                      <span>I don't have a middle name</span>
                    </label>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">Gender</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="accent-[#0A8CD2]"
                          onChange={validateGender}
                          checked={gender === "male"}
                        />
                        <span>Male</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="accent-[#0A8CD2]"
                          onChange={validateGender}
                          checked={gender === "female"}
                        />
                        <span>Female</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="others"
                          className="accent-[#0A8CD2]"
                          onChange={validateGender}
                          checked={gender && gender.startsWith("others")}
                        />
                        <span>Others:</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Please specify"
                        maxLength={50}
                        className="border-b border-gray-300 px-2 py-1 outline-none focus:border-[#0A8CD2] text-[12px] w-40"
                        value={othersValue}
                        onChange={(e) => {
                          const value = e.target.value.trim();
                          if (value.length <= 50) {
                            setOthersValue(value);
                            setGender(value ? `others: ${value}` : "others");
                          }
                        }}
                      />
                    </div>
                    <p
                      id="errGender"
                      className="text-red-500 text-[10px] h-4"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-sm mb-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                        />
                      </svg>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2] text-gray-700"
                        placeholder="Select date"
                        onChange={validateBirthday}
                        value={birthday}
                      />
                    </div>
                    <p
                      id="errBirthday"
                      className="text-red-500 text-[10px] h-4"
                    />
                  </div>

                  <div className="pt-2 sm:pt-4 flex">
                    <button
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className={`w-full ml-auto sm:w-auto px-6 py-2 rounded-lg ${
                        isStep1Valid
                          ? "bg-[#0A4C6F] text-white hover:bg-[#083854] cursor-pointer"
                          : "bg-[#9EC2D3] text-[#E6EDF1] cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact & Account Information */}
              {currentStep === 2 && (
                <Motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-sm mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                        onChange={validateContact}
                        placeholder="09XXXXXXXXX"
                        inputMode="numeric"
                        value={contact}
                      />
                      <p
                        id="errContact"
                        className="text-red-500 text-[10px] h-4"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-sm mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                        onChange={validateEmail}
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                      />
                      <p
                        id="errEmail"
                        className="text-red-500 text-[10px] h-4"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-sm mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                          onChange={validatePassword}
                          autoComplete="new-password"
                          value={password}
                        />
                        <p
                          id="errPassword"
                          className="text-red-500 text-[10px] h-4"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-sm mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                          onChange={validateConfirm}
                          autoComplete="new-password"
                          value={confirm}
                        />
                        <p
                          id="errConfirm"
                          className="text-red-500 text-[10px] h-4"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-[#0A8CD2]"
                        onChange={handleAgreeChange}
                        checked={agree}
                      />
                      <span>
                        I agree to the{" "}
                        <span className="text-[#0288D0] underline cursor-pointer">
                          Terms &amp; Conditions
                        </span>
                      </span>
                    </label>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <div className="flex w-full sm:w-auto gap-3">
                        <button
                          onClick={prevStep}
                          className="w-32 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer text-center"
                        >
                          Back
                        </button>
                        {isFormValid && !isLoading ? (
                          <button
                            className="w-32 bg-[#0A4C6F] text-white rounded-lg px-5 py-2 hover:bg-[#083854] cursor-pointer text-center"
                            onClick={RegisterUser}
                          >
                            Sign Up
                          </button>
                        ) : isLoading ? (
                          <button
                            className="w-32 bg-[#0A4C6F] text-white rounded-lg px-5 py-2 cursor-not-allowed flex items-center justify-center"
                            disabled
                          >
                            <svg
                              className="animate-spin h-5 w-5 mr-3 text-white"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Signup...
                          </button>
                        ) : (
                          <button className="w-32 bg-[#9EC2D3] text-[#E6EDF1] rounded-lg px-5 py-2 cursor-not-allowed text-center">
                            Sign Up
                          </button>
                        )}
                      </div>

                      <div className="flex items-center  text-[12px] text-gray-500">
                        <span>Already Have an Account?</span>
                        <NavLink
                          to="/login"
                          className="text-[#0288D0] hover:underline cursor-pointer"
                        >
                          Log in
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </Motion.div>
              )}
            </div>
          </Motion.div>
        </div>
      </div>
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        errorMessage={errorMessage}
      />
    </>
  );
}
