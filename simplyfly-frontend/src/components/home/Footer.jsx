import "../../styles/Home.css";

function Footer() {
    return (

        <footer className="footer">

            <div className="footer-container">

                {/* Logo Section */}

                <div className="footer-brand">

                    <h2>
                        ✈ SimplyFly
                    </h2>

                    <p>
                        Your gateway to premium air travel
                        experiences worldwide.
                    </p>

                    <div className="social-icons">

                        <span>📘</span>
                        <span>🐦</span>
                        <span>📸</span>
                        <span>💼</span>

                    </div>

                </div>

                {/* Services */}

                <div>

                    <h4>Services</h4>

                    <ul>

                        <li>Book Flights</li>
                        <li>Manage Booking</li>
                        <li>Flight Status</li>
                        <li>Check-In Online</li>
                        <li>Travel Insurance</li>

                    </ul>

                </div>

                {/* Company */}

                <div>

                    <h4>Company</h4>

                    <ul>

                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Partners</li>
                        <li>Blog</li>
                        <li>Contact</li>

                    </ul>

                </div>

            </div>

            <hr />

            <div className="footer-bottom">

                <span>
                    📞 +91 9876543210
                </span>

                <span>
                    ✉ support@simplyfly.com
                </span>

            </div>

        </footer>

    );
}

export default Footer;