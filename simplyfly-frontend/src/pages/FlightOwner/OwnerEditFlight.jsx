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
        availableClasses: [],
        

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
        loadRoutes();
        loadFlight();
    }, []);
    const loadRoutes = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://localhost:8080/api/v1/Route",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRoutes(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const loadFlight = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                `https://localhost:8080/api/v1/Flights/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setFlight({
                ...response.data,
                availableClasses: response.data.cabinClass
                    ? response.data.cabinClass.split(",")
                    : []
            });

        }
        catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);

            alert(
                JSON.stringify(error.response?.data, null, 2)
            );
        }
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

    const updateFlight = async (e) => {

        e.preventDefault();

        if (flight.availableClasses.length === 0) {
            alert("Please select at least one cabin class");
            return;
        }

        try {

            const token = localStorage.getItem("token");
            console.log(flight);
            const request = {
                flightId: flight.flightId,
                flightName: flight.flightName,
                flightNumber: flight.flightNumber,

                fromCity: flight.fromCity,
                toCity: flight.toCity,

                fromAirportName: flight.fromAirportName,
                fromAirportCode: flight.fromAirportCode,

                toAirportName: flight.toAirportName,
                toAirportCode: flight.toAirportCode,

                routeId: Number(flight.routeId),

                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,

                price: Number(flight.price),

                totalSeats: Number(flight.totalSeats),
                availableSeats: Number(flight.availableSeats),

                cabinClass: flight.availableClasses.join(","),

                flightType: flight.flightType,
                journeyType: flight.journeyType,

                stop1: flight.stop1,
                stop2: flight.stop2,

                cabinBaggageKg: Number(flight.cabinBaggageKg),
                checkInBaggageKg: Number(flight.checkInBaggageKg),

                foodIncluded: flight.foodIncluded,

                status: flight.status,

                flightOwnerId: Number(flight.flightOwnerId)
            };

            console.log(request);

            await axios.put(
                `https://localhost:8080/api/v1/Flights/${id}`,
                request,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Flight Updated Successfully");

            navigate("/owner-my-flights");
        }
        catch (error) {

            console.log(error.response);

            alert("Failed To Update Flight");
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

                    <label>Route</label>

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
                        <option value="">Select Route</option>

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
                    <label>Available Cabin Classes</label>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            value="Economy"
                            checked={flight.availableClasses?.includes("Economy")}
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
                            checked={flight.availableClasses?.includes("Business")}
                            onChange={handleClassChange}
                        />
                        <label className="form-check-label">
                            Business
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            value="Premium Economy"
                            checked={flight.availableClasses?.includes("Premium Economy")}
                            onChange={handleClassChange}
                        />
                        <label className="form-check-label">
                            Premium Economy
                        </label>
                    </div>

                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            value="First Class"
                            checked={flight.availableClasses?.includes("First Class")}
                            onChange={handleClassChange}
                        />
                        <label className="form-check-label">
                            First Class
                        </label>
                    </div>

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