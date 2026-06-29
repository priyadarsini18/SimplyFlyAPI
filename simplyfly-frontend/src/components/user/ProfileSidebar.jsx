import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile.css";

function ProfileSidebar({ user }) {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();
        navigate("/login");
    };

    return (

        <div className="profile-sidebar">

            <div className="sidebar-user">

                <img
                    src={
                        user.profileImage
                            ? `https://localhost:8080${user.profileImage}`
                            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="User"
                />

                <h3>{user.fullName}</h3>

                <p>{user.role}</p>

            </div>

            <ul>

                <li onClick={() => navigate("/profile")}>
                    👤 My Profile
                </li>

                <li onClick={() => navigate("/my-bookings")}>
                    ✈ My Bookings
                </li>

                <li onClick={() => navigate("/travel-history")}>
                    🧳 Travel History
                </li>

                <li onClick={() => navigate("/saved-flights")}>
                    ❤️ Saved Flights
                </li>

                <li onClick={() => navigate("/settings")}>
                    ⚙ Settings
                </li>

                <li onClick={logout}>
                    🚪 Logout
                </li>

            </ul>

        </div>
    );
}

export default ProfileSidebar;