function SearchSection() {
    return (
        <section className="search-section">

            <div className="search-card">

                <div className="trip-type">
                    <button className="active">One Way</button>
                    <button>Round Trip</button>
                </div>

                <div className="search-form">

                    <input
                        type="text"
                        placeholder="✈ From City"
                    />

                    <input
                        type="text"
                        placeholder="📍 To City"
                    />

                    <input
                        type="date"
                    />

                    <select>
                        <option>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3 Passengers</option>
                    </select>

                </div>

                <button className="search-flight-btn">
                    Search Flights
                </button>

            </div>

        </section>
    );
}

export default SearchSection;