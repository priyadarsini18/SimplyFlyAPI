import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Ticket() {

    const { id } = useParams();

    const [booking, setBooking] =
        useState(null);

    const ticketRef =
        useRef();

    useEffect(() => {

        loadTicket();

    }, []);

    const loadTicket = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    `https://localhost:8080/api/v1/Booking/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setBooking(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Unable To Load Ticket");
        }
    };

    const downloadTicket = async () => {

        const canvas =
            await html2canvas(
                ticketRef.current
            );

        const imgData =
            canvas.toDataURL("image/png");

        const pdf =
            new jsPDF();

        pdf.addImage(
            imgData,
            "PNG",
            10,
            10,
            190,
            0
        );

        pdf.save(
            `SimplyFly_Ticket_${booking.bookingId}.pdf`
        );
    };

    if (!booking) {

        return (
            <div className="container mt-5">
                <h3>Loading Ticket...</h3>
            </div>
        );
    }

    const pnr =
        `SF${booking.bookingId}`;

    const ticketNo =
        `TK${booking.bookingId}`;

    return (

        <div className="container mt-5">

            <div
                className="card shadow p-4"
                ref={ticketRef}
            >

                <div className="text-center">

                    <h1>
                        ✈️ SimplyFly
                    </h1>

                    <h3>
                        Ticket Details
                    </h3>

                </div>

                <hr />

                <div className="row">

                    <div className="col-md-6">

                        <p>
                            <strong>PNR:</strong>
                            {" "}
                            {pnr}
                        </p>

                        <p>
                            <strong>Ticket No:</strong>
                            {" "}
                            {ticketNo}
                        </p>

                        <p>
                            <strong>Booking Id:</strong>
                            {" "}
                            {booking.bookingId}
                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>
                            <strong>Flight:</strong>
                            {" "}
                            {booking.flight.flightName}
                        </p>

                        <p>
                            <strong>Flight No:</strong>
                            {" "}
                            {booking.flight.flightNumber}
                        </p>

                    </div>

                </div>

                <hr />

                <div className="row">

                    <div className="col-md-6">

                        <p>
                            <strong>From:</strong>
                            {" "}
                            {booking.flight.fromCity}
                        </p>

                        <p>
                            <strong>To:</strong>
                            {" "}
                            {booking.flight.toCity}
                        </p>

                        <p>
                            <strong>Departure:</strong>
                            {" "}
                            {
                                new Date(
                                    booking.flight.departureTime
                                ).toLocaleString()
                            }
                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>
                            <strong>Seats:</strong>
                            {" "}
                            {booking.numberOfSeats}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            {" "}
                            {booking.bookingStatus}
                        </p>

                        <p>
                            <strong>Total Amount:</strong>
                            {" "}
                            ₹{booking.totalAmount}
                        </p>

                    </div>

                </div>

                <div className="text-center mt-4">

                    <QRCodeCanvas
                        value={
                            `PNR:${pnr}
Ticket:${ticketNo}
Booking:${booking.bookingId}`
                        }
                        size={180}
                    />

                </div>

            </div>

            <div className="text-center mt-4">

                <button
                    className="btn btn-success btn-lg"
                    onClick={downloadTicket}
                >
                    Download Ticket
                </button>

            </div>

        </div>
    );
}

export default Ticket;