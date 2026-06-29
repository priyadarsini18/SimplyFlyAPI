import { useEffect, useState } from "react";
import axios from "axios";
import RevenueChart from "../../components/flightowner/RevenueChart";
function Revenue() {

    const [revenue, setRevenue] =
        useState(0);

    useEffect(() => {
        loadRevenue();
    }, []);

    const loadRevenue = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "https://localhost:8080/api/v1/Flights/owner-revenue",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    });

            setRevenue(
                response.data.revenue
            );
        }
        catch (error) {

            console.log(error);

            alert(
                "Failed To Load Revenue"
            );
        }
    };

    return (
        <div className="owner-dashboard">

        <div className="container mt-4">

            <h1>
                Revenue Dashboard
            </h1>

            <div className="card mt-4 p-4 shadow">

                <h3>
                    Total Revenue
                </h3>

                <h1 className="text-success">
                    ₹{revenue}
                </h1>
                    <RevenueChart />
            </div>
            </div>
        </div>
    );
}

export default Revenue;