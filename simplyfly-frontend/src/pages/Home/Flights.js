import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
function Flights() {

    const [flights, setFlights] = useState([]);
    const [airlineFilter, setAirlineFilter] =
        useState("");

    const [maxPrice, setMaxPrice] =
        useState("");

    const [departureFilter, setDepartureFilter] =
        useState("");
    const [minPrice, setMinPrice] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [isSearching, setIsSearching] =
        useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 12;

    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const [journeyDate, setJourneyDate] = useState("");
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        if (!isSearching) {

            loadFlights();
            loadCities();

        }

    }, [pageNumber]);

    const loadFlights = async () => {
        try {

            const response = await axios.get(
                `https://localhost:8080/api/v1/Flights?PageNumber=${pageNumber}&PageSize=${pageSize}`
            );

            setFlights(response.data.data);

        }
        catch (error) {
            console.log(error);
        }
    };
    const loadCities = async () => {

        try {

            const response =
                await axios.get(
                    "https://localhost:8080/api/v1/Route"
                );

            const cityList = [
                ...new Set(
                    response.data.flatMap(route => [
                        route.source,
                        route.destination
                    ])
                )
            ];

            setCities(cityList);

        }
        catch (error) {

            console.log(error);

        }
    };
    const searchFlights = async () => {
        if (!journeyDate) {

            alert(
                "Please select journey date"
            );

            return;
        }

        try {

            const response = await axios.get(
                `https://localhost:8080/api/v1/Flights/search?fromCity=${fromCity}&toCity=${toCity}&journeyDate=${journeyDate}`
            );

            setFlights(response.data);
            setIsSearching(true);

        }
        catch (error) {

            console.log(error);
        }
    };
    const saveFlight = async (
        flightId
    ) => {

        try {

            await API.post(
                "/SavedFlight",
                {
                    flightId
                }
            );

            alert(
                "Flight Saved Successfully"
            );

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed To Save Flight"
            );

        }
    };
    let filteredFlights = flights.filter((flight) => {
        const dateMatch =
            !journeyDate ||
            new Date(flight.departureTime)
                .toISOString()
                .split("T")[0] === journeyDate;
        const airlineMatch =
            airlineFilter === "" ||
            flight.flightName
                .toLowerCase()
                .includes(
                    airlineFilter.toLowerCase()
                );

        const minPriceMatch =
            minPrice === "" ||
            flight.price >= Number(minPrice);

        const maxPriceMatch =
            maxPrice === "" ||
            flight.price <= Number(maxPrice);

        const departureHour =
            new Date(
                flight.departureTime
            ).getHours();

        let departureMatch = true;

        if (departureFilter === "morning") {
            departureMatch =
                departureHour >= 5 &&
                departureHour < 12;
        }

        if (departureFilter === "afternoon") {
            departureMatch =
                departureHour >= 12 &&
                departureHour < 17;
        }

        if (departureFilter === "evening") {
            departureMatch =
                departureHour >= 17 &&
                departureHour < 21;
        }

        if (departureFilter === "night") {
            departureMatch =
                departureHour >= 21 ||
                departureHour < 5;
        }

        return (
            dateMatch &&
            airlineMatch &&
            minPriceMatch &&
            maxPriceMatch &&
            departureMatch
        );
    });

    if (sortBy === "priceLow") {
        filteredFlights.sort(
            (a, b) => a.price - b.price
        );
    }

    if (sortBy === "priceHigh") {
        filteredFlights.sort(
            (a, b) => b.price - a.price
        );
    }

    if (sortBy === "departure") {
        filteredFlights.sort(
            (a, b) =>
                new Date(a.departureTime) -
                new Date(b.departureTime)
        );
    }

    return (

        <div className="container mt-4">

            {/* SEARCH SECTION */}

            <div className="card shadow p-4 mb-4">

                <h3 className="mb-4">
                    Search Flights
                </h3>
                {isSearching && (

                    <div className="alert alert-info">

                        Search results are being displayed.
                        Click Reset to return to paginated flights.

                    </div>

                )}
                <div className="row">

                    <div className="col-md-3">

                        <input
                            list="cities"
                            className="form-control"
                            placeholder="From City"
                            value={fromCity}
                            onChange={(e) =>
                                setFromCity(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            list="cities"
                            className="form-control"
                            placeholder="To City"
                            value={toCity}
                            onChange={(e) =>
                                setToCity(e.target.value)
                            }
                        />

                    </div>
                    <div className="col-md-3">

                        <input
                            type="date"
                            className="form-control"
                            value={journeyDate}
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            onChange={(e) =>
                                setJourneyDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-1">
                        

                        <button
                            className="btn btn-success w-100"
                            onClick={() => {

                                setPageNumber(1);

                                searchFlights();

                            }}
                        >
                            Search
                        </button>
                     

                    </div>
                    <datalist id="cities">

                        {cities.map(city => (

                            <option
                                key={city}
                                value={city}
                            />

                        ))}

                    </datalist>

                    <div className="col-md-2">

                        <button
                            className="btn btn-danger"
                            onClick={() => {

                                setJourneyDate("");

                                setAirlineFilter("");
                                setMinPrice("");
                                setMaxPrice("");
                                setDepartureFilter("");
                                setSortBy("");

                                setIsSearching(false);

                                setPageNumber(1);

                                loadFlights();
                            }}
                        >
                            Reset
                        </button>

                    </div>

                </div>

            </div>
            <div className="card shadow p-4 mb-4">

                <h5 className="mb-3">
                    Filter Flights
                </h5>

                <div className="row">

                    <div className="col-md-3">
                        <label>Airline</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Indigo"
                            value={airlineFilter}
                            onChange={(e) =>
                                setAirlineFilter(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="col-md-2">
                        <label>Min Price</label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="1000"
                            value={minPrice}
                            onChange={(e) =>
                                setMinPrice(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="col-md-2">
                        <label>Max Price</label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="5000"
                            value={maxPrice}
                            onChange={(e) =>
                                setMaxPrice(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="col-md-2">

                        <label>
                            Departure Time
                        </label>

                        <select
                            className="form-control"
                            value={departureFilter}
                            onChange={(e) =>
                                setDepartureFilter(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All
                            </option>

                            <option value="morning">
                                Morning
                            </option>

                            <option value="afternoon">
                                Afternoon
                            </option>

                            <option value="evening">
                                Evening
                            </option>

                            <option value="night">
                                Night
                            </option>

                        </select>

                    </div>

                    <div className="col-md-3">

                        <label>
                            Sort By
                        </label>

                        <select
                            className="form-control"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                Default
                            </option>

                            <option value="priceLow">
                                Price Low → High
                            </option>

                            <option value="priceHigh">
                                Price High → Low
                            </option>

                            <option value="departure">
                                Departure Time
                            </option>

                        </select>

                    </div>

                </div>

            </div>

            {/* FLIGHT LIST */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1
                        className="fw-bold mb-1"
                        style={{
                            color: "#0d6efd"
                        }}
                    >
                        ✈ Available Flights
                    </h1>

                    <p
                        className="text-muted mb-0"
                        style={{
                            fontSize: "16px"
                        }}
                    >
                        Showing
                        {" "}
                        <strong>
                            {filteredFlights.length}
                        </strong>
                        {" "}
                        flight(s)
                    </p>

                </div>

                <div>

                    <span
                        className="badge rounded-pill bg-primary p-3"
                        style={{
                            fontSize: "15px"
                        }}
                    >
                        {filteredFlights.length}
                        {" "}
                        Results Found
                    </span>

                </div>

            </div>

            <div className="row">
                
                    {filteredFlights.length === 0 && (

                        <div className="alert alert-warning">

                            No flights found matching your filters.

                        </div>

                    )}

                {filteredFlights.map((flight) => (
                    <div
                        className="col-md-3 mb-3"
                        key={flight.flightId}
                    >

                        <div
                            className="card border-0 shadow-lg h-100 flight-card"
                            style={{
                                borderRadius: "18px",
                                transition: "0.3s"
                            }}
                        >

                            <div className="card-body">

                                <h4
                                    className="fw-bold flight-title"
                                >
                                    ✈ {flight.flightName}
                                </h4>

                                <p>
                                    <strong>Flight No:</strong>{" "}
                                    {flight.flightNumber}
                                </p>

                                <p>
                                    📍 {flight.fromCity}
                                    <span className="mx-2">
                                        ✈️
                                    </span>
                                    {flight.toCity}
                                </p>

                                <p>
                                    🕒 Departure:{" "}
                                    {new Date(
                                        flight.departureTime
                                    ).toLocaleString()}
                                </p>

                                <p>
                                    🛬 Arrival:{" "}
                                    {new Date(
                                        flight.arrivalTime
                                    ).toLocaleString()}
                                </p>

                                <p className="fw-bold text-primary">
                                    🎫 Available Seats:{" "}
                                    {flight.availableSeats}
                                </p>

                                <div
                                    className="p-2 mb-3"
                                    style={{
                                        background: "#f8fbff",
                                        border: "1px solid #dbeafe",
                                        borderRadius: "10px"
                                    }}
                                >

                                    <p className="mb-1">
                                        🧳 Cabin:{" "}
                                        {flight.cabinBaggageKg}
                                        kg / Adult
                                    </p>

                                    <p className="mb-0">
                                        💼 Check-In:{" "}
                                        {flight.checkInBaggageKg}
                                        kg / Adult
                                    </p>
                                    

                                </div>

                                <h5 className="text-success mb-3">
                                    ₹{flight.price.toLocaleString()}
                                </h5>

                                <p>

                                    <strong>Status:</strong>{" "}

                                    <span
                                        className={
                                            flight.status === "Available"
                                                ? "badge bg-success"
                                                : "badge bg-danger"
                                        }
                                    >
                                        {flight.status}
                                    </span>

                                </p>

                                <div className="d-grid gap-2">

                                    <button
                                        className="btn btn-outline-primary w-100 mb-2"
                                        onClick={() =>
                                            navigate(
                                                `/flights/${flight.flightId}`
                                            )
                                        }
                                    >
                                        View Details
                                    </button>
                                    

                                        <button
                                            className="btn btn-outline-danger w-100 mb-2"
                                            onClick={() =>
                                                saveFlight(
                                                    flight.flightId
                                                )
                                            }
                                        >
                                            ❤️ Add to Wishlist
                                        </button>

                                        
                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        disabled={
                                            flight.status === "Cancelled"
                                        }
                                        onClick={() =>
                                            navigate(
                                                `/flights/${flight.flightId}`
                                            )
                                        }
                                    >
                                        {flight.status === "Cancelled"
                                            ? "Flight Cancelled"
                                            : "Book Flight"}
                                    </button>

                                </div>

                            </div>

                        </div>

                  

                ))}
                
            </div>

            {/* PAGINATION */}

            <div className="d-flex justify-content-center gap-3 mt-4 mb-5">

                <button
                    className="btn btn-secondary"
                    disabled={
                        pageNumber === 1 ||
                        isSearching
                    }
                    onClick={() =>
                        setPageNumber(pageNumber - 1)
                    }
                >
                    Previous
                </button>

                <button
                    className="btn btn-primary"
                >
                    Page {pageNumber}
                </button>

                <button
                    className="btn btn-secondary"
                    disabled={
                        flights.length < pageSize ||
                        isSearching
                    }
                    onClick={() =>
                        setPageNumber(pageNumber + 1)
                    }
                >
                    Next
                </button>
                

            </div>
            

        </div>
    );
}

export default Flights;