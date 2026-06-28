import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);
    const navigate = useNavigate();

    const loadBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/v1/Booking/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBookings(response.data);

        }
        catch (error) {

            console.log(error);
            alert("Failed To Load Bookings");
        }
    };

    const cancelBooking = async (bookingId) => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.delete(
                `http://localhost:8080/api/v1/Booking/${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(
                `Booking Cancelled Successfully!\n\nRefund Amount: ₹${response.data.refundAmount}`
            );

            loadBookings();

        }
        catch (error) {

            console.log(error);
            alert("Cancellation Failed");
        }
    };

    return (

        <div className="container mt-4">

            <h1 className="mb-4 text-center">
                ✈️ My Bookings
            </h1>

            {bookings.length === 0 ? (

                <div className="alert alert-info text-center">
                    No Bookings Found
                </div>

            ) : (

                <div className="row">

                    {bookings.map((booking) => (

                        <div
                            key={booking.bookingId}
                            className="col-md-6 mb-4"
                        >

                            <div className="card shadow border-0 h-100">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <h4 className="text-primary">
                                            {booking.flightName}
                                        </h4>

                                        <span className="badge bg-dark">
                                            #{booking.bookingId}
                                        </span>

                                    </div>

                                    <hr />

                                    <p>
                                        <strong>Flight No:</strong>{" "}
                                        {booking.flightNumber}
                                    </p>

                                    <p>
                                        <strong>Route:</strong>{" "}
                                        {booking.fromCity}
                                        {" ✈️ "}
                                        {booking.toCity}
                                    </p>

                                    <p>
                                        <strong>Departure:</strong>{" "}
                                        {new Date(
                                            booking.departureTime
                                        ).toLocaleString()}
                                    </p>

                                    <p>
                                        <strong>Seats:</strong>{" "}
                                        {booking.numberOfSeats}
                                    </p>

                                    <p>
                                        <strong>Total Amount:</strong>{" "}
                                        <span className="text-success fw-bold">
                                            ₹{booking.totalAmount}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Refund Amount:</strong>{" "}

                                        {booking.refundStatus === "Processed" ? (

                                            <span className="text-success fw-bold">
                                                ₹{booking.refundAmount}
                                            </span>

                                        ) : booking.refundStatus === "Pending" ? (

                                            <span className="text-warning fw-bold">
                                                Processing...
                                            </span>

                                        ) : (

                                            <span className="text-muted">
                                                --
                                            </span>

                                        )}
                                    </p>
                                    <p>
                                        <strong>Refund Status:</strong>{" "}

                                        {booking.refundStatus ? (

                                            booking.refundStatus === "Processed" ? (

                                                <span className="badge bg-success">
                                                    Processed
                                                </span>

                                            ) : (

                                                <span className="badge bg-warning text-dark">
                                                    Pending
                                                </span>

                                            )

                                        ) : (

                                            <span className="text-muted">
                                                Not Requested
                                            </span>

                                        )}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{" "}

                                        {booking.bookingStatus?.toLowerCase() === "cancelled" ? (
                                            <span className="badge bg-danger">
                                                Cancelled
                                            </span>
                                        ) : (
                                            <span className="badge bg-success">
                                                Booked
                                            </span>
                                        )}
                                        {booking.refundDate && (

                                            <p>
                                                <strong>Refund Date:</strong>{" "}
                                                {new Date(
                                                    booking.refundDate
                                                ).toLocaleString()}
                                            </p>

                                        )}
                                        {booking.refundReason && (

                                            <p>
                                                <strong>Reason:</strong>{" "}
                                                {booking.refundReason}
                                            </p>

                                        )}
                                    </p>

                                    <p>
                                        <strong>Booking Date:</strong>{" "}
                                        {new Date(
                                            booking.bookingDate
                                        ).toLocaleString()}
                                    </p>
                                    
                                        <button
                                        className="btn btn-primary w-100 mb-2"
                                        onClick={() =>
                                            navigate(
                                                `/ticket/${booking.bookingId}`
                                            )
                                        }
                                        
                                    >
                                        🎫 View Ticket
                                        
                                    </button>

                                    <div className="mt-3">

                                        {booking.bookingStatus?.toLowerCase() === "cancelled" ? (

                                            <button
                                                className="btn btn-secondary w-100"
                                                disabled
                                            >
                                                Ticket Cancelled
                                            </button>

                                        ) : (


                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={() => {

                                                    const confirmCancel =
                                                        window.confirm(
                                                            "Are you sure you want to cancel this booking?"
                                                        );

                                                    if (confirmCancel) {

                                                        cancelBooking(
                                                            booking.bookingId
                                                        );
                                                    }
                                                }}
                                            >
                                                Cancel Booking
                                            </button>

                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default MyBookings;