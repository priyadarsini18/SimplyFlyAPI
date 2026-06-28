import React from "react";
import "../../styles/Profile.css";
import { useNavigate } from "react-router-dom";
function ProfileHeader({ user }) {
    const navigate = useNavigate();
    return (
        <div className="profile-card">
            <div>
                <h1>{user.fullName}</h1>

                <p>{user.email}</p>

                <p>{user.phoneNumber}</p>
            </div>

            <div className="edit-profile-btn">
                <button
                    className="btn btn-primary mb-5"
                    onClick={() => navigate("/edit-profile")}
                >
                    Edit Profile
                </button>
            </div>       </div>
    );
}

export default ProfileHeader;