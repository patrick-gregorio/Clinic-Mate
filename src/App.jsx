import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import Footer from "./components/common/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import Booking from "./pages/Booking/Booking";
import NavigationBar from "./components/common/NavigationBar";
import AccountSetting from "./pages/AccountSetting/AccountSetting";
import ForgotPassword from "./pages/LogIn/ForgotPassword";
function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const noFooterAndNavigationRoutes = ["/login", "/signup", "/forgotpassword"];

  const showFooterAndNavigationRoutes = !noFooterAndNavigationRoutes.includes(
    location.pathname
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      {showFooterAndNavigationRoutes && <NavigationBar />}
      <Routes>
        {/*Accessible Anywhere */}
        <Route path="/AboutUs" element={<AboutUs />} />
        {!user ? (
          <>
            {/*PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/*PRIVATE ROUTES */}

            <Route path="/" element={<Home />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/AccountSetting" element={<AccountSetting />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      {showFooterAndNavigationRoutes && <Footer />}
    </>
  );
}
function App() {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
