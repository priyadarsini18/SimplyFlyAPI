import { useEffect, useState } from "react";
import api from "../../services/api";

function PaymentHistory() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

        try {

            const response =
                await api.get("/Payment/history");

            setPayments(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Payment History
            </h2>

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>Payment ID</th>
                            <th>Booking ID</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>

                    </thead>

                    <tbody>

                        {payments.map(payment => (

                            <tr key={payment.paymentId}>

                                <td>{payment.paymentId}</td>

                                <td>{payment.bookingId}</td>

                                <td>₹{payment.amount}</td>

                                <td>{payment.paymentMethod}</td>

                                <td>

                                    <span className="badge bg-success">

                                        {payment.paymentStatus}

                                    </span>

                                </td>

                                <td>

                                    {new Date(payment.paymentDate)
                                        .toLocaleString()}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PaymentHistory;