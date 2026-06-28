import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function DashboardCharts({ report }) {

    const flightChart = {

        labels: [
            "Available",
            "Cancelled"
        ],

        datasets: [

            {

                label: "Flights",

                data: [

                    report.availableFlights,

                    report.cancelledFlights

                ],

                backgroundColor: [

                    "#00C853",

                    "#FF5252"

                ],

                borderRadius: 8

            }

        ]

    };

    const bookingChart = {

        labels: [

            "Bookings",

            "Payments",

            "Refunds"

        ],

        datasets: [

            {

                data: [

                    report.totalBookings,

                    report.successfulPayments,

                    report.totalRefunds

                ],

                backgroundColor: [

                    "#2196F3",

                    "#00BCD4",

                    "#FF9800"

                ]

            }

        ]

    };

    const revenueChart = {

        labels: [

            "Revenue"

        ],

        datasets: [

            {

                label: "Revenue",

                data: [

                    report.totalRevenue

                ],

                borderColor: "#0066ff",

                backgroundColor: "rgba(0,102,255,.2)",

                fill: true,

                tension: .4

            }

        ]

    };

    return (

        <div className="row mt-5">

            <div className="col-lg-6 mb-4">

                <div className="chart-card">

                    <h4>
                        Flight Status
                    </h4>

                    <Bar
                        data={flightChart}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    />

                </div>

            </div>

            <div className="col-lg-6 mb-4">

                <div className="chart-card">

                    <h4>
                        Booking Distribution
                    </h4>

                    <Pie
                        data={bookingChart}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    />

                </div>

            </div>

            <div className="col-lg-12">

                <div className="chart-card">

                    <h4>
                        Revenue Overview
                    </h4>

                    <Line
                        data={revenueChart}
                    />

                </div>

            </div>

        </div>

    );

}

export default DashboardCharts;