import "../../styles/Home.css";

function StatsSection() {
    return (

        <section className="stats-section">

            <div className="stats-container">

                <div className="stat-card">
                    <div className="stat-icon">✈</div>
                    <h2>10,000+</h2>
                    <p>Flights Daily</p>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <h2>50,000+</h2>
                    <p>Happy Passengers</p>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🌎</div>
                    <h2>100+</h2>
                    <p>Global Routes</p>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <h2>4.9</h2>
                    <p>Average Rating</p>
                </div>

            </div>

        </section>

    );
}

export default StatsSection;