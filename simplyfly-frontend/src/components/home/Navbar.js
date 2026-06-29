import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/simplyflylogo.png";
import "../../pages/Home/Home";

function Navbar({
    darkMode,
    toggleTheme
}) {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
   

    // Admin uses separate navbar
    if (role === "Admin") {
        return null;
    }
   

    return (
        <nav
            className="navbar navbar-expand-lg px-4"
            style={{
                background:
                    "linear-gradient(90deg,#0077B6,#00B4D8)",
                boxShadow:
                    "0 4px 15px rgba(0,0,0,0.1)"
            }}
        >
            <div className="container-fluid">

                {/* LOGO */}

                <Link
                    className="navbar-brand d-flex align-items-center"
                    to="/"
                >
                    <img
                        src={logo}
                        alt="SimplyFly"
                        width="200"
                        className="navbar-logo"
                    />

                    <span
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "#fff",
                            marginLeft: "3px"
                        }}
                    >
                        <b><i>SIMPLYFLY</i></b>
                    </span>
                </Link>

                {/* NAV LINKS */}

                <div className="ms-auto d-flex gap-4 align-items-center">

                    <Link
                        className="nav-link text-white"
                        to="/"
                    >
                        Home
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/flights"
                    >
                        Flights
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/about"
                    >
                        About
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/contact"
                    >
                        Contact
                    </Link>

                    {/* USER */}

                    {role === "User" && token && (
                        <>
                            
                            <Link className="nav-link text-white"
                                to="/saved-flights">
                                 Saved Flight
                            </Link>
                            <Link
                                className="nav-link text-white"
                                to="/my-bookings"
                            >
                                My Bookings
                            </Link>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/payment-history"
                                >
                                     Payment History
                                </Link>
                            </li>

                            <Link
                                className="nav-link text-white"
                                to="/profile"
                            >
                                Profile
                            </Link>
                        </>
                    )}

                    {/* FLIGHT OWNER */}
                    
                    {role === "FlightOwner" && token && (
                        <>
                            <Link
                                className="nav-link text-white"
                                to="/flight-owner"
                            >
                                Dashboard
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/owner-my-flights"
                            >
                                My Flights
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/owner-bookings"
                            >
                                Bookings
                            </Link>

                            <Link
                                className="nav-link text-white"
                                to="/owner-revenue"
                            >
                                Revenue
                            </Link>
                            
                        </>
                    )}

                    {/* LOGIN / LOGOUT */}
                    <button
                        onClick={toggleTheme}
                        className="theme-btn"
                    >
                        {darkMode
                            ? "☀ Light"
                            : "🌙 Dark"}
                    </button>
                    {token ? (
                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                className="btn btn-light"
                                to="/login"
                            >
                                Login
                            </Link>

                            <Link
                                className="btn btn-success"
                                to="/register"
                            >
                                Register
                            </Link>

                            <Link
                                className="btn btn-outline-light"
                                to="/register-flightowner"
                            >
                                Flight Owner
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;