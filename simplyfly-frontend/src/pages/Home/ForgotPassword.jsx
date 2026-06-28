import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const sendOtp = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/v1/Auth/forgot-password",
                {
                    email
                }
            );

            alert("OTP Sent Successfully");

            navigate("/verify-otp", {
                state: { email }
            });
        }
        catch {
            alert("Failed to send OTP");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">

                <h3>Forgot Password</h3>

                <input
                    type="email"
                    className="form-control my-3"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={sendOtp}
                >
                    Send OTP
                </button>

            </div>
        </div>
    );
}

export default ForgotPassword;