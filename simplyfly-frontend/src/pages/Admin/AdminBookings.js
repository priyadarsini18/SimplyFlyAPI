import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminTheme.css";
function AdminBookings() {

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const response =
                await API.get("/Admin/bookings");

            setBookings(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Failed To Load Bookings");

        }
    };

    const cancelBooking = async (id) => {

        const confirmCancel =
            window.confirm(
                "Cancel this booking?"
            );

        if (!confirmCancel)
            return;

        try {

            await API.delete(
                `/Booking/${id}`
            );

            alert(
                "Booking Cancelled Successfully"
            );

            loadBookings();

        }
        catch (error) {

            console.log(error);

            alert(
                "Cancellation Failed"
            );

        }
    };

    const filteredBookings =
        bookings.filter(
            (booking) =>
                booking.bookingId
                    .toString()
                    .includes(search) ||

                booking.userId
                    .toString()
                    .includes(search) ||

                booking.flightId
                    .toString()
                    .includes(search)
        );

    return (
        <div className="admin-page">


        <div className="container mt-5">

            <h1 className="mb-4">
                🎟 Manage Bookings
            </h1>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search Booking ID, User ID or Flight ID"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <table className="table table-bordered table-striped shadow">

                <thead className="table-dark">

                    <tr>

                        <th>Booking ID</th>
                        <th>User ID</th>
                        <th>Flight ID</th>
                        <th>Seats</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Booking Date</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredBookings.map(
                            (booking) => (

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

                                        <span
                                            className={
                                                booking.bookingStatus === "Booked"
                                                    ? "badge bg-success"
                                                    : "badge bg-danger"
                                            }
                                        >
                                            {booking.bookingStatus}
                                        </span>

                                    </td>

                                    <td>
                                        {
                                            new Date(
                                                booking.bookingDate
                                            ).toLocaleDateString()
                                        }
                                    </td>

                                    <td>

                                        {
                                            booking.bookingStatus === "Booked" &&
                                            (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        cancelBooking(
                                                            booking.bookingId
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            )
                                        }

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>
            </div>
        </div>

    );
}

export default AdminBookings;