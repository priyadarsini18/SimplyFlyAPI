import React from "react";
import "../../styles/Profile.css";

function RecentBookings({ bookings }) {

    return (

        <div className="card shadow p-4">

            <h3>
                Recent Bookings
            </h3>

            <hr />

            {
                bookings.length === 0
                    ? (
                        <p>
                            No Bookings Found
                        </p>
                    )
                    : (
                        <table className="table">

                            <thead>

                                <tr>

                                    <th>
                                        Booking ID
                                    </th>

                                    <th>
                                        Flight ID
                                    </th>

                                    <th>
                                        Seats
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    bookings
                                        .sort(
                                            (a, b) =>
                                                b.bookingId - a.bookingId
                                        )
                                        .slice(0, 5)
                                        .map(
                                            booking => (

                                                <tr
                                                    key={
                                                        booking.bookingId
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            booking.bookingId
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            booking.flightId
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            booking.numberOfSeats
                                                        }
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                booking.bookingStatus ===
                                                                    "Cancelled"
                                                                    ? "badge bg-danger"
                                                                    : "badge bg-success"
                                                            }
                                                        >
                                                            {
                                                                booking.bookingStatus
                                                            }
                                                        </span>

                                                    </td>

                                                </tr>

                                            )
                                        )
                                }

                            </tbody>

                        </table>
                    )
            }

        </div>
    );
}

export default RecentBookings;