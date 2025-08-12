import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    registrationNo: "",
    branch: "",
    batch: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear individual field error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    if (!form.registrationNo.trim())
      newErrors.registrationNo = "Registration number is required";
    if (!form.branch.trim()) newErrors.branch = "Branch is required";
    if (!form.batch.trim()) newErrors.batch = "Batch is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await API.post("/auth/register", form);
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h2 className="form-title">Join Coding Club</h2>
        <p className="form-subtitle">
          Fill in your details to register for the test
        </p>

        <form onSubmit={handleSubmit}>
          {[
            "name",
            "email",
            "password",
            "registrationNo",
            "branch",
            "batch",
          ].map((field, idx) => (
            <div key={idx} className="input-group">
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={
                  field === "registrationNo"
                    ? "Registration Number"
                    : field === "batch"
                    ? "Batch (e.g., 2021-2025)"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={form[field]}
                onChange={handleChange}
                className={errors[field] ? "error-input" : ""}
              />
              {errors[field] && (
                <span className="error-text">{errors[field]}</span>
              )}
            </div>
          ))}

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
