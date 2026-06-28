import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

function EditFlight() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [flight, setFlight] = useState({
        flightName: "",
        flightNumber: "",

        fromCity: "",
        toCity: "",

        fromAirportName: "",
        fromAirportCode: "",

        toAirportName: "",
        toAirportCode: "",

        routeId: 1,

        departureTime: "",
        arrivalTime: "",

        price: "",
        totalSeats: "",
        availableSeats: "",

        cabinClass: "",
        availableClasses: [],

        flightType: "",
        journeyType: "",

        stop1: "",
        stop2: "",

        cabinBaggageKg: "",
        checkInBaggageKg: "",

        foodIncluded: false,

        status: "Available"
    });

    useEffect(() => {

        loadFlight();

    }, []);

    const loadFlight = async () => {

        try {

            const response =
                await API.get(
                    `/Admin/flights/${id}`
                );

            setFlight({
                ...response.data,
                availableClasses:
                    response.data.cabinClass
                        ? response.data.cabinClass.split(",")
                        : []
            });

        }
        catch (error) {

            console.log(error);

        }
    };

    const handleChange = (e) => {

        setFlight({
            ...flight,
            [e.target.name]: e.target.value
        });

    };

    const handleClassChange = (e) => {

        const value = e.target.value;

        if (e.target.checked) {

            setFlight({
                ...flight,
                availableClasses: [
                    ...flight.availableClasses,
                    value
                ]
            });

        } else {

            setFlight({
                ...flight,
                availableClasses:
                    flight.availableClasses.filter(
                        c => c !== value
                    )
            });
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            console.log(flight);
            if (flight.availableClasses.length === 0) {
                alert("Please select at least one cabin class");
                return;
            }
            await API.put(
                `/Admin/flights/${id}`,
                {
                    ...flight,
                    cabinClass:
                        flight.availableClasses.join(","),
                    routeId: Number(flight.routeId),
                    price: Number(flight.price),
                    totalSeats: Number(flight.totalSeats),
                    availableSeats: Number(
                        flight.availableSeats
                    )
                }
            );

            alert(
                "Flight Updated Successfully"
            );

            navigate("/admin-flights");

        }
        catch (error) {

            console.log(error);

            alert(
                "Update Failed"
            );

        }
    };

    return (
        <div className="admin-page">


        <div className="container mt-5">

            <h2>Edit Flight</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="flightName"
                    value={flight.flightName}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="flightNumber"
                    value={flight.flightNumber}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="fromCity"
                    value={flight.fromCity}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="toCity"
                    value={flight.toCity}
                    onChange={handleChange}
                />
                <input
                    className="form-control mb-3"
                    name="fromAirportName"
                    value={flight.fromAirportName || ""}
                    onChange={handleChange}
                    placeholder="From Airport Name"
                />

                <input
                    className="form-control mb-3"
                    name="fromAirportCode"
                    value={flight.fromAirportCode || ""}
                    onChange={handleChange}
                    placeholder="From Airport Code"
                />

                <input
                    className="form-control mb-3"
                    name="toAirportName"
                    value={flight.toAirportName || ""}
                    onChange={handleChange}
                    placeholder="To Airport Name"
                />

                <input
                    className="form-control mb-3"
                    name="toAirportCode"
                    value={flight.toAirportCode || ""}
                    onChange={handleChange}
                    placeholder="To Airport Code"
                />
                <label>Departure Time</label>

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    name="departureTime"
                    value={flight.departureTime?.slice(0, 16)}
                    onChange={handleChange}
                />

                <label>Arrival Time</label>

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    name="arrivalTime"
                    value={flight.arrivalTime?.slice(0, 16)}
                    onChange={handleChange}
                />
                <input
                    className="form-control mb-3"
                    name="price"
                    value={flight.price}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="totalSeats"
                    value={flight.totalSeats}
                    onChange={handleChange}
                />
                <label>Available Cabin Classes</label>

                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        value="Economy"
                        checked={
                            flight.availableClasses?.includes(
                                "Economy"
                            )
                        }
                        onChange={handleClassChange}
                    />
                    <label className="form-check-label">
                        Economy
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        value="Business"
                        checked={
                            flight.availableClasses?.includes(
                                "Business"
                            )
                        }
                        onChange={handleClassChange}
                    />
                    <label className="form-check-label">
                        Business
                    </label>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        value="First Class"
                        checked={
                            flight.availableClasses?.includes(
                                "First Class"
                            )
                        }
                        onChange={handleClassChange}
                    />
                    <label className="form-check-label">
                        First Class
                    </label>
                </div>
                <select
                    className="form-control mb-3"
                    name="flightType"
                    value={flight.flightType || ""}
                    onChange={handleChange}
                >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                </select>

                <input
                    className="form-control mb-3"
                    name="availableSeats"
                    value={flight.availableSeats}
                    onChange={handleChange}
                />
                <select
                    className="form-control mb-3"
                    name="journeyType"
                    value={flight.journeyType || ""}
                    onChange={handleChange}
                >
                    <option value="Non Stop">Non Stop</option>
                    <option value="1 Stop">1 Stop</option>
                    <option value="2 Stops">2 Stops</option>
                </select>
                {flight.journeyType === "1 Stop" && (
                    <input
                        className="form-control mb-3"
                        name="stop1"
                        value={flight.stop1 || ""}
                        onChange={handleChange}
                        placeholder="Stop Airport"
                    />
                )}

                {flight.journeyType === "2 Stops" && (
                    <>
                        <input
                            className="form-control mb-3"
                            name="stop1"
                            value={flight.stop1 || ""}
                            onChange={handleChange}
                            placeholder="Stop 1"
                        />

                        <input
                            className="form-control mb-3"
                            name="stop2"
                            value={flight.stop2 || ""}
                            onChange={handleChange}
                            placeholder="Stop 2"
                        />
                    </>
                )}
                <input
                    type="number"
                    className="form-control mb-3"
                    name="cabinBaggageKg"
                    value={flight.cabinBaggageKg || ""}
                    onChange={handleChange}
                    placeholder="Cabin Baggage"
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    name="checkInBaggageKg"
                    value={flight.checkInBaggageKg || ""}
                    onChange={handleChange}
                    placeholder="Check-In Baggage"
                />
                <div className="form-check mb-3">

                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={flight.foodIncluded || false}
                        onChange={(e) =>
                            setFlight({
                                ...flight,
                                foodIncluded: e.target.checked
                            })
                        }
                    />

                    <label className="form-check-label">
                        Meal Included
                    </label>

                </div>
                <button
                    className="btn btn-primary"
                >
                    Update Flight
                </button>

            </form>
            </div>
        </div>

    );
}

export default EditFlight;