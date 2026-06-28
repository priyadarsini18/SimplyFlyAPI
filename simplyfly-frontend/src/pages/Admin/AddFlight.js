import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function AddFlight() {

    const navigate = useNavigate();
    useEffect(() => {
        loadRoutes();
    }, []);

    const loadRoutes = async () => {
        try {
            const response = await API.get("/Route");
            setRoutes(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };
    const [routes, setRoutes] = useState([]);

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
        status: "Available",
        flightType: "Domestic",

        cabinClass: "Economy",
        availableClasses: [],
        cabinBaggageKg: "",
        checkInBaggageKg: "",
        

        journeyType: "Non Stop",

        stop1: "",
        stop2: "",
        foodIncluded: false
    });

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

            await API.post(
                "/Admin/flights",
                {
                    ...flight,
                    cabinClass:
                        flight.availableClasses.length > 0
                            ? flight.availableClasses.join(",")
                            : "Economy",

                    routeId: Number(flight.routeId),

                    price: Number(flight.price),

                    totalSeats: Number(flight.totalSeats),

                    availableSeats: Number(
                        flight.availableSeats
                    )
                }
            );

            alert(
                "Flight Added Successfully"
            );

            navigate("/admin-flights");

        }
        catch (error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Failed To Add Flight"
            );
        }
    };

    return (
        <div className="admin-page">


        <div className="container mt-5">

            <h2>Add Flight</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="flightName"
                    placeholder="Flight Name"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="flightNumber"
                    placeholder="Flight Number"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="fromCity"
                    placeholder="From City"
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-3"
                    name="fromAirportName"
                    placeholder="From Airport Name"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="fromAirportCode"
                    placeholder="From Airport Code (MAA)"
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-3"
                    name="toCity"
                    placeholder="To City"
                    onChange={handleChange}
                    required
                />
                <input
                    className="form-control mb-3"
                    name="toAirportName"
                    placeholder="To Airport Name"
                    onChange={handleChange}
                    required
                />

                <input
                    className="form-control mb-3"
                    name="toAirportCode"
                    placeholder="To Airport Code (PNQ)"
                    onChange={handleChange}
                    required
                />

                <select
                    className="form-control mb-3"
                    name="routeId"
                    value={flight.routeId}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Route
                    </option>

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
                    name="departureTime"
                    onChange={handleChange}
                    required
                />

                <label>
                    Arrival Time
                </label>

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    name="arrivalTime"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    name="totalSeats"
                    placeholder="Total Seats"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    name="availableSeats"
                    placeholder="Available Seats"
                    onChange={handleChange}
                    required
                />
                
                <label>Available Cabin Classes</label>

                <div className="form-check">
                    <input
                        type="checkbox"
                        value="Economy"
                        onChange={handleClassChange}
                    />
                    Economy
                </div>

                <div className="form-check">
                    <input
                        type="checkbox"
                        value="Business"
                        onChange={handleClassChange}
                    />
                    Business
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        value="First Class"
                        onChange={handleClassChange}
                    />
                    First Class
                </div>

                
                <label>Flight Type</label>

                <select
                    className="form-control mb-3"
                    name="flightType"
                    onChange={handleChange}
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
                    name="journeyType"
                    onChange={handleChange}
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
                        flight.journeyType === "1 Stop" && (

                            <input
                                className="form-control mb-3"
                                name="stop1"
                                placeholder="Stop Airport"
                                onChange={handleChange}
                            />
                        )
                    }

                    {
                        flight.journeyType === "2 Stops" && (
                            <>
                                <input
                                    className="form-control mb-3"
                                    name="stop1"
                                    placeholder="Stop Airport 1"
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-3"
                                    name="stop2"
                                    placeholder="Stop Airport 2"
                                    onChange={handleChange}
                                />
                            </>
                        )
                    }
                
                <div className="form-check mb-3">

                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={flight.foodIncluded}
                        onChange={(e) =>
                            setFlight({
                                ...flight,
                                foodIncluded:
                                    e.target.checked
                            })
                        }
                    />

                    <label
                        className="form-check-label"
                    >
                        Meal Included
                    </label>


                </div>
                <label>Cabin Baggage (KG)</label>

                <input
                    type="number"
                    className="form-control mb-3"
                    name="cabinBaggageKg"
                    value={flight.cabinBaggageKg}
                    onChange={handleChange}
                    placeholder="Cabin Baggage KG"
                />

                <label>Check-In Baggage (KG)</label>

                <input
                    type="number"
                    className="form-control mb-3"
                    name="checkInBaggageKg"
                    value={flight.checkInBaggageKg}
                    onChange={handleChange}
                    placeholder="Check-In Baggage KG"
                />
                <select
                    className="form-control mb-3"
                    name="status"
                    onChange={handleChange}
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
                    Add Flight
                </button>

            </form>
            </div>
        </div>

    );
}

export default AddFlight;