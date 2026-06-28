import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile() {

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        profileImage: ""
    });

    useEffect(() => {

        const userId =
            localStorage.getItem("userId");

        axios
            .get(
                `http://localhost:8080/api/v1/User/${userId}`
            )
            .then(res => {

                setUser(res.data);

            });

    }, []);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]:
                e.target.value
        });
    };
    const uploadImage = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await axios.post(
                "http://localhost:8080/api/v1/User/upload-profile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setUser({
                ...user,
                profileImage: response.data.imageUrl
            });

            alert("Image Uploaded Successfully");

        }
        catch {

            alert("Image Upload Failed");
        }
    };

    const saveProfile = async () => {

        try {

            await axios.put(
                `http://localhost:8080/api/v1/User/${user.userId}`,
                user
            );

            alert(
                "Profile Updated Successfully"
            );

        }
        catch {

            alert(
                "Update Failed"
            );
        }
    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2>Edit Profile</h2>

                <hr />

                <input
                    className="form-control mb-3"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    className="form-control mb-3"
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth || ""}
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="gender"
                    value={user.gender || ""}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    className="form-control mb-3"
                    placeholder="Address"
                    name="address"
                    value={user.address || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="City"
                    name="city"
                    value={user.city || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="State"
                    name="state"
                    value={user.state || ""}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Country"
                    name="country"
                    value={user.country || ""}
                    onChange={handleChange}
                />
                <label className="form-label">
                    Profile Image
                </label>

                <input
                    type="file"
                    className="form-control mb-3"
                    accept="image/*"
                    onChange={uploadImage}
                />
                {
                    user.profileImage &&
                    <img
                        src={`http://localhost:8080${user.profileImage}`}
                        alt="Profile"
                        width="150"
                        className="rounded-circle mb-3"
                    />
                }
                <button
                    className="btn btn-success"
                    onClick={saveProfile}
                >
                    Save Changes
                </button>

            </div>

        </div>
    );
}

export default EditProfile;