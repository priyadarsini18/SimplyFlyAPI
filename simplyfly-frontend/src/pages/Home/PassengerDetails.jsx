import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
function PassengerDetails() {

    const location = useLocation();
    const navigate = useNavigate();
    const {
        selectedSeats,
        flightId,
        flight
    } = location.state || {};

    const [passengers, setPassengers] = useState(
        selectedSeats?.map(() => ({
            firstName: "",
            lastName: "",
            age: "",
            gender: "Male"
        })) || []
    );

    const handleChange = (
        index,
        field,
        value
    ) => {

        const updated =
            [...passengers];

        updated[index][field] = value;

        setPassengers(updated);
    };

    const continueToPayment = async () => {

        try {

            // Reserve every selected seat
            for (const seat of selectedSeats) {

                await api.post("/SeatReservation", {

                    flightId: flightId,

                    seatNumber: seat.seatNumber

                });

            }

            // If all seats are reserved successfully,
            // continue to payment
            navigate("/payment", {

                state: {

                    flight,
                    flightId,
                    selectedSeats,
                    passengers

                }

            });

        }
        catch (error) {

            console.log("FULL ERROR:", error);

            console.log("Response:", error.response);

            console.log("Data:", error.response?.data);

            alert(JSON.stringify(error.response?.data));

        }
        

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-body">

                    <h2>
                        Passenger Details
                    </h2>

                    <hr />

                    {passengers.map(
                        (passenger, index) => (

                            <div
                                key={index}
                                className="border rounded p-3 mb-4"
                            >

                                <h5>
                                    Passenger {index + 1}
                                </h5>

                                <div className="row">

                                    <div className="col-md-3">
                                        <input
                                            className="form-control"
                                            placeholder="First Name"
                                            value={passenger.firstName}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "firstName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <input
                                            className="form-control"
                                            placeholder="Last Name"
                                            value={passenger.lastName}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "lastName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Age"
                                            value={passenger.age}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "age",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <select
                                            className="form-control"
                                            value={passenger.gender}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "gender",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option>
                                                Male
                                            </option>

                                            <option>
                                                Female
                                            </option>

                                            <option>
                                                Other
                                            </option>

                                        </select>
                                    </div>

                                </div>

                            </div>

                        )
                    )}

                    <button
                        className="btn btn-success"
                        onClick={continueToPayment}
                    >
                        Continue To Payment
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PassengerDetails;