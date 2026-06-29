import "../../styles/Home.css";

const destinations = [
    {
        city: "Dubai",
        country: "UAE • DXB",
        price: "$299",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
    },
    {
        city: "Singapore",
        country: "Singapore • SIN",
        price: "$449",
        image:
            "https://images.unsplash.com/photo-1525625293386-3f8f99389edd"
    },
    {
        city: "London",
        country: "UK • LHR",
        price: "$399",
        image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
    },
    {
        city: "Paris",
        country: "France • CDG",
        price: "$349",
        image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    },
    {
        city: "New York",
        country: "USA • JFK",
        price: "$599",
        image:
            "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2"
    },
    {
        city: "Tokyo",
        country: "Japan • HND",
        price: "$899",
        image:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
    },
];

function DestinationsSection() {
    return (
        <section className="destinations">

            <div className="section-title">

                <span>EXPLORE</span>

                <h2>
                    Popular Destinations
                </h2>

                <p>
                    Discover our most-loved routes around the world
                </p>

            </div>

            <div className="destination-grid">

                {destinations.map((item, index) => (

                    <div
                        className="destination-card"
                        key={index}
                    >
                        <img
                            src={item.image}
                            alt={item.city}
                        />

                        <div className="destination-overlay">

                            <small>
                                📍 {item.country}
                            </small>

                            <h3>
                                {item.city}
                            </h3>

                            <p>
                                Starting from
                                <br />
                                <span>
                                    {item.price}
                                </span>
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default DestinationsSection;