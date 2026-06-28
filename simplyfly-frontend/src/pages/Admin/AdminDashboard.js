import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import logo from "../../assets/simplyflylogo.png";
import "../../styles/AdminTheme.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        flights: 0,
        users: 0,
        bookings: 0,
        payments: 0,
        refunds: 0,
        revenue: 0
    });


    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const [
                flightsRes,
                usersRes,
                bookingsRes,
                paymentsRes,
                refundsRes
            ] = await Promise.all([
                API.get("/Admin/flights"),
                API.get("/User"),
                API.get("/Booking"),
                API.get("/Payment"),
                API.get("/Refund")
            ]);

            const flights = flightsRes.data;
            const bookings = bookingsRes.data;
            const payments = paymentsRes.data;
            const refunds = refundsRes.data;

            const revenue = bookings.reduce(
                (sum, booking) => sum + booking.totalAmount,
                0
            );

            const successfulPayments =
                payments.filter(
                    p => p.paymentStatus === "Success"
                ).length;

            const pendingRefunds =
                refunds.filter(
                    r => r.refundStatus === "Pending"
                ).length;

            setStats({

               flights: flights.length,

                users: usersRes.data.length,

                bookings: bookings.length,

                payments: successfulPayments,

                refunds: pendingRefunds,

                revenue

            });

        }
        catch (error) {

            console.log(error);

            alert("Failed To Load Dashboard");

        }

    };

    return (

        <div className="admin-page">

            {/* Header */}

            <div className="dashboard-hero">

                <div className="text-center mb-4">
                    <img
                        src={logo}
                        alt="SimplyFly"
                        style={{
                            width: "190px",
                            height: "auto"
                        }}
                    />

                    <h1 className="mt-3">
                        SimplyFly Admin Dashboard
                    </h1>

                    <p className="text-muted">
                        Manage Flights, Users and System Operations
                    </p>
                </div>




            </div>

            <hr />

            {/* Stats Cards */}

            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-title">✈ Flights</div>
                    <div className="stat-value flight">
                        {stats.flights}
                    </div>
                    <p>Total Flights</p>
                </div>

                <div className="stat-card">
                    <div className="stat-title">👥 Users</div>
                    <div className="stat-value user">
                        {stats.users}
                    </div>
                    <p>Registered Users</p>
                </div>

                <div className="stat-card">
                    <div className="stat-title">🎟 Bookings</div>
                    <div className="stat-value booking">
                        {stats.bookings}
                    </div>
                    <p>Total Bookings</p>
                </div>

                <div className="stat-card">
                    <div className="stat-title">💳 Payments</div>
                    <div className="stat-value payment">
                        {stats.payments}
                    </div>
                    <p>Successful Payments</p>
                </div>

                <div className="stat-card">
                    <div className="stat-title">💰 Revenue</div>
                    <div className="stat-value revenue">
                        ₹{stats.revenue.toLocaleString()}
                    </div>
                    <p>Total Revenue</p>
                </div>

                <div className="stat-card">
                    <div className="stat-title">💸 Refunds</div>
                    <div className="stat-value refund">
                        {stats.refunds}
                    </div>
                    <p>Pending Refunds</p>
                </div>

            </div>

            {/* Quick Actions */}

            <h2 className="section-title">
                Quick Actions
            </h2>
            <div className="stat-card">
            <div className="action-grid">

                <Link
                    to="/add-flight"
                    className="action-btn add-flight"
                >
                    ➕ Add Flight
                </Link>
                
                <Link
                    to="/admin-flights"
                    className="action-btn manage-flight"
                >
                    ✈ Manage Flights
                </Link>

                <Link
                    to="/users"
                    className="action-btn users"
                >
                    👥 Manage Users
                </Link>

                <Link
                    to="/admin-bookings"
                    className="action-btn bookings"
                >
                    🎟 View Bookings
                </Link>

                <Link
                    to="/reports"
                    className="action-btn reports"
                >
                    📊 Reports
                </Link>
                </div>
            </div>

            {/* Recent Activity */}

            <div className="activity-card">

                <h3>
                    Recent Activity
                </h3>

                <table className="table activity-table">

                    <thead>

                        <tr>

                            <th>User</th>
                            <th>Action</th>
                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>Admin</td>

                            <td>
                                Added New Flight
                            </td>

                            <td>
                                Today
                            </td>

                        </tr>

                        <tr>

                            <td>Admin</td>

                            <td>
                                Updated Flight
                            </td>

                            <td>
                                Today
                            </td>

                        </tr>

                        <tr>

                            <td>System</td>

                            <td>
                                New User Registered
                            </td>

                            <td>
                                Today
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default AdminDashboard;