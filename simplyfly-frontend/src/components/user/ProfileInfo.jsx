import React from "react";
import "../../styles/Profile.css";

function ProfileInfo({ user }) {

    return (

        <div className="card shadow p-4 mb-4">

            <h3 className="mb-4">
                Personal Information
            </h3>

            <hr />

            <div className="row">

                <div className="col-md-6 mb-3">
                    <strong>👤 Full Name</strong>
                    <p>{user.fullName}</p>
                </div>

                <div className="col-md-6 mb-3">
                    <strong>📧 Email</strong>
                    <p>{user.email}</p>
                </div>

                <div className="col-md-6 mb-3">
                    <strong>📱 Phone Number</strong>
                    <p>{user.phoneNumber}</p>
                </div>

                <div className="col-md-6 mb-3">
                    <strong>🛡 Role</strong>
                    <p>{user.role}</p>
                </div>

                <div className="col-md-6 mb-3">
                    <strong>🎂 Date of Birth</strong>
                    <p>
                        {user.dateOfBirth
                            ? new Date(user.dateOfBirth).toLocaleDateString()
                            : "Not Added"}
                    </p>
                </div>

                <div className="col-md-6 mb-3">
                    <strong>⚧ Gender</strong>
                    <p>{user.gender || "Not Added"}</p>
                </div>

                <div className="col-md-12 mb-3">
                    <strong>🏠 Address</strong>
                    <p>{user.address || "Not Added"}</p>
                </div>

                <div className="col-md-4 mb-3">
                    <strong>🏙 City</strong>
                    <p>{user.city || "Not Added"}</p>
                </div>

                <div className="col-md-4 mb-3">
                    <strong>📍 State</strong>
                    <p>{user.state || "Not Added"}</p>
                </div>

                <div className="col-md-4 mb-3">
                    <strong>🌍 Country</strong>
                    <p>{user.country || "Not Added"}</p>
                </div>

                <div className="col-md-6 mb-3">
                    <strong>📅 Account Created</strong>
                    <p>
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                    </p>
                </div>

                <div className="col-md-6 mb-3">
                    <strong>✅ Email Verification</strong>
                    <p>
                        {user.isEmailVerified
                            ? "Verified ✔"
                            : "Not Verified ❌"}
                    </p>
                </div>

            </div>

        </div>

    );
}

export default ProfileInfo;