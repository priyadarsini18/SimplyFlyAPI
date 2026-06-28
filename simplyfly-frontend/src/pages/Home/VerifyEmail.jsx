import { useState } from "react";
import axios from "axios";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

function VerifyEmail() {

    const [otp, setOtp] =
        useState("");

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const email =
        location.state?.email;

    const verifyEmail =
        async () => {

            try {

                const response =
                    await axios.post(
                        "http://localhost:8080/api/v1/Auth/verify-email",
                        {
                            email,
                            otp: otp.toString()
                        }
                    );

                alert(
                    response.data
                );

                navigate("/login");
            }
            catch (error) {

                alert(
                    error.response?.data ||
                    "Verification Failed"
                );
            }
        };

    return (

        <div
            className="container mt-5"
        >

            <div
                className="card shadow p-4 mx-auto"
                style={{
                    maxWidth: "500px"
                }}
            >

                <h2
                    className="text-center mb-3"
                >
                    Verify Email
                </h2>

                <p
                    className="text-center text-muted"
                >
                    Enter the OTP sent to
                    <br />
                    <strong>
                        {email}
                    </strong>
                </p>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                        setOtp(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={
                        verifyEmail
                    }
                >
                    Verify Email
                </button>

            </div>

        </div>
    );
}

export default VerifyEmail;