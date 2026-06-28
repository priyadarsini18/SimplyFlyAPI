import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "../../styles/AdminTheme.css";
function AdminRefunds() {

    const [refunds, setRefunds] = useState([]);
    const [refundAmounts, setRefundAmounts] = useState({});
    const loadRefunds = async () => {

        const res = await api.get("/Refund");

        setRefunds(res.data);
    };

    useEffect(() => {

        loadRefunds();

    }, []);

    const processRefund = async (refundId) => {

        try {

            const refundAmount =
                refundAmounts[refundId];

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

            // Clear the textbox
            setRefundAmounts(prev => ({
                ...prev,
                [refundId]: ""
            }));

            alert("Refund Processed Successfully");

            // Reload updated data
            loadRefunds();

        }

        catch (err) {

            console.log(err);

            alert("Unable to process refund");
        }
    };
    return (

        <>
            <div className="admin-page">


            <div className="container mt-4">

                <h2>Refund Management</h2>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>Refund ID</th>

                            <th>Passenger</th>

                            <th>Flight</th>

                            <th>Journey</th>

                            <th>Ticket Price</th>

                            <th>Refund Amount</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            refunds.map(r => (

                                <tr key={r.refundId}>

                                    <td>{r.refundId}</td>

                                    <td>{r.passengerName}</td>

                                    <td>{r.flightName}</td>

                                    <td>

                                        {r.fromCity}

                                        {" → "}

                                        {r.toCity}

                                    </td>

                                    <td>

                                        ₹{r.totalAmount}

                                    </td>

                                    <td>

                                        {

                                            r.refundStatus === "Pending"

                                                ?

                                                <input

                                                    type="number"

                                                    className="form-control"

                                                    placeholder="Refund"

                                                    value={refundAmounts[r.refundId] || ""}

                                                    onChange={(e) =>

                                                        setRefundAmounts({

                                                            ...refundAmounts,

                                                            [r.refundId]:

                                                                e.target.value

                                                        })

                                                    }

                                                />

                                                :

                                                <>₹{r.refundAmount}</>

                                        }

                                    </td>

                                    <td>

                                        {

                                            r.refundStatus === "Processed"

                                                ?

                                                <span className="badge bg-success">

                                                    Processed

                                                </span>

                                                :

                                                <span className="badge bg-warning text-dark">

                                                    Pending

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        {

                                            r.refundStatus === "Pending"

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

                            ))

                        }

                    </tbody>

                </table>
                </div>
            </div>

        </>

    );

}

export default AdminRefunds;