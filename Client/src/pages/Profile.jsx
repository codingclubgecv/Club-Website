import React, { useEffect, useState } from "react";
import API from "../utils/api"
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/auth/profile");
                setUser(res.data.user);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div className="profile-container">
            <h1>My Profile</h1>
            <img
                src={user.profileImage ? `${process.env.REACT_APP_API_URL}${user.profileImage}` : "/default-avatar.png"}
                alt="Profile"
                width="150"
                height="150"
            />
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone || "Not added"}</p>
            <p>About: {user.about || "Not added"}</p>
            <p>Branch: {user.branch}</p>
            <p>Batch: {user.batch}</p>
            <p>Registration No: {user.registrationNo}</p>
            <p>College: {user.collegeName}</p>

            <h3>Education</h3>
            {user.education.length > 0 ? (
                <ul>
                    {user.education.map((edu, index) => (
                        <li key={index}>
                            {edu.degree} - {edu.institution} ({edu.year})
                        </li>
                    ))}
                </ul>
            ) : <p>No education details</p>}

            <h3>Skills</h3>
            {user.skills.length > 0 ? (
                <ul>
                    {user.skills.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                    ))}
                </ul>
            ) : <p>No skills added</p>}

            <h3>Social Links</h3>
            {Object.entries(user.socialLinks || {}).map(([key, val]) => (
                <p key={key}>{key}: {val || "Not added"}</p>
            ))}

            <hr />
            <button onClick={() => navigate("/update-profile")}>Edit Profile</button>
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
        </div>
    );
}
