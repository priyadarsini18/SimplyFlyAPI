import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const response =
                await axios.post(
                    "https://localhost:7213/api/Auth/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login Successful");

        }
        catch {

            alert("Login Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card p-4">

                <h2>Login</h2>

                <input
                    className="form-control mt-3"
                    placeholder="Email"
                    onChange={(e) =>
                        setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mt-3"
                    placeholder="Password"
                    onChange={(e) =>
                        setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={login}
                >
                    Login
                </button>

            </div>

        </div>

    )

}

export default Login;