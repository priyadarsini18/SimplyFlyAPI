import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {e.preventDefault();

        try {

            const response = await axios.post(
                "https://localhost:8080/api/v1/Auth/login",
                {
                    email,
                    password
                }
            );

            // Only allow this email
            if (email !== "admin@simplyfly.com") {
                alert("Access Denied. Not an Admin.");
                return;
            }

            localStorage.setItem(
                "adminToken",
                response.data.token
            );

            alert("Admin Login Successful");

            navigate("/admin");

        } catch (error) {

            console.log(error);

            alert("Invalid Admin Credentials");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                🛠️ Admin Login
                            </h2>

                            <form onSubmit={handleAdminLogin}>

                                <div className="mb-3">
                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100"
                                >
                                    Admin Login
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminLogin;