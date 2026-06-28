import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/home/Navbar";
import AdminNavbar from "./components/admin/AdminNavbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login";
import Register from "./pages/Home/Register";
import Flights from "./pages/Home/Flights";
import FlightDetails from "./pages/FlightOwner/FlightDetails";
import MyBookings from "./pages/User/MyBookings";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminFlights from "./pages/Admin/AdminFlights";
import AddFlight from "./pages/Admin/AddFlight";
import EditFlight from "./pages/Admin/EditFlight";
import Users from "./pages/Admin/Users";
import Reports from "./pages/Admin/Reports";

import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import Profile from "./pages/User/Profile";
import RegisterFlightOwner from "./pages/Home/RegisterFlightOwner";
import FlightOwnerDashboard from "./pages/FlightOwner/FlightOwnerDashboard";
import OwnerMyFlights from "./pages/FlightOwner/OwnerMyFlights";
import OwnerAddFlight from "./pages/FlightOwner/OwnerAddFlight";
import OwnerBookings from "./pages/FlightOwner/OwnerBookings";
import OwnerRevenue from "./pages/FlightOwner/OwnerRevenue";
import OwnerEditFlight from "./pages/FlightOwner/OwnerEditFlight";
import SeatSelection from "./components/user/SeatSelection";
import PassengerDetails from "./pages/Home/PassengerDetails";
import Payment from "./pages/User/Payment";
import EditProfile from "./pages/User/EditProfile";
import ForgotPassword from "./pages/Home/ForgotPassword";
import VerifyOtp from "./pages/Home/VerifyOtp";
import ResetPassword from "./pages/Home/ResetPassword";
import Ticket from "./components/user/Ticket";

import { useState, useEffect } from "react";
import VerifyEmail from "./pages/Home/VerifyEmail";
import SavedFlights from "./pages/User/SavedFlights";
import PaymentHistory from "./pages/User/PaymentHistory";
import AdminRefunds from "./pages/Admin/AdminRefunds";
import FlightOwnerRefunds from "./pages/FlightOwner/FlightOwnerRefunds";

function AppContent() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {

        const theme =
            localStorage.getItem("theme");

        if (theme === "dark") {

            setDarkMode(true);

        }

    }, []);
    const toggleTheme = () => {

        const newTheme = !darkMode;

        setDarkMode(newTheme);

        localStorage.setItem(
            "theme",
            newTheme ? "dark" : "light"
        );
    };
    const location = useLocation();

    const role =
        localStorage.getItem("role");

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    const isAdminPage =
        location.pathname.startsWith("/admin") ||
        location.pathname === "/users" ||
        location.pathname === "/reports" ||
        location.pathname === "/add-flight" ||
        location.pathname.startsWith("/edit-flight");

    return (
        
            <div
                className={
                    darkMode
                        ? "dark-theme"
                        : "light-theme"
                }
            >
            {!hideNavbar && (
                role === "Admin" && isAdminPage
                    ? <AdminNavbar />
                    : <Navbar
                        darkMode={darkMode}
                        toggleTheme={toggleTheme}
                    />
            )}

            <Routes>

                {/* USER ROUTES */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/flights"
                    element={<Flights />}
                />

                <Route
                    path="/flights/:id"
                    element={<FlightDetails />}
                />

                <Route
                    path="/my-bookings"
                    element={<MyBookings />}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                {/* ADMIN ROUTES */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin-flights"
                    element={<AdminFlights />}
                />

                <Route
                    path="/admin-bookings"
                    element={<AdminBookings />}
                />

                <Route
                    path="/add-flight"
                    element={<AddFlight />}
                />

                <Route
                    path="/edit-flight/:id"
                    element={<EditFlight />}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

                <Route
                    path="/reports"
                    element={<Reports />}
                />

                <Route
                    path="/register-flightowner"
                    element={<RegisterFlightOwner />}
                />
                <Route
                    path="/flight-owner"
                    element={<FlightOwnerDashboard />}
                />
                <Route
                    path="/owner-my-flights"
                    element={<OwnerMyFlights />}
                />
                <Route
                    path="/owner-add-flight"
                    element={<OwnerAddFlight />}
                />

                <Route
                    path="/owner-bookings"
                    element={<OwnerBookings />}
                />
                <Route
                    path="/owner-revenue"
                    element={<OwnerRevenue />}
                />


                <Route
                    path="/owner-edit-flight/:id"
                    element={<OwnerEditFlight />}
                />

                <Route
                    path="/seat-selection/:flightId"
                    element={<SeatSelection />}
                />
                <Route
                    path="/passenger-details"
                    element={<PassengerDetails />}
                />
                <Route
                    path="/payment"
                    element={<Payment />}
                />
                
                <Route
                    path="/edit-profile"
                    element={<EditProfile />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/verify-otp"
                    element={<VerifyOtp />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />
                <Route
                    path="/verify-email"
                    element={<VerifyEmail />}
                />
                <Route
                    path="/ticket/:id"
                    element={<Ticket />}
                />
                <Route
                    path="/saved-flights"
                    element={<SavedFlights />}
                />
                <Route
                    path="/payment-history"
                    element={<PaymentHistory />}
                />
                <Route
                    path="/admin-refunds"
                    element={<AdminRefunds />}
                />
                <Route
                    path="/flight-owner/refunds"
                    element={<FlightOwnerRefunds />}
                />
                
            </Routes>
        </div>
    );
}

function App() {

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;