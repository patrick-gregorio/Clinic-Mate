import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo/Logo1.png";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, usersDB } from "../../firebase-config";
import NotificationModal from "./NotificationModal";

function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside the profile dropdown
      const profileButton = document.querySelector(".profile-button");
      const dropdown = document.querySelector(".profile-dropdown");

      if (profileButton && dropdown) {
        const isClickInsideProfile =
          profileButton.contains(event.target) ||
          dropdown.contains(event.target);

        if (!isClickInsideProfile) {
          setProfileOpen(false);
        }
      }
    }

    // Add event listener when dropdown is open
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      // if user scrolls down & beyond some point => hide
      if (currentY > lastScrollY && currentY > 80) {
        setIsNavVisible(false);
        setProfileOpen(false);
        setShowNotifications(false);
        setMobileOpen(false);
      } else {
        // scrolling up => show
        setIsNavVisible(true);
      }

      setLastScrollY(currentY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setAppointments([]);
        return;
      }

      const apptRef = ref(usersDB, `/users/${user.uid}/appointment`);

      onValue(apptRef, (snapshot) => {
        if (!snapshot.exists()) {
          setAppointments([]);
          return;
        }

        const data = snapshot.val();
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setAppointments(list);
      });
    });

    return () => unsub();
  }, []);

  return (
    <>
      <header
        className={`w-full h-20  sticky top-0 z-50 transition-transform duration-300
    ${isNavVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav
          className="bg-white/60 backdrop-blur-md border border-white/40 shadow-sm
             rounded-full mt-2 mx-auto flex max-w-7xl items-center justify-between
             gap-4 px-4 py-3 md:px-6"
        >
          {/* Left: Logo (text placeholder) */}
          <NavLink to={"/"} className="flex items-center gap-2">
            {/* Replace this with your real logo if you have one */}
            <img src={logo} className="w-12 h-12"></img>
            <span className="text-base text-nowrap lg:text-xl font-semibold tracking-tight text-[#0E8ED3]">
              ClinicMate
            </span>
          </NavLink>

          {/* Center: Nav links (desktop) */}
          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `px-5 py-2 text-base text-nowrap lg:text-xl rounded-full ${
                    isActive
                      ? "text-[#078BD1] bg-[#DBF2FD]"
                      : "text-[#000000] hover:text-[#078BD1] hover:bg-[#DBF2FD]"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/Booking"}
                className={({ isActive }) =>
                  `px-5 py-2 text-base text-nowrap lg:text-xl rounded-full ${
                    isActive
                      ? "text-[#078BD1] bg-[#DBF2FD]"
                      : "text-[#000000] hover:text-[#078BD1] hover:bg-[#DBF2FD]"
                  }`
                }
              >
                Book an Appointment
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/AboutUs"}
                className={({ isActive }) =>
                  `px-5 py-2 text-base text-nowrap lg:text-xl rounded-full ${
                    isActive
                      ? "text-[#078BD1] bg-[#DBF2FD]"
                      : "text-[#000000] hover:text-[#078BD1] hover:bg-[#DBF2FD]"
                  }`
                }
              >
                About us
              </NavLink>
            </li>
          </ul>

          {/* Right: Actions (desktop) */}
          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                {/* 🔔 Notification bell – visible on ALL screen sizes */}
                <div className="relative">
                  <button
                    className={
                      showNotifications
                        ? "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0E8ED3] text-white transition cursor-pointer"
                        : "inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                    }
                    onClick={() => setShowNotifications((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-5 w-5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 1 1 12 0c0 4 2 5 2 7H4c0-2 2-3 2-7Z" />
                      <path d="M10 19a2 2 0 0 0 4 0" />
                    </svg>
                  </button>

                  <NotificationModal
                    isOpen={showNotifications}
                    onClose={() => setShowNotifications(false)}
                    appointments={appointments}
                  />
                </div>

                {/* 👤 Profile – desktop / tablet only */}
                <div className="relative ">
                  <button
                    className="cursor-pointer profile-button"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    {!profileOpen ? (
                      <div className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1 ">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="h-4 w-4"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21a8 8 0 1 0-16 0" />
                            <circle cx="12" cy="8" r="3.5" />
                          </svg>
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="h-4 w-4 text-gray-700"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 rounded-full bg-[#DBF2FD] px-2 py-1 ">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0E8ED3] text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="h-4 w-4"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21a8 8 0 1 0-16 0" />
                            <circle cx="12" cy="8" r="3.5" />
                          </svg>
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="h-4 w-4 text-[#0E8ED3]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-fit text-nowrap rounded-lg bg-white p-1 text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.10)] z-50 profile-dropdown">
                      <NavLink
                        onClick={() => setProfileOpen(false)}
                        to="/accountsetting"
                        className="block rounded px-3 py-2 hover:bg-[#DBF2FD] hover:text-[#0E8ED3]"
                      >
                        <div className="flex flex-row gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5 inline"
                          >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Account settings
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-6 w-6"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </div>
                      </NavLink>

                      <button
                        className="w-full text-left rounded px-3 py-2 hover:bg-[#DBF2FD] hover:text-[#0E8ED3]"
                        onClick={() => {
                          setProfileOpen(false);
                          auth.signOut();
                        }}
                      >
                        <div className="flex flex-row gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-5 w-5 inline"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <path d="m16 17 5-5-5-5" />
                            <path d="M21 12H9" />
                          </svg>
                          <p className="mr-1">Log out</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="ml-12 h-6 w-6 "
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* 🍔 Hamburger – only on mobile when logged in */}
                <button
                  className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100 md:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-6 w-6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                </button>
              </>
            ) : (
              // Not logged in – show auth buttons
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm md:text-base rounded-full text-[#078BD1] border border-[#078BD1] hover:bg-[#DBF2FD]"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-sm md:text-base rounded-full text-white bg-[#078BD1] hover:bg-[#07679a]"
                >
                  Sign up
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile panel (right slide-over) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Panel */}
          <aside className="relative h-full w-72 max-w-[80%] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-base font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                className="rounded-full p-2 hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {/* Close (X) icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-1 px-4 py-3 bg-white">
              {/* Replicate the same main links */}
              <NavLink
                to="/"
                className="rounded px-3 py-2 text-sm font-medium hover:text-[#078BD1] hover:bg-[#DBF2FD]"
              >
                Home
              </NavLink>
              <NavLink
                to="/booking"
                className="rounded px-3 py-2 text-sm font-medium  hover:text-[#078BD1] hover:bg-[#DBF2FD]"
              >
                Book an Appointment
              </NavLink>
              <NavLink
                to="/aboutus"
                className="rounded px-3 py-2 text-sm font-medium  hover:text-[#078BD1] hover:bg-[#DBF2FD]"
              >
                About Us
              </NavLink>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default NavigationBar;
