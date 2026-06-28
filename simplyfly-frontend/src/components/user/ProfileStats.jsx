import React from "react";
import "../../styles/Profile.css";

function ProfileStats({ bookings }) {

    const totalBookings =
        bookings.length;

    const activeBookings =
        bookings.filter(
            b =>
                b.bookingStatus !==
                "Cancelled"
        ).length;

    const cancelledBookings =
        bookings.filter(
            b =>
                b.bookingStatus ===
                "Cancelled"
        ).length;

    return (

        <div className="row mb-4">

            <div className="col-md-4">

                <div className="card shadow text-center p-3">

                    <h3>
                        {totalBookings}
                    </h3>

                    <p>
                        Total Bookings
                    </p>

                </div>

            </div>

            <div className="col-md-4">

                <div className="card shadow text-center p-3">

                    <h3>
                        {activeBookings}
                    </h3>

                    <p>
                        Active Bookings
                    </p>

                </div>

            </div>

            <div className="col-md-4">

                <div className="card shadow text-center p-3">

                    <h3>
                        {cancelledBookings}
                    </h3>

                    <p>
                        Cancelled
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ProfileStats;