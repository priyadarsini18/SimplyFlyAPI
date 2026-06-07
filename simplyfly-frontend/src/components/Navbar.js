import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4">

            <Link
                className="navbar-brand"
                to="/"
            >
                ✈️ SimplyFly
            </Link>

            <ul className="navbar-nav ms-auto">

                <li className="nav-item">

                    <Link
                        className="nav-link"
                        to="/"
                    >
                        Home
                    </Link>

                </li>

                <li className="nav-item">

                    <Link
                        className="nav-link"
                        to="/login"
                    >
                        Login
                    </Link>

                </li>

                <li className="nav-item">

                    <Link
                        className="nav-link"
                        to="/register"
                    >
                        Register
                    </Link>

                </li>

                <li className="nav-item">

                    <Link
                        className="nav-link"
                        to="/flights"
                    >
                        Flights
                    </Link>

                </li>

                <li className="nav-item">

                    <Link
                        className="nav-link"
                        to="/bookings"
                    >
                        Bookings
                    </Link>

                </li>

            </ul>

        </nav>

    )

}

export default Navbar;