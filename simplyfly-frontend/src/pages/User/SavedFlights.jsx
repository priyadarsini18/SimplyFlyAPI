import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
function SavedFlights() {

    const [savedFlights, setSavedFlights] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        loadSavedFlights();
    }, []);

    const loadSavedFlights = async () => {

        try {

            const response =
                await API.get("/SavedFlight");

            setSavedFlights(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Failed To Load Saved Flights");

        }
    };
    const saveFlight = async (flightId) => {

        console.log("Saving Flight:", flightId);

        try {

            await API.post(
                "/SavedFlight",
                {
                    flightId
                }
            );

            alert("Flight Saved!");

        }
        catch (error) {

            console.log(error);

        }
    };
    const removeSavedFlight = async (id) => {

        if (!window.confirm("Remove this flight?"))
            return;

        try {

            await API.delete(`/SavedFlight/${id}`);

            loadSavedFlights();

            alert("Removed Successfully");

        }
        catch {

            alert("Failed");

        }

    };

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                ❤️ My Saved Flights
            </h1>

            <div className="row">

                {savedFlights.map(flight => (

                    <div
                        className="col-md-4 mb-4"
                        key={flight.savedFlightId}
                    >

                        <div className="card shadow">

                            <div className="card-body">

                                <h5>
                                    {flight.flightName}
                                </h5>

                                <p>
                                    {flight.fromCity}
                                    {" → "}
                                    {flight.toCity}
                                </p>

                                <h4>
                                    ₹{flight.price}
                                </h4>

                                <small>
                                    Saved On:
                                    {" "}
                                    {new Date(
                                        flight.savedDate
                                    ).toLocaleDateString()}
                                </small>
                                <button
                                    className="btn btn-primary mt-3 w-100"
                                    onClick={() =>
                                        navigate(`/flights/${flight.flightId}`)
                                    }
                                >
                                    ✈ View Details
                                </button>
                                <button
    className="btn btn-outline-danger w-100 mt-2"
    onClick={() =>
        removeSavedFlight(
            flight.savedFlightId
        )
    }
>
    🗑 Remove
</button>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default SavedFlights;