import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "../../styles/AdminTheme.css";
import DashboardCharts from "../../components/admin/DashboardCharts";
function Reports() {
    const [report, setReport] = useState({
        totalFlights: 0,
        availableFlights: 0,
        cancelledFlights: 0,
        totalUsers: 0,
        totalRevenue: 0,
        totalBookings: 0,
        successfulPayments: 0,
        totalRefunds: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const [
                flightsRes,
                usersRes,
                bookingsRes,
                refundsRes,
            ] = await Promise.all([
                API.get("/Admin/flights"),
                API.get("/User"),
                API.get("/Booking"),
                API.get("/Refund"),
            ]);

            const flights = flightsRes.data;
            const users = usersRes.data;
            const bookings = bookingsRes.data;
            const refunds = refundsRes.data;

            const totalRevenue = bookings.reduce(
                (sum, booking) => sum + (booking.totalAmount || 0),
                0
            );

            const successfulPayments = bookings.filter(
                (b) => b.paymentStatus === "Completed"
            ).length;

            setReport({
                totalFlights: flights.length,
                availableFlights: flights.filter(
                    (f) => f.status === "Available"
                ).length,

                cancelledFlights: flights.filter(
                    (f) => f.status === "Cancelled"
                ).length,

                totalUsers: users.length,

                totalRevenue,

                totalBookings: bookings.length,

                successfulPayments,

                totalRefunds: refunds.length,
            });
        } catch (err) {
            console.log(err);
            alert("Failed to load reports.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <AdminNavbar />
                <div className="report-loading">
                    <div className="spinner-border text-info"></div>
                    <h4 className="mt-3">Loading Reports...</h4>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="admin-page">

            <div className="reports-page">

                {/* HERO */}

                <div className="reports-header">

                    <div>

                        <h1>
                            📊 Reports Dashboard
                        </h1>

                        <p>
                            Monitor flights, bookings,
                            revenue and airline performance.
                        </p>

                    </div>

                </div>

                {/* TOP CARDS */}

                <div className="reports-grid m">

                    <div className="report-card">
                        <div className="icon">✈️</div>

                        <h5>Total Flights</h5>

                        <h2>{report.totalFlights}</h2>

                        <div className="progress">
                            <div
                                className="progress-bar bg-primary"
                                style={{ width: "100%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="report-card">
                        <div className="icon">🟢</div>

                        <h5>Available Flights</h5>

                        <h2>{report.availableFlights}</h2>

                        <div className="progress">
                            <div
                                className="progress-bar bg-success"
                                style={{
                                    width:
                                        report.totalFlights === 0
                                            ? "0%"
                                            : `${(
                                                (report.availableFlights /
                                                    report.totalFlights) *
                                                100
                                            ).toFixed(0)}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="report-card">
                        <div className="icon">❌</div>

                        <h5>Cancelled Flights</h5>

                        <h2>{report.cancelledFlights}</h2>

                        <div className="progress">
                            <div
                                className="progress-bar bg-danger"
                                style={{
                                    width:
                                        report.totalFlights === 0
                                            ? "0%"
                                            : `${(
                                                (report.cancelledFlights /
                                                    report.totalFlights) *
                                                100
                                            ).toFixed(0)}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="report-card">
                        <div className="icon">👥</div>

                        <h5>Total Users</h5>

                        <h2>{report.totalUsers}</h2>

                        <div className="progress">
                            <div
                                className="progress-bar bg-info"
                                style={{ width: "100%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="report-card">
                        <div className="icon">🎫</div>

                        <h5>Bookings</h5>

                        <h2>{report.totalBookings}</h2>

                        <div className="progress">
                            <div
                                className="progress-bar bg-warning"
                                style={{ width: "100%" }}
                            ></div>
                        </div>
                    </div>

                    <div className="report-card">
                        <div className="icon">💳</div>

                        <h5>Successful Payments</h5>

                        <h2>{report.successfulPayments}</h2>

                        <div className="progress">
                            <div
                                className="progress-bar bg-success"
                                style={{
                                    width:
                                        report.totalBookings === 0
                                            ? "0%"
                                            : `${(
                                                (report.successfulPayments /
                                                    report.totalBookings) *
                                                100
                                            ).toFixed(0)}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="report-card">
                        <div className="icon">💸</div>

                        <h5>Refunds</h5>

                        <h2>{report.totalRefunds}</h2>

                        <div className="progress">
                            <div
                                className="progress-bar bg-secondary"
                                style={{
                                    width:
                                        report.totalBookings === 0
                                            ? "0%"
                                            : `${(
                                                (report.totalRefunds /
                                                    report.totalBookings) *
                                                100
                                            ).toFixed(0)}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="report-card revenue-card">

                        <div className="icon">💰</div>

                        <h5>Total Revenue</h5>

                        <h2>
                            ₹
                            {report.totalRevenue.toLocaleString(
                                "en-IN"
                            )}
                        </h2>

                        <small>
                            Airline Revenue
                        </small>

                    </div>

                </div>

                {/* SUMMARY SECTION */}

                <div className="summary-section">

                    <div className="summary-card">

                        <h4>📈 Business Summary</h4>

                        <ul>

                            <li>
                                Total Flights :
                                <strong>
                                    {" "}
                                    {report.totalFlights}
                                </strong>
                            </li>

                            <li>
                                Total Bookings :
                                <strong>
                                    {" "}
                                    {report.totalBookings}
                                </strong>
                            </li>

                            <li>
                                Successful Payments :
                                <strong>
                                    {" "}
                                    {report.successfulPayments}
                                </strong>
                            </li>

                            <li>
                                Total Refunds :
                                <strong>
                                    {" "}
                                    {report.totalRefunds}
                                </strong>
                            </li>

                            <li>
                                Total Revenue :
                                <strong>
                                    {" "}
                                    ₹
                                    {report.totalRevenue.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>
                            </li>

                        </ul>

                    </div>


                    <div className="summary-card">

                        <h4>✈ Airline Status</h4>

                        <div className="status-box success">
                            ✔ Flights Operating Normally
                        </div>

                        <div className="status-box info">
                            ✔ Payment Gateway Active
                        </div>

                        <div className="status-box warning">
                            ✔ Refund System Running
                        </div>

                        <div className="status-box primary">
                            ✔ Booking System Online
                        </div>

                    </div>
                    <DashboardCharts
                        report={report}
                    />

                </div>
                </div>
            </div>
        </>
    );
}

export default Reports;