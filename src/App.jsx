import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import Footer from "./components/common/Footer";

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const noFooterRoutes = ["/login", "/signup"];
  const showFooter = !noFooterRoutes.includes(location.pathname);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);
  return (
    <>
      <Routes>
        {!user ? (
          <>
            {/*PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/*PRIVATE ROUTES */}
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/Home" />} />
          </>
        )}
      </Routes>
      {showFooter && <Footer />}
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
