import { useState } from "react";
import axios from "axios";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

function ResetPassword() {

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [showPassword,
        setShowPassword] =
        useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    const email =
        location.state?.email;

    const getStrength = () => {

        if (newPassword.length < 6)
            return "Weak";

        if (
            /[A-Z]/.test(newPassword) &&
            /[a-z]/.test(newPassword) &&
            /[0-9]/.test(newPassword) &&
            /[@$!%*?&]/.test(newPassword) &&
            newPassword.length >= 8
        )
            return "Strong";

        return "Medium";
    };

    const resetPassword = async () => {

        if (newPassword !== confirmPassword) {

            alert(
                "Passwords do not match"
            );

            return;
        }

        try {

            await axios.post(
                "http://localhost:8080/api/v1/Auth/reset-password",
                {
                    email,
                    newPassword
                }
            );

            alert(
                "Password Updated Successfully"
            );

            navigate("/login");
        }
        catch {

            alert(
                "Failed to reset password"
            );
        }
    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{
                    maxWidth: "500px"
                }}
            >

                <h3 className="text-center mb-4">
                    Reset Password
                </h3>

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    className="form-control mb-3"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(
                            e.target.value
                        )
                    }
                />

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    className="form-control mb-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                />

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
                        fontWeight: "bold",
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
                    className="btn btn-primary w-100"
                    onClick={resetPassword}
                >
                    Reset Password
                </button>

            </div>

        </div>
    );
}

export default ResetPassword;