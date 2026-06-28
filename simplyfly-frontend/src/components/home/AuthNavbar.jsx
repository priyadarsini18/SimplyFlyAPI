import { Link } from "react-router-dom";
import logo from "../../assets/simplyflylogo.png";
import "../../styles/AuthNavbar.css";
function AuthNavbar() {
    return (
        <nav className="auth-navbar">

            <div className="auth-logo">

                <img
                    src={logo}
                    alt="SimplyFly"
                />

                <h3>SimplyFly</h3>

            </div>

            <div className="auth-links">

                <Link to="/">Home</Link>

                <Link to="/about">
                    About
                </Link>

                <Link to="/contact">
                    Contact
                </Link>

                <Link
                    to="/Register"
                    className="register-btn"
                >
                    Register
                </Link>

            </div>

        </nav>
    );
}

export default AuthNavbar;