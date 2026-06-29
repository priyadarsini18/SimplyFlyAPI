import { useState } from "react";
import axios from "axios";
import AuthNavbar from "../../components/home/AuthNavbar";
import "../../styles/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {

    const [fullName, setFullName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [showPassword,
        setShowPassword] =
        useState(false);

    const navigate = useNavigate();

    const getStrength = () => {

        if (password.length < 8)
            return "Weak";

        if (
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[@$!%*?&]/.test(password)
        )
            return "Strong";

        return "Medium";
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
                .test(password)
        ) {

            alert(
                "Password must contain:\n\n" +
                "• Minimum 8 characters\n" +
                "• One Uppercase Letter\n" +
                "• One Lowercase Letter\n" +
                "• One Number\n" +
                "• One Special Character"
            );

            return;
        }

        if (password !== confirmPassword) {

            alert(
                "Passwords do not match"
            );

            return;
        }

        try {

            const response =
                await axios.post(
                    "https://localhost:8080/api/v1/Auth/register-user",
                    {
                        fullName,
                        email,
                        password,
                        phoneNumber
                    }
                );

            alert(
                response.data.message
            );

            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setPassword("");
            setConfirmPassword("");

            navigate(
                "/verify-email",
                {
                    state: {
                        email: email
                    }
                }
            );

        }
        catch (error) {

            console.log(error);

            alert(
                JSON.stringify(
                    error.response?.data
                ) ||
                "Registration Failed"
            );
        }
    };

    return (
        <>
        <AuthNavbar />
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">


                            <h1 className="text-center mb-4">
                                Create Account
                            </h1>

                            <p className="text-center">
                                Join SimplyFly and start your journey today
                            </p>

                            <form onSubmit={handleRegister}>

                                <div className="mb-3">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) =>
                                            setPhoneNumber(
                                                e.target.value
                                            )
                                        }
                                        placeholder="9876543210"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Password
                                    </label>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Confirm Password
                                    </label>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    />

                                    <span className="ms-2">
                                        Show Password
                                    </span>

                                </div>

                                <p
                                    style={{
                                        fontWeight:
                                            "bold",
                                        color:
                                            getStrength() === "Strong"
                                                ? "green"
                                                : getStrength() === "Medium"
                                                    ? "orange"
                                                    : "red"
                                    }}
                                >
                                    Password Strength:
                                    {" "}
                                    {getStrength()}
                                </p>

                                <div className="mb-3">

                                    <small>
                                        ✓ Minimum 8 Characters
                                    </small>

                                    <br />

                                    <small>
                                        ✓ One Uppercase Letter
                                    </small>

                                    <br />

                                    <small>
                                        ✓ One Lowercase Letter
                                    </small>

                                    <br />

                                    <small>
                                        ✓ One Number
                                    </small>

                                    <br />

                                    <small>
                                        ✓ One Special Character
                                    </small>

                                </div>

                                <button
                                    type="submit"
                                    className="register-btn"
                                >
                                    Create Account →
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            </div>
        </>
    );
}

export default Register;