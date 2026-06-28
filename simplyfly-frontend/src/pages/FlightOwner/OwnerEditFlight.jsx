import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function OwnerEditFlight() {

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
        

        flightType: "",
        journeyType: "",

        stop1: "",
        stop2: "",

        cabinBaggageKg: 7,
        checkInBaggageKg: 15,

        foodIncluded: false,

        status: "Available"
    });
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        loadFlight();
        loadRoutes();
    }, []);
    const loadRoutes = async () => {

        try {

            const token = localStorage.getItem("token");
            console.log("TOKEN =", token);
            const response = await axios.get(
                "http://localhost:8080/api/v1/Route",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            setRoutes(response.data);

        }
        catch (error) {
            console.log(error.response);
            console.log(error.response?.data);
            console.log(error.response?.status);
        }
    };

    const loadFlight = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    `http://localhost:8080/api/v1/Flights/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    });

            setFlight(response.data);

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed To Load Flight"
            );
        }
    };

    const updateFlight = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await axios.put(
                "http://localhost:8080/api/v1/Flights",
                flight,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                });

            alert(
                "Flight Updated Successfully"
            );

            navigate(
                "/owner-my-flights"
            );

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed To Update Flight"
            );
        }
    };

    return (
        <div className="owner-dashboard">

        <div className="container mt-4">

            <h1>Edit Flight</h1>

            <form
                className="card p-4 mt-4"
                onSubmit={updateFlight}
            >

                <input
                    className="form-control mb-3"
                    placeholder="Flight Name"
                    value={flight.flightName || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            flightName: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Flight Number"
                    value={flight.flightNumber || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            flightNumber: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="From City"
                    value={flight.fromCity || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            fromCity: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="To City"
                    value={flight.toCity || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            toCity: e.target.value
                        })
                    }
                />
                <input
                    className="form-control mb-3"
                    placeholder="From Airport Name"
                    value={flight.fromAirportName || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            fromAirportName: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="From Airport Code"
                    value={flight.fromAirportCode || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            fromAirportCode: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="To Airport Name"
                    value={flight.toAirportName || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            toAirportName: e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="To Airport Code"
                    value={flight.toAirportCode || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            toAirportCode: e.target.value
                        })
                    }
                />

                <select
                    className="form-control mb-3"
                    value={flight.routeId}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            routeId: Number(e.target.value)
                        })
                    }
                >
                    {routes.map(route => (
                        <option
                            key={route.routeId}
                            value={route.routeId}
                        >
                            {route.source} → {route.destination}
                        </option>
                    ))}
                </select>

                <label>
                    Departure Time
                </label>

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    value={
                        flight.departureTime
                            ? flight.departureTime.slice(0, 16)
                            : ""
                    }
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            departureTime: e.target.value
                        })
                    }
                />

                <label>
                    Arrival Time
                </label>

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    value={
                        flight.arrivalTime
                            ? flight.arrivalTime.slice(0, 16)
                            : ""
                    }
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            arrivalTime: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Price"
                    value={flight.price || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            price: Number(e.target.value)
                        })
                    }
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Total Seats"
                    value={flight.totalSeats || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            totalSeats: Number(e.target.value)
                        })
                    }
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Available Seats"
                    value={flight.availableSeats || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            availableSeats: Number(e.target.value)
                        })
                    }
                />
                <label>Cabin Class</label>

                <select
                    className="form-control mb-3"
                    value={flight.cabinClass || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            cabinClass: e.target.value
                        })
                    }
                >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First Class">First Class</option>
                    <option value="All Classes">All Classes</option>
                </select>
                <label>Flight Type</label>

                <select
                    className="form-control mb-3"
                    value={flight.flightType || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            flightType: e.target.value
                        })
                    }
                >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                </select>
                <label>Journey Type</label>

                <select
                    className="form-control mb-3"
                    value={flight.journeyType || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            journeyType: e.target.value
                        })
                    }
                >
                    <option value="Non Stop">Non Stop</option>
                    <option value="1 Stop">1 Stop</option>
                    <option value="2 Stops">2 Stops</option>
                </select>
                {flight.journeyType === "1 Stop" && (
                    <input
                        className="form-control mb-3"
                        placeholder="Stop Airport"
                        value={flight.stop1 || ""}
                        onChange={(e) =>
                            setFlight({
                                ...flight,
                                stop1: e.target.value
                            })
                        }
                    />
                )}

                {flight.journeyType === "2 Stops" && (
                    <>
                        <input
                            className="form-control mb-3"
                            placeholder="Stop 1"
                            value={flight.stop1 || ""}
                            onChange={(e) =>
                                setFlight({
                                    ...flight,
                                    stop1: e.target.value
                                })
                            }
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Stop 2"
                            value={flight.stop2 || ""}
                            onChange={(e) =>
                                setFlight({
                                    ...flight,
                                    stop2: e.target.value
                                })
                            }
                        />
                    </>
                )}
                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Cabin Baggage (kg)"
                    value={flight.cabinBaggageKg || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            cabinBaggageKg: Number(e.target.value)
                        })
                    }
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Check-In Baggage (kg)"
                    value={flight.checkInBaggageKg || ""}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            checkInBaggageKg: Number(e.target.value)
                        })
                    }
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
                <select
                    className="form-control mb-3"
                    value={flight.status || "Available"}
                    onChange={(e) =>
                        setFlight({
                            ...flight,
                            status: e.target.value
                        })
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
                    className="btn btn-success"
                >
                    Update Flight
                </button>

            </form>
            </div>
        </div>
    );
}

export default OwnerEditFlight;