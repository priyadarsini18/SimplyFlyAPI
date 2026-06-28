import { useState, useEffect } from "react";
import {useNavigate,useParams,useLocation} from "react-router-dom";
import axios from "axios";
import api from "../../services/api";
function SeatSelection() {

const navigate = useNavigate();
const location = useLocation();
const { flightId } = useParams();
    console.log("Flight Id =", flightId);
const {
    flight,
    passengerCount
    } = location.state || {};
const [seats, setSeats] = useState([]);
const [selectedSeats, setSelectedSeats] =
        useState([]);
const [seatPreference, setSeatPreference] =
        useState("");

    useEffect(() => {

        if (flightId)
            loadSeats();
        

    }, [flightId]);
    if (!flight) {

        return (
            <div className="container mt-5">
                <h3>No Flight Data Found</h3>
            </div>
        );
    }

    const loadSeats = async () => {

        try {

            console.log("Calling API for Flight =", flightId);

            const response = await api.get(`/Seat/${flightId}`);
            console.log("FULL RESPONSE");
            console.log(response);

            console.log("DATA");
            console.log(response.data);

            setSeats(response.data);

        }
        catch (error) {

            console.log("API ERROR");
            console.log(error);
        }
    };
    const getSeatType = (seatNumber) => {

        const letter = seatNumber.charAt(0);

        if (letter === "A" || letter === "F")
            return "Window";

        if (letter === "B" || letter === "E")
            return "Aisle";

        return "Middle";
    };
    const getSeatPrice = (seatNumber) => {

        const type = getSeatType(seatNumber);

        if (type === "Window")
            return 300;

        if (type === "Aisle")
            return 200;

        return 0;
    };

const selectSeat = (seat) => {

    if (seat.isBooked)
        return;

    const exists =
        selectedSeats.find(
            s => s.seatId === seat.seatId
        );

    if (exists) {

        setSelectedSeats(
            selectedSeats.filter(
                s => s.seatId !== seat.seatId
            )
        );

    } else {

        if (
            selectedSeats.length >=
            passengerCount
        ) {

            alert(
                `You can select only ${passengerCount} seat(s)`
            );

            return;
        }

        setSelectedSeats([
            ...selectedSeats,
            seat
        ]);
    }
};

    const seatCharges =
        selectedSeats.reduce(
            (total, seat) =>
                total +
                getSeatPrice(
                    seat.seatNumber
                ),
            0
        );

    const totalFare =
        (flight.price * passengerCount)
        + seatCharges;
    
   

return (

    <div className="container mt-4">

        <div className="row">

            <div className="col-md-8">

                <div className="card shadow p-4">

                    <h3>
                        ✈️ Select Seats
                    </h3>

                    <p>
                        Passenger Count :
                        <strong>
                            {" "}
                            {passengerCount}
                        </strong>
                    </p>

                    <div className="mb-3">

                        <span className="badge bg-success me-2">
                            Available
                        </span>

                        <span className="badge bg-primary me-2">
                            Selected
                        </span>

                        <span className="badge bg-danger">
                            Booked
                        </span>

                    </div>

                    <hr />

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(6,80px)",
                            gap: "12px"
                        }}
                        
                    >

                        {
                            seats
                                .filter(seat => {

                                    if (!seatPreference)
                                        return true;

                                    return (
                                        getSeatType(
                                            seat.seatNumber
                                        ) === seatPreference
                                    );

                                })
                                .map(seat => (

                                    <button
                                        key={seat.seatId}
                                        onClick={() =>
                                            selectSeat(seat)
                                        }
                                        disabled={seat.isBooked}
                                        className={
                                            seat.isBooked
                                                ? "btn btn-danger"
                                                : selectedSeats.some(
                                                    s =>
                                                        s.seatId ===
                                                        seat.seatId
                                                )
                                                    ? "btn btn-primary"
                                                    : "btn btn-outline-success"
                                        }
                                    >
                                        {seat.seatNumber}
                                    </button>

                                ))
                        }

                    </div>
                </div> {/* Card */}

            </div> {/* col-md-8 */}

            

            <div className="col-md-4">

                <div className="card shadow">

                    <div className="card-body">

                        <h4>
                            Selected Seats
                        </h4>

                        <hr />
                        <label className="form-label">
                            Seat Preference
                        </label>

                        <select
                            className="form-control mb-3"
                            value={seatPreference}
                            onChange={(e) =>
                                setSeatPreference(e.target.value)
                            }
                        >
                            <option value="">
                                All Seats
                            </option>

                            <option value="Window">
                                Window
                            </option>

                            <option value="Aisle">
                                Aisle
                            </option>

                            <option value="Middle">
                                Middle
                            </option>

                            
                        </select>

                        
                            {
                                selectedSeats.length === 0
                                    ? (
                                        <p>No Seats Selected</p>
                                    )
                                    : (
                                            selectedSeats.map(seat => (

                                                <div
                                                    key={seat.seatId}
                                                    className="mb-2"
                                                >

                                                    <strong>
                                                        {seat.seatNumber}
                                                    </strong>

                                                    {" - "}

                                                    {getSeatType(
                                                        seat.seatNumber
                                                    )}

                                                    {" "}

                                                    (
                                                    ₹
                                                    {getSeatPrice(
                                                        seat.seatNumber
                                                    )}
                                                    )

                                                </div>

                                            ))

                                    )
                            }
                        

                            <p>
                                Base Fare :
                                ₹
                                {(
                                    flight.price *
                                    passengerCount
                                ).toLocaleString()}
                            </p>

                            <p>
                                Seat Charges :
                                ₹
                                {seatCharges.toLocaleString()}
                            </p>

                            <h5 className="text-success">

                                Total Fare :
                                ₹
                                {totalFare.toLocaleString()}

                            </h5>

                        <hr />

                        <button
                            className="btn btn-success w-100"
                            disabled={
                                selectedSeats.length !== passengerCount
                            }
                            onClick={() => {

                                navigate(
                                    "/passenger-details",
                                    {
                                        state: {
                                            selectedSeats,
                                            seatPreference,
                                            seatCharges,
                                            totalFare,
                                            flightId,
                                            flight,
                                            passengerCount
                                        }
                                    }
                                );

                            }}
                        >
                            Continue To Passenger Details
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>
);


}

export default SeatSelection;
