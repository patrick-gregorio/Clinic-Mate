import { BrowserRouter, Route, Routes } from "react-router";
import NavigationBar from "./components/patientComponents/NavigationBar/NavigationBar";
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking/Booking";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
  <>
  <BrowserRouter>
  <NavigationBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Booking" element={<Booking/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
    </Routes>
  </BrowserRouter>
  
  </>
);
}

export default App;
