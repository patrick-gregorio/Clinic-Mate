import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import { NavLink } from "react-router";
import AuthModal from "./AuthModal";
import { motion as Motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import logo from "../../assets/logo/logo2.png";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!cooldown) return;

    const intervalId = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [cooldown]);

  function validateEmail(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errEmail");
    err.innerHTML = "";
    setEmail(null);
    setSuccessMessage("");

    if (!value) {
      err.innerHTML = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      err.innerHTML = "Enter a valid email address";
    } else {
      setEmail(value);
    }
  }

  function sendResetEmail() {
    const err = document.getElementById("errEmail");
    err.innerHTML = "";
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      err.innerHTML = "Email is required";
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setSuccessMessage(
            "If an account exists for this email, we sent a password reset link."
          );
          setCooldown(30);
        })
        .catch((error) => {
          let message =
            "We couldn't send the reset email. Please try again later.";

          switch (error.code) {
            case "auth/invalid-email":
              message = "Invalid email address.";
              err.innerHTML = "Invalid email address";
              break;
            case "auth/user-not-found":
              message = "No account found with this email.";
              err.innerHTML = "No account found with this email";
              break;
            case "auth/too-many-requests":
              message =
                "Too many attempts. Please try again later or contact support.";
              break;
            default:
              message = error.message;
          }

          setErrorMessage(message);
          setIsModalOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 3000);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid min-h-svh grid-cols-1 md:grid-cols-2 ">
        <div className="relative hidden md:flex flex-col bg-[#0288D0]">
          <NavLink to="/" className="absolute left-0 top-0">
            <p className="text-white text-md md:text-xl p-3">
              ← Back to Homepage
            </p>
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

        <AnimatePresence>
          <div className="min-h-screen flex items-center justify-center bg-[#E6F5FF]">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="w-[420px] max-w-md bg-white rounded-2xl shadow-xl px-8 py-8">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Reset Password
                  </h1>
                  <p className="mt-3 text-sm text-gray-500">
                    Enter the email associated with your account, and we&apos;ll
                    email you the verification link to reset your password.
                  </p>

                  <div className="mt-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      onChange={validateEmail}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                      placeholder="you@example.com"
                      disabled={isLoading}
                    />
                    <p
                      id="errEmail"
                      className="text-red-500 text-[12px] h-4 mt-1"
                    ></p>
                  </div>

                  {successMessage && (
                    <p className="mt-1 text-[12px] text-green-600">
                      {successMessage}
                    </p>
                  )}

                  <div className="mt-5 text-center">
                    {" "}
                    {cooldown > 0 && (
                      <p className="mt-1 text-[12px] text-gray-500">
                        You can request another link in{" "}
                        <span className="font-bold text-black">
                          {" "}
                          {cooldown}s.
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    {email && cooldown === 0 && !isLoading ? (
                      <button
                        onClick={sendResetEmail}
                        className="w-full rounded-lg bg-[#0A4C6F] hover:bg-[#083854] text-white text-sm font-medium py-2.5 transition-colors cursor-pointer"
                      >
                        Send Verification Link
                      </button>
                    ) : isLoading ? (
                      <button
                        className="w-full rounded-lg bg-[#0A4C6F] text-white text-sm font-medium py-2.5 cursor-not-allowed flex items-center justify-center"
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
                        Sending link...
                      </button>
                    ) : (
                      <button
                        className="w-full rounded-lg bg-[#9EC2D3] text-[#E6EDF1] text-sm font-medium py-2.5 cursor-not-allowed"
                        disabled
                      >
                        Send Verification Link
                      </button>
                    )}
                  </div>

                  <p className="mt-4 text-center text-[12px] text-gray-500">
                    Remember your password?
                    <NavLink to="/login">
                      <span className="ml-1 font-semibold text-[#0288D0] cursor-pointer hover:underline">
                        Back to Login
                      </span>
                    </NavLink>
                  </p>
                </div>

                <AuthModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  errorMessage={errorMessage}
                />
              </div>
            </Motion.div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default ForgotPassword;
