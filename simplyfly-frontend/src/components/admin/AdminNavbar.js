import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/simplyflylogo.png";
function AdminNavbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();
        navigate("/login");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

            <div className="container-fluid">

                <Link
                    className="navbar-brand fw-bold"
                    to="/admin"
                >
                    <img
                        src={logo}
                        alt="SimplyFly"
                        style={{
                            width: "120px",
                            height: "auto"
                        }}
                    />

                    SIMPLYFLY ADMIN
                </Link>

                <div className="ms-auto d-flex gap-4">

                    <Link
                        className="nav-link text-white"
                        to="/admin"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/admin-flights"
                    >
                        Flights
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/users"
                    >
                        Users
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/admin-bookings"
                    >
                        Bookings
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/reports"
                    >
                        Reports
                    </Link>
                    <Link
                        className="nav-link text-white"
                        to="/admin-refunds"
                    >
                        Refunds
                    </Link>
                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default AdminNavbar;