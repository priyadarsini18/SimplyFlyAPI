import { useEffect, useState } from "react";
import API from "../../services/api";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response =
                await API.get("/User");

            setUsers(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Failed To Load Users");
        }
    };

    return (
        <div className="admin-page">


        <div className="container mt-5">

            <h1 className="mb-4">
                👥 Manage Users
            </h1>

            <table className="table table-bordered table-striped shadow">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map(user => (

                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={
                                            user.role === "Admin"
                                                ? "badge bg-danger"
                                                : user.role === "FlightOwner"
                                                    ? "badge bg-warning text-dark"
                                                    : "badge bg-primary"
                                        }
                                    >
                                        {user.role}
                                    </span>
                                </td>
                            </tr>

                        ))
                    }

                </tbody>

            </table>
            </div>
        </div>
    );
}

export default Users;