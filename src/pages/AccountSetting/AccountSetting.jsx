import {
  User,
  Clock,
  Lock,
  Trash2,
  Pencil,
  CheckCircle2,
  X,
  Calendar,
  Eye,
} from "lucide-react";
import {
  onAuthStateChanged,
  verifyBeforeUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { useState, useEffect } from "react";
import Field from "./Field";
import SidebarItem from "./SidebarItem";
import { get, ref, update, remove } from "firebase/database";
import { usersDB, auth } from "../../firebase-config";
import PassAuthModal from "./PassAuthModal";
import { motion as Motion } from "framer-motion";
import danger from "../../assets/logo/danger.png";

export default function AccountSetting() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [birthday, setBirthday] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [emailChangePassword, setEmailChangePassword] = useState("");
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passErrorMessage, setPassErrorMessage] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [realTimeNewPassword, setRealTimeNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePhrase = "delete my account";
  const canDeleteAccount =
    deletePassword && deleteConfirmText.trim() === deletePhrase;

  // APPOINTMENTS
  const [appointments, setAppointments] = useState([]);
  const [apptsLoading, setApptsLoading] = useState(true);

  // load user + appointments
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      setEmail(user.email);
      setApptsLoading(true);

      get(ref(usersDB, `/users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setFirstName(data.fullName.firstName);
            setMiddleName(data.fullName.middleName || "");
            setLastName(data.fullName.lastName);
            setGender(data.gender);

            setBirthday(data.birthday);
            setContact(data.contact);

            // appointments: /users/uid/appointment/{id}
            const rawAppointments = data.appointment || {};
            const list = Object.entries(rawAppointments).map(([id, value]) => ({
              id,
              ...value,
            }));

            // latest first by createdAt
            list.sort((a, b) => {
              const aCreated = a.createdAt || 0;
              const bCreated = b.createdAt || 0;
              return Number(bCreated) - Number(aCreated);
            });

            setAppointments(list);
          } else {
            setAppointments([]);
          }
        })
        .finally(() => {
          setApptsLoading(false);
        });
    });

    return () => unsubscribe();
  }, []);

  const TABS = {
    ACCOUNT: "Account Details",
    APPTS: "Appointment History",
    PASSWORD: "Change Password",
    DELETE: "Delete Account",
  };

  const [active, setActive] = useState(TABS.ACCOUNT);

  function validateFirstName(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errFirstName");
    err.innerHTML = "";
    setFirstName(null);
    if (!tempValue) err.innerHTML = "First Name is required";
    else if (tempValue.length < 3)
      err.innerHTML = "Must be at least 3 characters long";
    else setFirstName(value);
  }

  function validateMiddleName(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errMiddleName");
    err.innerHTML = "";

    if (!tempValue) {
      setMiddleName("");
      return;
    }

    setMiddleName(value);
  }
  function validateLastName(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errLastName");
    err.innerHTML = "";
    setLastName(null);
    if (!tempValue) err.innerHTML = "Last Name is required";
    else if (tempValue.length < 2)
      err.innerHTML = "Must be at least 2 characters long";
    else setLastName(value);
  }

  function validateGender(e) {
    const value = e.target.value;
    const err = document.getElementById("errGender");
    err.innerHTML = "";

    if (!value) {
      setGender(null);
      err.innerHTML = "Please select a gender";
    } else {
      setGender(value);
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
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errContact");
    err.innerHTML = "";
    setContact(null);
    if (!tempValue) err.innerHTML = "Contact Number is required";
    else if (!/^09\d{9}$/.test(tempValue))
      err.innerHTML = "enter a valid 11-digit phone number (09XXXXXXXXX)";
    else setContact(value);
  }
  function validateEmail(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errEmail");
    err.innerHTML = "";
    setEmail(null);
    if (!tempValue) err.innerHTML = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempValue))
      err.innerHTML = "enter a valid email address";
    else setEmail(value);
  }

  function updateChanges() {
    const user = auth.currentUser;
    const userData = {
      fullName: { firstName, middleName, lastName },
      gender,
      birthday,
      contact,
      email,
    };

    update(ref(usersDB, `/users/${user.uid}`), userData).then(() => {
      setShowConfirm(false);
      if (user.email !== email) {
        setShowEmailModal(true);
      } else {
        setShowSaved(true);
      }
    });
  }
  function validateNewPassword(e) {
    const value = e.target.value;

    const err = document.getElementById("errNewPw");

    if (err) err.innerHTML = "";

    setRealTimeNewPassword(value);
    setNewPassword(value);

    const confirmErr = document.getElementById("errConfirmPw");
    if (confirmErr && confirmNewPassword === value) {
      confirmErr.innerHTML = "";
    }
  }

  function validateConfirmNewPassword(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errConfirmPw");

    if (err) err.innerHTML = "";
    setConfirmNewPassword(value); // invalid by default

    if (!tempValue) {
      if (err) err.innerHTML = "Please confirm your password";
    } else if (value !== realTimeNewPassword) {
      if (err) err.innerHTML = "Passwords do not match";
    } else {
      setConfirmNewPassword(value); // only set when it matches
    }
  }
  function changePassword() {
    const errCurrent = document.getElementById("errCurrentPw");
    const errNew = document.getElementById("errNewPw");
    const errConfirm = document.getElementById("errConfirmPw");

    setShowConfirmPassword(false);

    if (errCurrent) errCurrent.innerHTML = "";
    if (errNew) errNew.innerHTML = "";
    if (errConfirm) errConfirm.innerHTML = "";

    const curr = (currentPassword || "").trim();
    const newTemp = (newPassword || "").trim();
    const confirmTemp = (confirmNewPassword || "").trim();

    let hasError = false;

    if (!curr) {
      if (errCurrent) errCurrent.innerHTML = "Current password is required";
      hasError = true;
    }

    if (!newTemp) {
      if (errNew) errNew.innerHTML = "Password is required";
      hasError = true;
    } else if (newTemp.length < 8) {
      if (errNew) errNew.innerHTML = "Must be at least 8 characters long";
      hasError = true;
    } else if (!/[A-Z]/.test(newTemp)) {
      if (errNew) errNew.innerHTML = "Must contain an uppercase letter";
      hasError = true;
    } else if (!/[a-z]/.test(newTemp)) {
      if (errNew)
        errNew.innerHTML = "Must contain at least one lowercase letter";
      hasError = true;
    } else if (!/[0-9]/.test(newTemp)) {
      if (errNew) errNew.innerHTML = "Password must contain a number";
      hasError = true;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newTemp)) {
      if (errNew)
        errNew.innerHTML = "Must contain at least one special character";
      hasError = true;
    }

    if (!confirmTemp) {
      if (errConfirm) errConfirm.innerHTML = "Please confirm your password";
      hasError = true;
    } else if (confirmTemp !== newTemp) {
      if (errConfirm) errConfirm.innerHTML = "Passwords do not match";
      hasError = true;
    }

    if (hasError) return;

    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, curr);

    reauthenticateWithCredential(user, cred)
      .then(() => updatePassword(user, newPassword))
      .then(() => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setRealTimeNewPassword("");
        setShowSaved(true);
      })
      .catch((error) => {
        let errorMessage = "Couldn't update password. Please try again.";

        switch (error.code) {
          case "auth/wrong-password":
          case "auth/invalid-credential":
          case "auth/invalid-login-credentials":
            errorMessage = "Wrong current password.";
            if (errCurrent) errCurrent.innerHTML = "Wrong current password.";
            break;

          case "auth/weak-password":
            errorMessage = "Password is too weak.";
            if (errNew)
              errNew.innerHTML = "Password is too weak. Try a stronger one.";
            break;

          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Try again later.";
            if (errCurrent)
              errCurrent.innerHTML = "Too many attempts. Try again later.";
            break;

          default:
            errorMessage = error.message || errorMessage;
        }

        setPassErrorMessage(errorMessage);
      });
  }

  function validateDeletePassword(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errDeletePw");

    if (err) err.innerHTML = "";
    setDeletePassword("");

    if (!tempValue) {
      if (err) err.innerHTML = "Password is required";
    } else {
      setDeletePassword(value);
    }
  }

  function validateDeleteConfirmText(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errDeletePhrase");

    if (err) err.innerHTML = "";
    setDeleteConfirmText(value);

    if (!tempValue) {
      if (err) err.innerHTML = `Please type "${deletePhrase}"`;
    } else if (tempValue !== deletePhrase) {
      if (err) err.innerHTML = `Must exactly match "${deletePhrase}"`;
    }
  }

  function deleteAccount() {
    const errPw = document.getElementById("errDeletePw");
    const errPhrase = document.getElementById("errDeletePhrase");

    if (errPw) errPw.innerHTML = "";
    if (errPhrase) errPhrase.innerHTML = "";

    const pw = deletePassword.trim();
    const phrase = deleteConfirmText.trim();

    let hasError = false;

    if (!pw) {
      if (errPw) errPw.innerHTML = "Password is required";
      hasError = true;
    }

    if (!phrase) {
      if (errPhrase) errPhrase.innerHTML = `Please type "${deletePhrase}"`;
      hasError = true;
    } else if (phrase !== deletePhrase) {
      if (errPhrase)
        errPhrase.innerHTML = `Must exactly match "${deletePhrase}"`;
      hasError = true;
    }

    if (hasError) return;

    const user = auth.currentUser;
    if (!user || !user.email) {
      setPassErrorMessage("You must be signed in to delete your account.");
      setIsPassModalOpen(true);
      return;
    }

    setIsDeleting(true);

    const cred = EmailAuthProvider.credential(user.email, pw);

    setTimeout(() => {
      reauthenticateWithCredential(user, cred)
        .then(() => {
          const userRef = ref(usersDB, `/users/${user.uid}`);
          // delete DB record + auth user
          return Promise.all([remove(userRef), deleteUser(user)]);
        })
        .then(() => {
          setShowDeleteModal(false);
          setDeletePassword("");
          setDeleteConfirmText("");
          setInfoMsg("Your account has been deleted.");
        })
        .catch((error) => {
          let errorMessage = "Couldn't delete your account. Please try again.";

          switch (error.code) {
            case "auth/wrong-password":
            case "auth/invalid-credential":
            case "auth/invalid-login-credentials":
              errorMessage = "Wrong password.";
              if (errPw) errPw.innerHTML = "Wrong password.";
              break;
            case "auth/too-many-requests":
              errorMessage = "Too many attempts. Try again later.";
              if (errPw)
                errPw.innerHTML = "Too many attempts. Try again later.";
              break;
            case "auth/requires-recent-login":
              errorMessage =
                "For security, please sign in again and then delete your account.";
              break;
            default:
              errorMessage = error.message || errorMessage;
          }

          setPassErrorMessage(errorMessage);
          setIsPassModalOpen(true);
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }, 3000);
  }

  function confirmEmailChange() {
    setIsLoading(true);
    const u = auth.currentUser;
    setTimeout(() => {
      const cred = EmailAuthProvider.credential(u.email, emailChangePassword);
      reauthenticateWithCredential(u, cred) //check muna if tama ang email at pass
        .then(() => verifyBeforeUpdateEmail(u, email)) //pag tama i update ang email
        .then(() => {
          setShowEmailModal(false); //i close na ang email modal
          setEmailChangePassword("");
          setInfoMsg("We sent a confirmation link to your new email.");
        })
        .catch((error) => {
          let errorMessage = "Couldn't update email. Please try again.";
          switch (error.code) {
            case "auth/wrong-password":
            case "auth/invalid-credential":
            case "auth/invalid-login-credentials":
              errorMessage = "Wrong password.";
              document.getElementById("errPw").innerHTML = "Wrong password.";
              break;
            case "auth/too-many-requests":
              errorMessage = "Too many attempts.";
              document.getElementById("errPw").innerHTML =
                "Too many attempts. Try again later.";
              break;
            default:
              errorMessage = error.message;
          }

          setPassErrorMessage(errorMessage);
          setIsPassModalOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 3000);
  }

  const closePassModal = () => {
    setIsPassModalOpen(false);
  };

  function cancelEmailChange() {
    setShowEmailModal(false);
    setEmailChangePassword("");
    const user = auth.currentUser;
    setEmail(user.email);
    setShowSaved(true);
  }
  function validateEmailChangePassword(e) {
    const value = e.target.value;
    const tempValue = value.trim();
    const err = document.getElementById("errPw");
    err.innerHTML = "";
    setEmailChangePassword("");
    if (!tempValue) err.innerHTML = "Password is required";
    else {
      setEmailChangePassword(value);
    }
  }

  // helpers for appointment UI
  function formatBookingDate(createdAt) {
    if (!createdAt) return "";
    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  function getStatusColorDot(status) {
    const value = (status || "").toLowerCase();
    if (value === "pending") return "bg-orange-400";
    if (value === "cancelled" || value === "rejected") return "bg-red-500";
    if (value === "approved") return "green-500";
    return "bg-gray-400";
  }

  function getStatusTextColor(status) {
    const value = (status || "").toLowerCase();
    if (value === "pending") return "text-orange-500";
    if (value === "cancelled" || value === "rejected") return "text-red-600";
    if (value === "approved") return "text-green-600";
    return "text-gray-700";
  }

  useEffect(() => {
    if (!showSaved) return;
    const t = setTimeout(() => setShowSaved(false), 5000);
    return () => clearTimeout(t);
  }, [showSaved]);

  const isChangesValid =
    firstName && lastName && gender && birthday && contact && email;

  return (
    <>
      {showSaved && (
        <Motion.div
          className="fixed z-50 flex  justify-center w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" flex  items-center gap-2 rounded-lg   px-4 py-2 bg-green-200  text-green-600 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-lg font-medium">
              Your changes have been Saved.
            </span>
            <button
              type="button"
              onClick={() => setShowSaved(false)}
              className="ml-2 inline-flex items-center justify-center rounded p-1 hover:bg-emerald-600/10"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </Motion.div>
      )}
      <div className="w-full">
        <div className=" mx-auto w-7xl rounded-2xl bg-linear-to-b from-sky-500 to-sky-200 p-6 md:p-10">
          <div className="mx-auto  max-w-6xl ">
            {/* Page Title */}
            <h1 className="text-3xl font-semibold text-white ">
              Account Settings
            </h1>

            <div className=" mt-6 grid gap-6 md:grid-cols-[280px_1fr]">
              {/* Sidebar */}
              <aside className="rounded-xl bg-white shadow-md ">
                <nav className="divide-y divide-gray-100">
                  <SidebarItem
                    icon={User}
                    label={TABS.ACCOUNT}
                    active={active === TABS.ACCOUNT}
                    onClick={() => setActive(TABS.ACCOUNT)}
                  />
                  <SidebarItem
                    icon={Clock}
                    label={TABS.APPTS}
                    active={active === TABS.APPTS}
                    onClick={() => setActive(TABS.APPTS)}
                  />
                  <SidebarItem
                    icon={Lock}
                    label={TABS.PASSWORD}
                    active={active === TABS.PASSWORD}
                    onClick={() => setActive(TABS.PASSWORD)}
                  />
                  <SidebarItem
                    icon={Trash2}
                    label={TABS.DELETE}
                    active={active === TABS.DELETE}
                    onClick={() => setActive(TABS.DELETE)}
                    danger
                  />
                </nav>
              </aside>

              {/* Content Card */}
              <section className="rounded-xl bg-white shadow-md ">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {active}
                  </h2>

                  {/* Switch content based sa active tab */}
                  {active === TABS.ACCOUNT && (
                    <div className="mt-6 space-y-5 ">
                      <div>
                        <Field
                          label={
                            <span>
                              First Name<span className="text-red-600">*</span>
                            </span>
                          }
                          value={firstName}
                          onChange={validateFirstName}
                          rightIcon={Pencil}
                        />
                        <p
                          id="errFirstName"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      <div>
                        <Field
                          label="Middle Name"
                          value={middleName}
                          onChange={validateMiddleName}
                          rightIcon={Pencil}
                        />
                        <p
                          id="errMiddleName"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>
                      <div>
                        <Field
                          label={
                            <span>
                              Last Name<span className="text-red-600">*</span>
                            </span>
                          }
                          value={lastName}
                          onChange={validateLastName}
                          rightIcon={Pencil}
                        />

                        <p
                          id="errLastName"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      <div>
                        <p className="text-sm mb-3">
                          Gender
                          <span className="text-red-600">*</span>
                        </p>
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
                              value="Prefer not to say"
                              className="accent-[#0A8CD2]"
                              onChange={validateGender}
                              checked={gender === "Prefer not to say"}
                            />
                            <span>Prefer not to say</span>
                          </label>
                        </div>
                        <p
                          id="errGender"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-1">
                          Date of Birth<span className="text-red-600">*</span>
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
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      <div>
                        <Field
                          label={
                            <span>
                              Contact Number
                              <span className="text-red-600">*</span>
                            </span>
                          }
                          value={contact}
                          onChange={validateContact}
                          rightIcon={Pencil}
                        />

                        <p
                          id="errContact"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>
                      <div>
                        <Field
                          label={
                            <span>
                              Email Address
                              <span className="text-red-600">*</span>
                            </span>
                          }
                          value={email}
                          onChange={validateEmail}
                          rightIcon={Pencil}
                        />

                        <p
                          id="errEmail"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      {isChangesValid ? (
                        <button
                          className=" bg-[#0A4C6F] text-white rounded-lg px-5 py-2 hover:bg-[#083854] cursor-pointer text-center"
                          onClick={() => setShowConfirm(true)}
                        >
                          Save Changes
                        </button>
                      ) : (
                        <button className=" bg-[#9EC2D3] text-[#E6EDF1] rounded-lg px-5 py-2 cursor-not-allowed text-center">
                          Save Changes
                        </button>
                      )}
                    </div>
                  )}

                  {active === TABS.APPTS && (
                    <div className="mt-6">
                      <div className="space-y-4 max-h-80 md:max-h-96 overflow-y-auto pr-1">
                        {apptsLoading && (
                          <p className="text-sm text-gray-600">
                            Loading appointments...
                          </p>
                        )}

                        {!apptsLoading && appointments.length === 0 && (
                          <p className="text-sm text-gray-600">
                            You have no appointments yet.
                          </p>
                        )}

                        {!apptsLoading &&
                          appointments.map((appt) => {
                            const statusValue = (
                              appt.status || "pending"
                            ).toLowerCase();
                            const statusLabel =
                              statusValue.charAt(0).toUpperCase() +
                              statusValue.slice(1);

                            return (
                              <div
                                key={appt.id}
                                className="rounded-xl border border-gray-200 px-5 py-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
                              >
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                      Type of Consultation:
                                    </p>
                                    <p className="mt-1 text-sm text-gray-800">
                                      {appt.consultationType || "N/A"}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      Booking Date:
                                    </p>
                                    <p className="mt-1 text-xs text-gray-800">
                                      {formatBookingDate(appt.createdAt) || "—"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col items-end justify-between gap-3">
                                  <span
                                    className={`inline-flex items-center gap-2 text-sm font-medium ${getStatusTextColor(
                                      statusValue
                                    )}`}
                                  >
                                    <span
                                      className={`inline-block w-2 h-2 rounded-full ${getStatusColorDot(
                                        statusValue
                                      )}`}
                                    />
                                    {statusLabel}
                                  </span>

                                  {/* simple nav-link style, no functionality yet */}
                                  <button
                                    type="button"
                                    className="mt-10 text-xs md:text-sm font-medium text-[#0A8CD2] hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    View Appointment Details
                                    <span className="text-lg leading-none">
                                      &gt;
                                    </span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {active === TABS.PASSWORD && (
                    <div className="mt-6 space-y-5">
                      {/* Current Password (no real-time rules, just required) */}
                      <div>
                        <Field
                          type="password"
                          label="Current Password"
                          value={currentPassword}
                          onChange={(e) => {
                            setCurrentPassword(e.target.value);
                            const err = document.getElementById("errCurrentPw");
                            if (err) err.innerHTML = "";
                          }}
                        />
                        <p
                          id="errCurrentPw"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      {/* New Password – real-time validation like SignUp */}
                      <div>
                        <Field
                          type="password"
                          label={
                            <span>
                              New Password
                              <br />
                              <span className="font-light text-[11px] text-gray-600">
                                (Password must be at least 8 characters and
                                include uppercase, lowercase, a number, and a
                                special character.)
                              </span>
                            </span>
                          }
                          value={realTimeNewPassword}
                          onChange={validateNewPassword}
                        />
                        <p
                          id="errNewPw"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      {/* Confirm New Password – real-time match check */}
                      <div>
                        <Field
                          type="password"
                          label="Confirm New Password"
                          value={confirmNewPassword || ""} // keep controlled
                          onChange={validateConfirmNewPassword}
                        />
                        <p
                          id="errConfirmPw"
                          className="text-red-500 text-[12px] h-4"
                        />
                      </div>

                      <div className="mt-4">
                        {currentPassword &&
                        newPassword &&
                        confirmNewPassword &&
                        confirmNewPassword === newPassword ? (
                          <button
                            className="rounded-xl  bg-sky-700 px-6 py-3 text-white transition hover:bg-sky-800 cursor-pointer"
                            onClick={() => setShowConfirmPassword(true)}
                          >
                            Update Password
                          </button>
                        ) : (
                          <button
                            disabled
                            className="rounded-xl  bg-[#9EC2D3] px-6 py-3 text-[#E6EDF1] cursor-not-allowed"
                          >
                            Update Password
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {active === TABS.DELETE && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
                      <p className="mb-3 font-medium">
                        Permanently delete your account?
                      </p>
                      <p className="mb-4 text-sm text-red-700/90">
                        This action cannot be undone. All your data will be
                        removed.
                      </p>
                      <button
                        className="rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700 cursor-pointer"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete Account
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Save Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Save Changes?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to save your changes?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#0A4C6F] text-white hover:bg-[#083854]"
                onClick={updateChanges}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowConfirmPassword(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Save Changes?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to change your Password?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowConfirmPassword(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#0A4C6F] text-white hover:bg-[#083854]"
                onClick={changePassword}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Change Modal (password) */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={cancelEmailChange}
          />
          <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Confirm Email Change</h3>
            <p className="text-sm text-gray-600 mb-4">
              To change your sign-in email to{" "}
              <span className="font-medium">{email}</span>, enter your current
              password.
            </p>
            <div className="flex flex-col gap-1">
              <input
                type="password"
                value={emailChangePassword}
                onChange={validateEmailChangePassword}
                disabled={isLoading}
                placeholder="Current password"
                className="w-full border rounded-lg px-3 py-2  outline-none focus:ring-2 focus:ring-[#0A8CD2]"
              />
              <p id="errPw" className="text-red-500 text-[12px] h-4 mb-4 " />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 w-28 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={cancelEmailChange}
                disabled={isLoading}
              >
                Cancel
              </button>

              {emailChangePassword && !isLoading ? (
                <button
                  className="px-4 py-2 w-28 rounded-lg bg-[#0A4C6F] text-white hover:bg-[#083854]"
                  onClick={confirmEmailChange}
                >
                  Confirm
                </button>
              ) : isLoading ? (
                <button
                  className="px-4 py-2 rounded-lg w-28 bg-[#0A4C6F] text-white cursor-not-allowed flex justify-center items-center"
                  disabled
                >
                  <svg
                    className="animate-spin h-5 w-5 mr-1 text-white"
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
                  Confirm
                </button>
              ) : (
                <button className="px-4 py-2 w-28 rounded-lg bg-[#9EC2D3] text-[#E6EDF1] cursor-not-allowed">
                  Confirm
                </button>
              )}
            </div>
            <PassAuthModal
              isOpen={isPassModalOpen}
              onClose={closePassModal}
              errorMessage={passErrorMessage}
            />
          </div>
        </div>
      )}

      {/* Info Modal */}
      {infoMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setInfoMsg("")}
          />
          <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Notice</h3>
            <p className="text-sm text-gray-700 mb-4">{infoMsg}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-[#0A4C6F] text-white hover:bg-[#083854]"
                onClick={() => {
                  setInfoMsg("");
                  setShowSaved(true);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">
              Are you sure you want to delete your account?
            </h3>

            {/* red warning banner */}
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 flex gap-2 justify-center items-center">
              <div className="mt-0.5 text-red-600 ">
                <img src={danger} alt="danger sign" className="w-6 h-6" />
              </div>
              <p className="text-sm text-red-800">
                This is extremely important and an irreversible action.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">
                  Please type your password to delete your account:
                </p>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={validateDeletePassword}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-500/70"
                  placeholder="Enter your password"
                />
                <p
                  id="errDeletePw"
                  className="text-red-500 text-[12px] h-4 mt-1"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">
                  To verify, type{" "}
                  <span className="font-semibold text-red-600">
                    {deletePhrase}
                  </span>{" "}
                  below:
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={validateDeleteConfirmText}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-500/70"
                />
                <p
                  id="errDeletePhrase"
                  className="text-red-500 text-[12px] h-4 mt-1"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>

              {canDeleteAccount && !isDeleting ? (
                <button
                  className="px-4 py-2 rounded-lg w-72 bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                  onClick={deleteAccount}
                >
                  I understand, delete my account.
                </button>
              ) : isDeleting ? (
                <button
                  disabled
                  className="px-4 w-72 py-2 rounded-lg bg-red-600 text-white cursor-not-allowed flex items-center justify-center"
                >
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                  Deleting Your Account...
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 w-72 py-2 rounded-lg bg-red-300 text-red-50 cursor-not-allowed"
                >
                  I understand, delete my account.
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
