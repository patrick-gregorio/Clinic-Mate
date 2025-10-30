import { NavLink } from "react-router";
import "./navigation-bar.css"
import Logo1 from "@/assets/logo/Logo1.png";
function NavigationBar(){
    return(
        <>
        <div className="nav-bar px-[39px]">
            <div className="nav-logo">
                <img src={Logo1} alt="ClinicMate Logo"  className="w-[49px] h-[65px]"/>
                <p className="text-[32px] text-[#0E8ED3]">ClinicMate</p>
            </div>
            <div>
                <NavLink to="/" className="nav-links">Home</NavLink>
                <NavLink to="/Booking" className="nav-links">Book an Appointment</NavLink>
                <NavLink to="AboutUs" className="nav-links">About Us</NavLink>
            </div>
            <div>
                <button className="sign-in">Sign in</button>
                <button className="log-in">Sign up</button>
            </div>

        </div>
        </>
    );
}
export default NavigationBar;   