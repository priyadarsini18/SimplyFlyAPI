import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function Payment() {

   
const location = useLocation();
const navigate = useNavigate();

    const {
        flight,
        flightId,
        selectedSeats,
        passengers
    } = location.state || {};

const [loading, setLoading] = useState(false);

if (!flight) {
    return (
        <div className="container mt-5">
            <div className="alert alert-danger">
                Flight information not found.
            </div>
        </div>
    );
}

const passengerCount =
    passengers?.length || 1;

const ticketFare =
    flight.price || 0;

const taxes = 500;

const convenienceFee = 250;

const total =
    (ticketFare * passengerCount) +
    taxes +
        convenienceFee;
const payNow = async () => {

    try {

        setLoading(true);

        const orderResponse =
            await api.post(
                "/Payment/create-order",
                {
                    amount: total
                }
            );

        const order = orderResponse.data;

        const options = {

            key: "rzp_test_T3z52kKg47L8s1",

            amount: order.amount,

            currency: order.currency,

            order_id: order.id,

            name: "SimplyFly",

            description: "Flight Booking",

            handler: async function () {

                try {

                    const bookingData = {

                        flightId,

                        numberOfSeats:
                            selectedSeats.length,

                        seatIds:
                            selectedSeats.map(
                                s => s.seatId
                            )

                    };
                    
                    const bookingResponse =
                        await api.post(
                            "/Booking",
                            bookingData
                        );
                    const bookingId =
                        bookingResponse.data.bookingId ??
                        bookingResponse.data.BookingId;

                    await api.post("/Payment", {

                        bookingId: bookingId,

                        amount: total,

                        paymentMethod: "Razorpay",

                        paymentStatus: "Success"

                    });
                    alert("Payment Successful ✅");

                    navigate(`/ticket/${bookingId}`);

                }
                


                catch (error) {

                    console.log(error);

                    if (error.response?.data) {

                        alert(error.response.data);

                        navigate(`/seat-selection/${flightId}`, {
                            state: {
                                flight,
                                passengerCount
                            }
                        });

                    }
                    else {

                        alert("Booking Failed");

                    }

                }

            },

                prefill: {

                    name:
                    localStorage.getItem("name") || "",

                        email:
                    localStorage.getItem("email") || ""

                },

                theme: {

                    color: "#0ea5e9"

                }

            };

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();

        }
        catch (error) {

            console.error(error);

            alert("Payment Failed ❌");

        }
        finally {

            setLoading(false);

        }
    
    };
return (

    <div className="container mt-5">

        <div className="row">

            <div className="col-md-8">

                <div className="card shadow">

                    <div className="card-body">

                        <h3>
                            Payment Details
                        </h3>

                        <hr />

                        <p>
                            Flight:
                            <strong>
                                {" "}
                                {flight.flightName}
                            </strong>
                        </p>

                        <p>
                            Selected Seats:
                            <strong>
                                {" "}
                                {selectedSeats.length}
                            </strong>
                        </p>

                        <p>
                            Passengers:
                            <strong>
                                {" "}
                                {passengerCount}
                            </strong>
                        </p>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div className="card shadow">

                    <div className="card-body">

                        <h3>
                            Fare Summary
                        </h3>

                        <hr />

                        <p>
                            Ticket Fare:
                            ₹
                            {(ticketFare * passengerCount)
                                .toLocaleString()}
                        </p>

                        <p>
                            Passengers:
                            {" "}
                            {passengerCount}
                        </p>

                        <p>
                            Taxes:
                            ₹{taxes}
                        </p>

                        <p>
                            Convenience Fee:
                            ₹{convenienceFee}
                        </p>

                        <hr />

                        <h2 className="text-success">
                            ₹{total.toLocaleString()}
                        </h2>

                        <button
                            className="btn btn-success w-100 mt-3"
                            onClick={payNow}
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Processing..."
                                    : "Pay Now"
                            }
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>
);


}

export default Payment;
