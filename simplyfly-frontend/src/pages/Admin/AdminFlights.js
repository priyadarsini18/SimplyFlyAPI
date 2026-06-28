import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "../../styles/AdminTheme.css";
function AdminFlights() {

    const [flights, setFlights] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadFlights();

    }, []);

    const loadFlights = async () => {

        try {

            const response =
                await API.get("/Admin/flights");

            setFlights(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Failed To Load Flights");
        }
    };

    // SOFT DELETE

    const deleteFlight = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this flight?"
            );

        if (!confirmDelete)
            return;

        try {

            await API.delete(
                `/Admin/flights/${id}`
            );

            alert(
                "Flight Deleted Successfully"
            );

            loadFlights();

        }
        catch (error) {

            console.log(error);

            alert(
                "Delete Failed"
            );
        }
    };

    // CANCEL FLIGHT

    const cancelFlight = async (id) => {

        const confirmCancel =
            window.confirm(
                "Cancel this flight?"
            );

        if (!confirmCancel)
            return;

        try {

            await API.put(
                `/Admin/flights/cancel/${id}`
            );

            alert(
                "Flight Cancelled Successfully"
            );

            loadFlights();

        }
        catch (error) {

            console.log(error);

            alert(
                "Cancel Failed"
            );
        }
    };

    const filteredFlights =
        flights.filter((flight) =>
            flight.flightName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div className="admin-page">


        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    ✈ Manage Flights
                </h1>

                <Link
                    to="/add-flight"
                    className="btn btn-success"
                >
                    ➕ Add Flight
                </Link>

            </div>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search Flight..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />
            <div className="table-container">
            <div className="table-responsive">

                <table className="table table-striped table-bordered shadow">

                    <thead className="table-dark">

                        <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Number</th>
                                <th>From</th>
                                <th>To</th>

                            <th style={{ minWidth: "180px" }}>
                                Cabin Class
                            </th>
                                <th>Type</th>
                                <th>Journey</th>
                            <th>Meal</th>
                                <th>Price</th>
                                <th>Seats</th>
                                <th>Status</th>
                                <th>Actions</th>
                                

                            </tr>


                    </thead>

                    <tbody>

                        {
                            filteredFlights.length > 0
                                ? filteredFlights.map(
                                    (flight) => (

                                        <tr
                                            key={
                                                flight.flightId
                                            }
                                        >

                                            <td>
                                                {flight.flightId}
                                            </td>

                                            <td>
                                                {flight.flightName}
                                            </td>

                                            <td>
                                                {flight.flightNumber}
                                            </td>

                                            <td>
                                                {flight.fromCity}
                                            </td>

                                            <td>
                                                {flight.toCity}
                                            </td>

                                            <td style={{ minWidth: "180px" }}>
                                                {flight.cabinClass?.replaceAll(",", " | ")}
                                            </td>

                                            <td>
                                                {flight.flightType}
                                            </td>

                                            <td>
                                                {flight.journeyType}
                                            </td>
                                            <td>
                                                {
                                                    flight.foodIncluded
                                                        ? "🍽 Yes"
                                                        : "❌ No"
                                                }
                                            </td>

                                            <td>
                                                ₹{flight.price}
                                            </td>

                                            <td>
                                                {
                                                    flight.availableSeats
                                                }
                                                /
                                                {
                                                    flight.totalSeats
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        flight.status ===
                                                            "Available"
                                                            ? "badge bg-success"
                                                            : "badge bg-danger"
                                                    }
                                                >
                                                    {
                                                        flight.status
                                                    }
                                                </span>

                                            </td>

                                            <td>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "5px",
                                                        alignItems: "center"
                                                    }}
                                                >

                                                <Link
                                                    to={`/edit-flight/${flight.flightId}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="btn btn-secondary btn-sm me-2"
                                                    onClick={() =>
                                                        cancelFlight(
                                                            flight.flightId
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        deleteFlight(
                                                            flight.flightId
                                                        )
                                                    }
                                                >
                                                    Delete
                                                    </button>
                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )
                                : (
                                    <tr>

                                        <td
                                            colSpan="13"
                                            className="text-center"
                                        >
                                            No Flights Found
                                        </td>

                                    </tr>
                                )
                        }

                    </tbody>

                </table>
                </div>
            </div>
            </div>
        </div>

    );
}

export default AdminFlights;