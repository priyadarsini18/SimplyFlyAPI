import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function RevenueChart() {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [
            {
                label: "Revenue",

                data: [
                    12000,
                    15000,
                    18000,
                    22000,
                    25000,
                    30000
                ],

                borderColor: "#1e88e5",

                backgroundColor: "rgba(30,136,229,.2)",

                tension: 0.4,

                fill: true
            }
        ]
    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false
            }
        }
    };

    return (

        <div className="chart-card">

            <h3>Monthly Revenue Trend</h3>

            <Line
                data={data}
                options={options}
            />

        </div>

    );

}

export default RevenueChart;