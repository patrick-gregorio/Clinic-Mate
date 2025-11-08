import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { NavLink } from "react-router";
import AuthModal from "./AuthModal";
import { motion as Motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errEmail");
    err.innerHTML = "";
    setEmail(null);

    if (!value) {
      err.innerHTML = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      err.innerHTML = "Enter a valid email address";
    } else {
      setEmail(value);
    }
  }

  function validatePassword(e) {
    const value = e.target.value.trim();
    const err = document.getElementById("errPassword");
    err.innerHTML = "";
    setPassword(null);

    if (!value) {
      err.innerHTML = "Password is required";
    } else {
      setPassword(value);
    }
  }

  function login() {
    document.getElementById("errEmail").innerHTML = "";
    document.getElementById("errPassword").innerHTML = "";

    setIsLoading(true);

    setTimeout(() => {
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          let errorMessage = "Login failed. Please try again.";

          switch (error.code) {
            case "auth/invalid-email":
              errorMessage = "Invalid email address.";
              document.getElementById("errEmail").innerHTML =
                "Invalid email address";
              break;
            case "auth/user-disabled":
              errorMessage = "This account has been disabled.";
              break;
            case "auth/user-not-found":
              errorMessage = "No account found with this email.";
              document.getElementById("errEmail").innerHTML =
                "No account found with this email";
              break;
            case "auth/wrong-password":
              errorMessage = "Incorrect password.";
              document.getElementById("errPassword").innerHTML =
                "Incorrect password";
              break;
            case "auth/too-many-requests":
              errorMessage =
                "Too many failed attempts. Please try again later.";
              break;
            case "auth/invalid-credential":
              errorMessage = "Invalid Credentials Mismatch.";
              break;
            default:
              errorMessage = error.message;
          }

          setErrorMessage(errorMessage);
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
      <AnimatePresence>
        <div className="min-h-screen bg-linear-to-b from-[#0288D0] to-[#B3E5FC] flex flex-col justify-center items-center">
          <p className="text-white text-3xl mb-15">ClinicMate</p>

          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <div className="w-96 h-max p-10 bg-white rounded-2xl drop-shadow-lg flex flex-col items-center justify-center gap-5">
                <div className="flex flex-col items-center mb-5">
                  <h1>
                    <span className="text-[#0A8CD2]">WELCOME BACK</span>
                  </h1>
                  <h1 className="font-bold text-2xl">Login To Your Account</h1>
                </div>

                <div className="mb-4">
                  <div>
                    <p className="font-semibold">Email</p>
                    <input
                      type="email"
                      onChange={validateEmail}
                      className="border border-gray-400 rounded-md w-72 p-1 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                      disabled={isLoading}
                    />
                    <p
                      id="errEmail"
                      className="text-red-500 text-[10px] h-4 "
                    ></p>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Password</p>
                      <p className="font-semibold text-[#0288D0] cursor-pointer text-[10px] hover:underline mt-3">
                        Forget Password?
                      </p>
                    </div>

                    <input
                      type="password"
                      onChange={validatePassword}
                      className="border border-gray-400 rounded-md w-72 p-1 outline-none focus:ring-2 focus:ring-[#0A8CD2] focus:border-[#0A8CD2]"
                      disabled={isLoading}
                    />
                    <p
                      id="errPassword"
                      className="text-red-500 text-[10px] h-4"
                    ></p>
                  </div>
                </div>

                <div className="flex flex-col">
                  {email && password && !isLoading ? (
                    <button
                      className="bg-[#0A4C6F] hover:bg-[#083854] text-white w-72  rounded-lg pt-2 pb-2 cursor-pointer"
                      onClick={login}
                    >
                      Login Now
                    </button>
                  ) : isLoading ? (
                    <button
                      className="bg-[#0A4C6F] text-white w-72 rounded-lg pt-2 pb-2 cursor-not-allowed flex items-center justify-center"
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
                      Logging in...
                    </button>
                  ) : (
                    <button className="bg-[#9EC2D3] text-[#E6EDF1] w-72 rounded-lg pt-2 pb-2 cursor-not-allowed">
                      Login Now
                    </button>
                  )}
                  <p className="text-gray-400 inline text-[10px] mt-1">
                    Not yet registered?{" "}
                    <NavLink to="/signup">
                      <span className="font-semibold text-[#0288D0] cursor-pointer text-[10px] hover:underline mt-3 ">
                        Sign Up
                      </span>
                    </NavLink>
                  </p>
                </div>
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
    </>
  );
}

export default Login;
