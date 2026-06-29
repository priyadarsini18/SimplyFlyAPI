import { useState, useEffect } from "react";
import axios from "axios";

function OwnerAddFlight() {

    const [flightName, setFlightName] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const [fromAirportName, setFromAirportName] = useState("");
    const [fromAirportCode, setFromAirportCode] = useState("");

    const [toAirportName, setToAirportName] = useState("");
    const [toAirportCode, setToAirportCode] = useState("");
    const [routeId, setRouteId] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [price, setPrice] = useState("");
    const [totalSeats, setTotalSeats] = useState("");
    const [availableSeats, setAvailableSeats] = useState("");
    const [status, setStatus] = useState("Available");

    const [routes, setRoutes] = useState([]);
    const [cabinBaggageKg,setCabinBaggageKg] =
        useState(7);
    const [availableClasses, setAvailableClasses] =
        useState([]);

    const [flightType, setFlightType] =
        useState("Domestic");

    const [journeyType, setJourneyType] =
        useState("Non Stop");
    const [stop1, setStop1] =
        useState("");

    const [stop2, setStop2] =
        useState("");
    const [foodIncluded, setFoodIncluded] =
        useState(false);

    const [checkInBaggageKg,
        setCheckInBaggageKg] =
        useState(15);
    useEffect(() => {
        loadRoutes();
    }, []);

    const loadRoutes = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "https://localhost:8080/api/v1/Route",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            console.log("Routes:", response.data);

            if (Array.isArray(response.data)) {
                setRoutes(response.data);
            }
            else if (response.data.data) {
                setRoutes(response.data.data);
            }

        }
        catch (error) {
            console.log(error);
        }
    };
    const handleCabinClassChange = (value) => {

        if (availableClasses.includes(value)) {

            setAvailableClasses(
                availableClasses.filter(
                    x => x !== value
                )
            );
        }
        else {

            setAvailableClasses([
                ...availableClasses,
                value
            ]);
        }
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (availableClasses.length === 0) {

            alert("Please select at least one cabin class");

            return;
        }

        if (!routeId) {

            alert("Please Select Route");
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            await axios.post(
                "https://localhost:8080/api/v1/Flights",
                {
                    flightName,
                    flightNumber,
                    fromCity,
                    toCity,
                    fromAirportName,
                    fromAirportCode,
                    toAirportName,
                    toAirportCode,
                    routeId: Number(routeId),
                    departureTime,
                    arrivalTime,
                    price: Number(price),
                    totalSeats: Number(totalSeats),
                    availableSeats: Number(availableSeats),
                    cabinClass: availableClasses.join(","),

                    flightType,
                    journeyType,

                    stop1,
                    stop2,

                    foodIncluded,
                    status,
                    cabinBaggageKg:
                        Number(cabinBaggageKg),

                    checkInBaggageKg:
                        Number(checkInBaggageKg)
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Flight Added Successfully"
            );

            setFlightName("");
            setFlightNumber("");
            setFromCity("");
            setToCity("");
            setRouteId("");
            setDepartureTime("");
            setArrivalTime("");
            setPrice("");
            setTotalSeats("");
            setAvailableSeats("");
            setStatus("Available");
            setCabinBaggageKg(7);

            setCheckInBaggageKg(15);
            setAvailableClasses([]);

            setStop1("");

            setStop2("");

            setJourneyType("Non Stop");

            setFlightType("Domestic");

            setFoodIncluded(false);

        }
        catch (error) {

            console.log(error);
            console.log(error.response?.data);

            alert(
                JSON.stringify(
                    error.response?.data
                )
            );
        }
    };

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Add Flight
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        placeholder="Flight Name"
                        value={flightName}
                        onChange={(e) =>
                            setFlightName(e.target.value)
                        }
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Flight Number"
                        value={flightNumber}
                        onChange={(e) =>
                            setFlightNumber(e.target.value)
                        }
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="From City"
                        value={fromCity}
                        onChange={(e) =>
                            setFromCity(e.target.value)
                        }
                        required
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="From Airport Name"
                        value={fromAirportName}
                        onChange={(e) =>
                            setFromAirportName(e.target.value)
                        }
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="From Airport Code (MAA)"
                        value={fromAirportCode}
                        onChange={(e) =>
                            setFromAirportCode(e.target.value)
                        }
                        required
                    />
                    

                    <input
                        className="form-control mb-3"
                        placeholder="To City"
                        value={toCity}
                        onChange={(e) =>
                            setToCity(e.target.value)
                        }
                        required
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="To Airport Name"
                        value={toAirportName}
                        onChange={(e) =>
                            setToAirportName(e.target.value)
                        }
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="To Airport Code (DEL)"
                        value={toAirportCode}
                        onChange={(e) =>
                            setToAirportCode(e.target.value)
                        }
                        required
                    />

                    <select
                        className="form-control mb-3"
                        value={routeId}
                        onChange={(e) =>
                            setRouteId(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Select Route
                        </option>

                        {routes.map((route) => (

                            <option
                                key={route.routeId}
                                value={route.routeId}
                            >
                                {route.source} → {route.destination}
                            </option>

                        ))}
                    </select>

                    <label className="mb-1">
                        Departure Time
                    </label>

                    <input
                        type="datetime-local"
                        className="form-control mb-3"
                        value={departureTime}
                        onChange={(e) =>
                            setDepartureTime(
                                e.target.value
                            )
                        }
                        required
                    />

                    <label className="mb-1">
                        Arrival Time
                    </label>

                    <input
                        type="datetime-local"
                        className="form-control mb-3"
                        value={arrivalTime}
                        onChange={(e) =>
                            setArrivalTime(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Price"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        required
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Total Seats"
                        value={totalSeats}
                        onChange={(e) =>
                            setTotalSeats(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Available Seats"
                        value={availableSeats}
                        onChange={(e) =>
                            setAvailableSeats(
                                e.target.value
                            )
                        }
                        required
                    />
                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Cabin Baggage (kg)"
                        value={cabinBaggageKg}
                        onChange={(e) =>
                            setCabinBaggageKg(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Check-In Baggage (kg)"
                        value={checkInBaggageKg}
                        onChange={(e) =>
                            setCheckInBaggageKg(
                                e.target.value
                            )
                        }
                    />
                    <label className="mb-2">
                        Available Cabin Classes
                    </label>

                    <div className="mb-3">

                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={availableClasses.includes("Economy")}
                                onChange={() =>
                                    handleCabinClassChange("Economy")
                                }
                            />
                            <label className="form-check-label">
                                Economy
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={availableClasses.includes("Business")}
                                onChange={() =>
                                    handleCabinClassChange("Business")
                                }
                            />
                            <label className="form-check-label">
                                Business
                            </label>
                        </div>

                        

                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={availableClasses.includes("First Class")}
                                onChange={() =>
                                    handleCabinClassChange("First Class")
                                }
                            />
                            <label className="form-check-label">
                                First Class
                            </label>
                        </div>

                    </div>
                    <label>Flight Type</label>

                    <select
                        className="form-control mb-3"
                        value={flightType}
                        onChange={(e) =>
                            setFlightType(e.target.value)
                        }
                    >
                        <option value="Domestic">
                            Domestic
                        </option>

                        <option value="International">
                            International
                        </option>
                    </select>
                    <label>Journey Type</label>

                    <select
                        className="form-control mb-3"
                        value={journeyType}
                        onChange={(e) =>
                            setJourneyType(e.target.value)
                        }
                    >
                        <option value="Non Stop">
                            Non Stop
                        </option>

                        <option value="1 Stop">
                            1 Stop
                        </option>

                        <option value="2 Stops">
                            2 Stops
                        </option>
                    </select>
                    {
                        journeyType === "1 Stop" && (

                            <input
                                className="form-control mb-3"
                                placeholder="Stop 1"
                                value={stop1}
                                onChange={(e) =>
                                    setStop1(e.target.value)
                                }
                            />

                        )
                    }

                    {
                        journeyType === "2 Stops" && (

                            <>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Stop 1"
                                    value={stop1}
                                    onChange={(e) =>
                                        setStop1(e.target.value)
                                    }
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Stop 2"
                                    value={stop2}
                                    onChange={(e) =>
                                        setStop2(e.target.value)
                                    }
                                />

                            </>

                        )
                    }
                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={foodIncluded}
                            onChange={(e) =>
                                setFoodIncluded(
                                    e.target.checked
                                )
                            }
                        />

                        <label
                            className="form-check-label"
                        >
                            Meal Included
                        </label>

                    </div>

                    <select
                        className="form-control mb-4"
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                    >
                        <option value="Available">
                            Available
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Add Flight
                    </button>

                </form>

            </div>

        </div>
    );
}

export default OwnerAddFlight;