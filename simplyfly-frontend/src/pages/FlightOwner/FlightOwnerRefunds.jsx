import { useEffect, useState } from "react";
import api from "../../services/api";

function FlightOwnerRefunds() {

    const [refunds, setRefunds] = useState([]);
    const [refundAmounts, setRefundAmounts] = useState({});

    const loadRefunds = async () => {

        try {

            const res = await api.get("/Refund");

            setRefunds(res.data);

        } catch (err) {

            console.log(err);

            alert("Unable to load refund requests");
        }
    };

    useEffect(() => {

        loadRefunds();

    }, []);

    const processRefund = async (refundId) => {

        try {

            const refundAmount = refundAmounts[refundId];

            if (!refundAmount) {

                alert("Enter refund amount");

                return;
            }

            await api.put(

                `/Refund/process/${refundId}`,

                {
                    refundAmount: Number(refundAmount)
                }

            );

            setRefundAmounts(prev => ({
                ...prev,
                [refundId]: ""
            }));

            alert("Refund Processed Successfully");

            loadRefunds();

        }
        catch (err) {

            console.log(err);

            alert("Unable to process refund");
        }
    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Refund Requests
            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Refund ID</th>

                        <th>Passenger</th>

                        <th>Flight</th>

                        <th>Route</th>

                        <th>Ticket Price</th>

                        <th>Refund Amount</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {refunds.map(r => (

                        <tr key={r.refundId}>

                            <td>{r.refundId}</td>

                            <td>{r.passengerName}</td>

                            <td>{r.flightName}</td>

                            <td>
                                {r.fromCity} → {r.toCity}
                            </td>

                            <td>₹{r.totalAmount}</td>

                            <td>

                                {r.refundStatus === "Pending"

                                    ?

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Refund"
                                        value={refundAmounts[r.refundId] || ""}
                                        onChange={(e) =>
                                            setRefundAmounts({
                                                ...refundAmounts,
                                                [r.refundId]: e.target.value
                                            })
                                        }
                                    />

                                    :

                                    <>₹{r.refundAmount}</>

                                }

                            </td>

                            <td>

                                {r.refundStatus === "Pending"

                                    ?

                                    <span className="badge bg-warning text-dark">

                                        Pending

                                    </span>

                                    :

                                    <span className="badge bg-success">

                                        Processed

                                    </span>

                                }

                            </td>

                            <td>

                                {r.refundStatus === "Pending"

                                    ?

                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            processRefund(r.refundId)
                                        }
                                    >

                                        Approve Refund

                                    </button>

                                    :

                                    <button
                                        className="btn btn-secondary"
                                        disabled
                                    >

                                        Completed

                                    </button>

                                }

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default FlightOwnerRefunds;