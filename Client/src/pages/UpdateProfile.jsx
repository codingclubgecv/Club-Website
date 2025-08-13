import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/auth/me");
                setFormData({ ...res.data.user, profileImage: null });
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
    };

    const handleArrayChange = (field, value) => {
        try {
            setFormData((prev) => ({ ...prev, [field]: JSON.parse(value) }));
        } catch {
            console.error("Invalid JSON format for", field);
        }
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Basic info update
            await API.put("/profile/update-basic", {
                name: formData.name,
                phone: formData.phone,
                about: formData.about,
                branch: formData.branch,
                batch: formData.batch,
                registrationNo: formData.registrationNo,
                collegeName: formData.collegeName
            });

            // Education update
            await API.put("/profile/update-education", { education: formData.education });

            // Skills update
            await API.put("/profile/update-skills", { skills: formData.skills });

            // Social update
            await API.put("/profile/update-social", formData.socialLinks);

            // Image update (if new selected)
            if (formData.profileImage) {
                const imgData = new FormData();
                imgData.append("profileImage", formData.profileImage);
                await API.put("/profile/update-image", imgData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            navigate("/profile");
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    if (!formData) return <p>Loading...</p>;

    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <h3>Basic Info</h3>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" />
                <textarea name="about" value={formData.about || ""} onChange={handleChange} placeholder="About" />
                <input name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" />
                <input name="batch" value={formData.batch} onChange={handleChange} placeholder="Batch" />
                <input name="registrationNo" value={formData.registrationNo} onChange={handleChange} placeholder="Registration No" />
                <input name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" />

                <h3>Profile Image</h3>
                <input type="file" onChange={handleFileChange} />

                <h3>Education (JSON array)</h3>
                <textarea
                    value={JSON.stringify(formData.education)}
                    onChange={(e) => handleArrayChange("education", e.target.value)}
                />

                <h3>Skills (JSON array)</h3>
                <textarea
                    value={JSON.stringify(formData.skills)}
                    onChange={(e) => handleArrayChange("skills", e.target.value)}
                />

                <h3>Social Links</h3>
                {Object.keys(formData.socialLinks || {}).map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={formData.socialLinks[key] || ""}
                        onChange={handleSocialChange}
                        placeholder={key}
                    />
                ))}

                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate("/profile")}>Cancel</button>
            </form>
        </div>
    );
}
