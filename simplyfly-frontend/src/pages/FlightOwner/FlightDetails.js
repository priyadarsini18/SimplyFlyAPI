import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FlightDetails() {

   
const { id } = useParams();
const navigate = useNavigate();

const [flight, setFlight] = useState(null);
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [cabinClass, setCabinClass] =
        useState(flight?.cabinClass || "Economy");

    const [extraBaggage, setExtraBaggage] =
        useState(0);

    const [mealType, setMealType] =
        useState("Standard");

useEffect(() => {
    loadFlight();
}, [id]);

const loadFlight = async () => {

    try {

        const response = await axios.get(
            `https://localhost:8080/api/v1/Flights/${id}`
        );

        setFlight(response.data);
        console.log(flight);

} catch (error) {

    console.log(error);
}
};

if (!flight) {

    return (
        <div className="container mt-5">
            <h3>Loading Flight...</h3>
        </div>
    );
}

    const baseFare =
        flight.price * numberOfSeats;

    const classCharge =
        cabinClass === "Business"
            ? 2000 * numberOfSeats
            : cabinClass === "First Class"
                ? 5000 * numberOfSeats
                : 0;

    const baggageCharge =
        extraBaggage === 10
            ? 500
            : extraBaggage === 20
                ? 1000
                : extraBaggage === 30
                    ? 1500
                    : 0;

    const mealCharge =
        mealType === "Veg Premium"
            ? 250 * numberOfSeats
            : mealType === "Non Veg Premium"
                ? 350 * numberOfSeats
                : 0;

    const totalFare =
        baseFare +
        classCharge +
        baggageCharge +
        mealCharge;
    const durationInMinutes =
        Math.floor(
            (
                new Date(flight.arrivalTime) -
                new Date(flight.departureTime)
            ) / (1000 * 60)
        );

    const hours =
        Math.floor(durationInMinutes / 60);

    const minutes =
        durationInMinutes % 60;

return (

    <div className="container mt-4">

        <div className="card shadow-lg border-0">

            <div className="card-body p-4">

                <h2 className="mb-4">
                    ✈️ {flight.flightName}
                </h2>

                <div className="row">

                    <div className="col-md-8">

                        <div
                            className="p-4 rounded"
                            style={{
                                background: "#F8FBFF",
                                border: "1px solid #D6EFFF"
                            }}
                        >

                            <div className="row">

                                <div className="col-md-4">

                                    <h4>
                                        {flight.fromCity}
                                    </h4>

                                    <small>
                                        Departure
                                    </small>

                                    <p>
                                        {new Date(
                                            flight.departureTime
                                        ).toLocaleString()}
                                    </p>

                                </div>

                                <div className="col-md-4 text-center">

                                    <h3>✈️</h3>

                                    <p>
                                        Flight No:
                                        {" "}
                                        {flight.flightNumber}
                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <h4>
                                        {flight.toCity}
                                    </h4>

                                    <small>
                                        Arrival
                                    </small>

                                    <p>
                                        {new Date(
                                            flight.arrivalTime
                                        ).toLocaleString()}
                                    </p>

                                </div>
                                <hr />

                                <div className="mt-3">

                                    <h5 className="text-primary">
                                        🛫 Airport Information
                                    </h5>
                                    <div
                                        className="mt-4 p-4 rounded"
                                        style={{
                                            background: "#F7F9FC",
                                            border: "1px solid #DDE5F0"
                                        }}
                                    >

                                       

                                        <hr />

                                        <label>Cabin Class</label>

                                        <select
                                            className="form-control mb-3"
                                            value={cabinClass}
                                            onChange={(e) =>
                                                setCabinClass(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Economy">
                                                Economy
                                            </option>

                                            <option value="Business">
                                                Business (+₹5000)
                                            </option>

                                            <option value="First Class">
                                                First Class (+₹12000)
                                            </option>

                                        </select>

                                        <label>Extra Baggage (kg)</label>

                                        <select
                                            className="form-control mb-3"
                                            value={extraBaggage}
                                            onChange={(e) =>
                                                setExtraBaggage(
                                                    Number(e.target.value)
                                                )
                                            }
                                        >

                                            <option value="0">
                                                No Extra Baggage
                                            </option>

                                            <option value="10">
                                                +10kg (₹500)
                                            </option>

                                            <option value="20">
                                                +20kg (₹1000)
                                            </option>

                                            <option value="30">
                                                +30kg (₹1500)
                                            </option>

                                        </select>

                                        <label>Meal Preference</label>

                                        <select
                                            className="form-control"
                                            value={mealType}
                                            onChange={(e) =>
                                                setMealType(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Standard">
                                                Standard Meal
                                            </option>

                                            <option value="Veg Premium">
                                                Veg Premium (+₹250)
                                            </option>

                                            <option value="Non Veg Premium">
                                                Non Veg Premium (+₹350)
                                            </option>

                                        </select>

                                    </div>
                                    <hr />

                                    <h5 className="text-primary">
                                        Flight Information
                                    </h5>
                                    <div className="mb-3">

                                        <span className="badge bg-primary me-2">
                                            Flight No:
                                            {" "}
                                            {flight.flightNumber}
                                        </span>

                                        <span className="badge bg-success">
                                            {flight.status}
                                        </span>

                                    </div>
                                    <h5 className="text-primary mb-4">
                                        ✈ Flight Information
                                    </h5>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <p>
                                                💺 <strong>Cabin Class:</strong>
                                                {" "}
                                                {cabinClass}
                                            </p>

                                            <p>
                                                🌍 <strong>Flight Type:</strong>
                                                {" "}
                                                <span
                                                    className={
                                                        flight.flightType === "International"
                                                            ? "badge bg-danger"
                                                            : "badge bg-info"
                                                    }
                                                >
                                                    {flight.flightType || "Domestic"}
                                                </span>
                                            </p>

                                            <div className="mb-2">
                                                <p>
                                                    ✈ <strong>Journey:</strong>{" "}
                                                    {flight.journeyType || "Non Stop"}
                                                </p>

                                                {flight.journeyType === "1 Stop" && flight.stop1 && (
                                                    <p className="ms-3 text-primary">
                                                        📍 Stop : <strong>{flight.stop1}</strong>
                                                    </p>
                                                )}

                                                {flight.journeyType === "2 Stops" && (
                                                    <>
                                                        <p className="ms-3 text-primary">
                                                            📍 Stop 1 : <strong>{flight.stop1}</strong>
                                                        </p>

                                                        <p className="ms-3 text-primary">
                                                            📍 Stop 2 : <strong>{flight.stop2}</strong>
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <p>
                                                ⏱ <strong>Duration:</strong>
                                                {" "}
                                                {hours}h {minutes}m
                                            </p>

                                        </div>

                                        <div className="col-md-6">

                                            <p>
                                                🍽 <strong>Meal:</strong>
                                                {" "}
                                                <span className="badge bg-warning text-dark">
                                                    {mealType}
                                                </span>

                                            </p>

                                            <p>
                                                🧳 <strong>Cabin Baggage:</strong>
                                                {" "}
                                                {flight.cabinBaggageKg} kg
                                            </p>

                                            <p>
                                                🎒 <strong>Extra Baggage:</strong>
                                                {" "}
                                                {extraBaggage} kg
                                            </p>

                                        </div>

                                    </div>

                                    <hr />

                                    <h6 className="text-secondary">
                                        🛫 Airport Details
                                    </h6>

                                    <p>
                                        <strong>Departure Airport:</strong>
                                        {" "}
                                        {flight.fromAirportName}
                                        {" "}
                                        ({flight.fromAirportCode})
                                    </p>

                                    <p>
                                        <strong>Arrival Airport:</strong>
                                        {" "}
                                        {flight.toAirportName}
                                        {" "}
                                        ({flight.toAirportCode})
                                    </p>
                                    
                                    

                                </div>

                            </div>

                        </div>

                        <div
                            className="mt-4 p-4 rounded"
                            style={{
                                background: "#FFFDF6",
                                border: "1px solid #FFE8A3"
                            }}
                        >

                            <h5>
                                🧳 Baggage Information
                            </h5>

                            <p>
                                Cabin:
                                {" "}
                                {flight.cabinBaggageKg}
                                kg / Adult
                            </p>

                            <p>
                                Check-In:
                                {" "}
                                {flight.checkInBaggageKg}
                                kg / Adult
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow-sm">

                            <div className="card-body">

                                <h4>
                                    Fare Summary
                                </h4>

                                <hr />
                                <p>
                                    Passengers:
                                    {numberOfSeats}
                                </p>
                                <p>
                                    Base Fare:
                                    ₹{baseFare.toLocaleString()}
                                </p>

                                <p>
                                    Cabin Upgrade:
                                    ₹{classCharge.toLocaleString()}
                                </p>

                                <p>
                                    Extra Baggage:
                                    ₹{baggageCharge.toLocaleString()}
                                </p>

                                <p>
                                    Meals:
                                    ₹{mealCharge.toLocaleString()}
                                </p>
                                <p>
                                    Selected Class:
                                    <strong>{cabinClass}</strong>
                                </p>

                                <p>
                                    Extra Baggage:
                                    <strong>{extraBaggage} kg</strong>
                                </p>

                                <p>
                                    Meal:
                                    <strong>{mealType}</strong>
                                </p>

                                <hr />

                                <h3 className="text-success">

                                    ₹{totalFare.toLocaleString()}

                                </h3>
                            </div>

                        </div>

                        <div className="card mt-3">

                            <div className="card-body">

                                <h5>
                                    Seat Count
                                </h5>

                                <input
                                    type="number"
                                    min="1"
                                    max={flight.availableSeats}
                                    className="form-control"
                                    value={numberOfSeats}
                                    onChange={(e) => {

                                        const value = Number(e.target.value);

                                        if (value < 1)
                                            return;

                                        if (value > flight.availableSeats)
                                            return;

                                        setNumberOfSeats(value);
                                    }}
                                />

                                <p className="mt-3">

                                    Available:
                                    {" "}

                                    <strong>
                                        {flight.availableSeats}
                                    </strong>

                                </p>

                                <button
                                    className="btn btn-success w-100 mt-3"
                                    disabled={
                                        flight.status === "Cancelled"
                                    }
                                    onClick={() =>
                                        navigate(
                                            `/seat-selection/${flight.flightId}`,
                                            {
                                                state: {
                                                    flight,
                                                    passengerCount: numberOfSeats,
                                                    cabinClass,
                                                    extraBaggage,
                                                    mealType,
                                                    totalFare
                                                }
                                            }
                                        )
                                    }
                                >
                                    Continue To Seat Selection
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
);


}

export default FlightDetails;
