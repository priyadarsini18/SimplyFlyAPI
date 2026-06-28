import { useState } from "react";
import axios from "axios";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

function VerifyOtp() {

    const [otp, setOtp] =
        useState("");

    const location =
        useLocation();

    const navigate =
        useNavigate();

    const email =
        location.state.email;

    const verifyOtp =
        async () => {

            try {

                await axios.post(
                    "http://localhost:8080/api/v1/Auth/verify-otp",
                    {
                        email,
                        otp
                    }
                );

                alert("OTP Verified");

                navigate(
                    "/reset-password",
                    {
                        state: { email }
                    }
                );
            }
            catch {
                alert("Invalid OTP");
            }
        };

    return (
        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h3>Verify OTP</h3>

                <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                        setOtp(e.target.value)
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={verifyOtp}
                >
                    Verify OTP
                </button>

            </div>

        </div>
    );
}

export default VerifyOtp;