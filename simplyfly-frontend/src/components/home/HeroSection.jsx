import { Link } from "react-router-dom";
import "../../styles/Home.css";

function HeroSection() {
    return (
        <section className="hero">

            <div className="hero-overlay">

                <div className="hero-content">

                    <span className="hero-badge">
                        ⭐ WORLD-CLASS AIRLINE EXPERIENCE
                    </span>

                    <h1>
                        Explore the World
                        <br />
                        <span>with SimplyFly</span>
                    </h1>

                    <p>
                        Book flights, manage journeys,
                        and travel smarter — with the elegance
                        you deserve.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/flights"
                            className="hero-btn-primary"
                        >
                            🔍 Search Flights
                        </Link>

                        <Link
                            to="/register"
                            className="hero-btn-secondary"
                        >
                            Book Now →
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default HeroSection;