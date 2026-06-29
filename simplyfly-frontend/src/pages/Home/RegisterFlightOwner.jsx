import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterFlightOwner() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registrationKey, setRegistrationKey] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://localhost:8080/api/v1/Auth/register-flightowner",
                {
                    fullName,
                    email,
                    password,
                    phoneNumber,
                    registrationKey
                }
            );

            alert(response.data.message);

            navigate("/verify-email", {
                state: {
                    email: response.data.email
                }
            });

        }
        catch (error) {

            alert(
                error.response?.data ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Flight Owner Registration
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                required
                            />

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                required
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Flight Owner Registration Key"
                                value={registrationKey}
                                onChange={(e) =>
                                    setRegistrationKey(e.target.value)
                                }
                                required
                            />

                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                            >
                                Register Flight Owner
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RegisterFlightOwner;