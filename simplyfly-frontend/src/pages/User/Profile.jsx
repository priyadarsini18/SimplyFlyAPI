import React, { useEffect, useState } from "react";
import axios from "axios";

import ProfileSidebar from "../../components/user/ProfileSidebar";
import ProfileHeader from "../../components/user/ProfileHeader";
import ProfileStats from "../../components/user/ProfileStats";
import ProfileInfo from "../../components/user/ProfileInfo";
import RecentBookings from "../../components/user/RecentBookings";

import "../../styles/Profile.css";

function Profile() {

    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        loadProfile();
        loadBookings();

    }, []);

    const loadProfile = async () => {

        try {

            const userId =
                localStorage.getItem("userId");

            const response =
                await axios.get(
                    `https://localhost:8080/api/v1/User/${userId}`
                );

            setUser(response.data);

        }
        catch (error) {

            console.log(error);
        }
    };

    const loadBookings = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "https://localhost:8080/api/v1/Booking/my-bookings",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setBookings(response.data);

        }
        catch (error) {

            console.log(error);
        }
    };

    if (!user) {

        return (
            <div className="text-center mt-5">
                <h3>Loading Profile...</h3>
            </div>
        );
    }

    return (

        <div className="profile-page">

            <ProfileSidebar user={user} />

            <div className="profile-content">

                <ProfileHeader user={user} />

                <ProfileStats bookings={bookings} />

                <ProfileInfo user={user} />

                <RecentBookings bookings={bookings} />

            </div>

        </div>
    );
}

export default Profile;