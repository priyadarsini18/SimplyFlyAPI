import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../../assets/simplyflylogo.png";
function AdminSidebar() {

    return (

        <div className="sidebar">

            <h2>✈ SimplyFly</h2>

            <Link to="/admin">
                📊 Dashboard
            </Link>

            <Link to="/admin-flights">
                ✈ Flights
            </Link>

            <Link to="/admin-bookings">
                🎟 Bookings
            </Link>

            <Link to="/users">
                👥 Users
            </Link>

            <Link to="/reports">
                📈 Reports
            </Link>

            <Link to="/login">
                🚪 Logout
            </Link>

        </div>

    );
}

export default AdminSidebar;