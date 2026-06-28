import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "../../styles/Login.css";
import logo from "../../assets/simplyflylogo.png";
import AuthNavbar from "../../components/home/AuthNavbar";
import { GoogleLogin }
    from "@react-oauth/google";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleGoogleSuccess = async (
        credentialResponse
    ) => {

        try {

            const response = await axios.post(
                "http://localhost:8080/api/v1/Auth/google-login",
                {
                    token: credentialResponse.credential
                }
            );

          

            localStorage.setItem(
                "token",
                response.data.token || response.data.Token
            );

            localStorage.setItem(
                "userId",
                response.data.userId || response.data.UserId
            );

            localStorage.setItem(
                "name",
                response.data.fullName || response.data.FullName
            );

            localStorage.setItem(
                "email",
                response.data.email || response.data.Email
            );

            localStorage.setItem(
                "role",
                response.data.role || response.data.Role
            );

            console.log("GOOGLE RESPONSE");
            console.log(response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("name", response.data.fullName);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role", response.data.role);

            const role = response.data.role;

localStorage.setItem("role", role);

switch(role)
{
    case "Admin":
        navigate("/admin");
        break;

    case "FlightOwner":
        navigate("/flight-owner");
        break;

    default:
        navigate("/flights");
        break;
}

        }
        catch (error) {

            console.log(error);

        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/Auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("name", response.data.fullName);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("phone", response.data.phoneNumber);
            localStorage.setItem("role", response.data.role);
            const role =
                response.data.role ||
                response.data.Role;

            localStorage.setItem("role", role);

            if (role === "Admin") {
                navigate("/admin");
            }
            else if (role === "FlightOwner") {
                navigate("/flight-owner");
            }
            else {
                navigate("/flights");
            }
        }
        catch (error) {
            console.log("LOGIN ERROR:", error);
            console.log("Response:", error.response);

            alert(
                JSON.stringify(error.response?.data, null, 2) ||
                error.message
            );
        }
        
    };

    return (
        
        <div className="login-page">
            <AuthNavbar />

            {/* LEFT PANEL */}

            <div className="left-panel">

                <div className="overlay">

                    <div className="brand">

                        <img
                            src={logo}
                            alt="SimplyFly Logo"
                            className="brand-logo"
                        />

                    </div>

                    <span className="tag">
                        PREMIUM AIR TRAVEL
                    </span>

                    <h1>
                        Fly Beyond
                        <br />
                        Boundaries
                    </h1>

                    <p>
                        Book, Manage and Experience
                        Seamless Air Travel.
                    </p>

                    <div className="stats">

                        <div>
                            <h2>200+</h2>
                            <span>Destinations</span>
                        </div>

                        <div>
                            <h2>2M+</h2>
                            <span>Travellers</span>
                        </div>

                        <div>
                            <h2>99.8%</h2>
                            <span>On-Time Rate</span>
                        </div>

                    </div>

                </div>

            </div>
            

            {/* RIGHT PANEL */}

            <div className="right-panel">

                <form
                    className="login-card"
                    onSubmit={handleLogin}
                >

                    <img
                        src={logo}
                        alt="SimplyFly"
                        className="login-logo"
                    />

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Access your travel dashboard
                    </p>

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Sign In →
                    </button>
                    <div className="mt-3 text-center">

                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() =>
                                console.log("Google Login Failed")
                            }
                        />

                    </div>
                    <div className="text-center mt-3">
                        <Link
                            to="/forgot-password"
                            className="text-primary"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>

            </div>

        </div>
    );
}

export default Login;