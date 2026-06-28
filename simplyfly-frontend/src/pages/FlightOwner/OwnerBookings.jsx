import { useEffect, useState } from "react";
import axios from "axios";

function OwnerBookings() {

    const [bookings, setBookings] =
        useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "http://localhost:8080/api/v1/Flights/owner-bookings",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    });

            setBookings(
                response.data
            );
        }
        catch (error) {

            console.log(error);

            alert(
                "Failed To Load Bookings"
            );
        }
    };

    return (
        <div className="owner-dashboard">
            <div className="container mt-4">

        <div className="container mt-4">

            <h1>
                Flight Bookings
            </h1>

            <table
                className="table table-bordered mt-4"
            >

                <thead>

                    <tr>
                        <th>
                            Booking Id
                        </th>

                        <th>
                            User Id
                        </th>

                        <th>
                            Flight Id
                        </th>

                        <th>
                            Seats
                        </th>

                        <th>
                            Amount
                        </th>

                        <th>
                            Status
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {bookings.map((booking) => (

                        <tr
                            key={booking.bookingId}
                        >
                            <td>
                                {booking.bookingId}
                            </td>

                            <td>
                                {booking.userId}
                            </td>

                            <td>
                                {booking.flightId}
                            </td>

                            <td>
                                {booking.numberOfSeats}
                            </td>

                            <td>
                                ₹{booking.totalAmount}
                            </td>

                            <td>
                                {booking.bookingStatus}
                            </td>

                        </tr>

                    ))}

                </tbody>

                    </table>
            </div>
         </div>
        </div>
    );
}

export default OwnerBookings;