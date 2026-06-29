import { useEffect, useState } from "react";
import axios from "axios";

function OwnerMyFlights() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        loadFlights();
    }, []);

    const loadFlights = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "https://localhost:8080/api/v1/Flights/my-flights",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    });

            setFlights(response.data);

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed To Load Flights"
            );
        }
    };

    const deleteFlight = async (flightId) => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.delete(
                `https://localhost:8080/api/v1/Flights/${flightId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Flight Deleted Successfully");

            loadFlights();

        }
        catch (error) {

            console.log(error);

            alert("Delete Failed");
        }
    };


    return (
        <div className="owner-dashboard">
        <div className="container mt-4">

            <h1>
                My Flights
            </h1>

            <div className="row mt-4">

                {flights.map((flight) => (

                    <div
                        key={flight.flightId}
                        className="col-md-4 mb-4"
                    >

                        <div className="card shadow">

                            <div className="card-body">

                                <h4>
                                    {flight.flightName}
                                </h4>

                                <hr />

                                <p>
                                    <strong>
                                        Flight No:
                                    </strong>{" "}
                                    {flight.flightNumber}
                                </p>

                                <p>
                                    <strong>
                                        Route:
                                    </strong>{" "}
                                    {flight.fromCity}
                                    {" → "}
                                    {flight.toCity}
                                </p>

                                <p>
                                    <strong>
                                        Price:
                                    </strong>{" "}
                                    ₹{flight.price}
                                </p>

                                <p>
                                    <strong>
                                        Seats:
                                    </strong>{" "}
                                    {flight.availableSeats}
                                </p>

                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() =>
                                        window.location.href =
                                        `/owner-edit-flight/${flight.flightId}`
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deleteFlight(
                                            flight.flightId
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                        
                    </div>

                ))}
                
            </div>

        </div>
        </div>
    );
}

export default OwnerMyFlights;