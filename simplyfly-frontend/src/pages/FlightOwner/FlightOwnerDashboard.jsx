import { Link } from "react-router-dom";
import {
    FaPlane,
    FaTicketAlt,
    FaRupeeSign,
    FaTimesCircle
} from "react-icons/fa";

import "../../styles/FlightOwnerDashboard.css";
function FlightOwnerDashboard() {

    return (
        <div className="owner-dashboard">

            {/* Sidebar */}

            <div className="owner-sidebar">

                <div className="owner-logo">
                    ✈ SimplyFly
                </div>

                <ul>

                    <li>
                        <Link to="/flight-owner">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/owner-add-flight">
                            Add Flight
                        </Link>
                    </li>

                    <li>
                        <Link to="/owner-my-flights">
                            My Flights
                        </Link>
                    </li>

                    <li>
                        <Link to="/owner-bookings">
                            Bookings
                        </Link>
                    </li>
                    <li>
                        <Link to="/flight-owner/refunds">
                           Refund Requests
                        </Link>
                    </li>

                    <li>
                        <Link to="/owner-revenue">
                            Revenue
                        </Link>
                    </li>

                </ul>

            </div>

            {/* Content */}

            <div className="owner-content">

                <div className="owner-header">

                    <h1>
                        <b>Flight Owner Dashboard</b>
                    </h1>

                    <p>
                        Manage your flights and revenue
                    </p>

                </div>

                <div className="owner-cards">

                    <div className="owner-card">

                        <FaPlane className="card-icon" />

                        <h2>12</h2>

                        <p>Total Flights</p>

                    </div>

                    <div className="owner-card">

                        <FaTicketAlt className="card-icon" />

                        <h2>85</h2>

                        <p>Total Bookings</p>

                    </div>

                    <div className="owner-card">

                        <FaRupeeSign className="card-icon" />

                        <h2>₹1,20,000</h2>

                        <p>Total Revenue</p>

                    </div>

                    <div className="owner-card">

                        <FaTimesCircle className="card-icon" />

                        <h2>5</h2>

                        <p>Cancelled Tickets</p>

                    </div>

                </div>

                <div className="dashboard-banner">

                    <h2>
                        Welcome Back Flight Owner ✈
                    </h2>

                    <p>
                        Monitor flights, bookings,
                        revenue and passenger activity
                        from one place.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default FlightOwnerDashboard;