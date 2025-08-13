import React from "react";
import "./LeadsSection.css";

const leadsData = [
  {
    name: "Aman Verma",
    role: "Club President",
    bio: "Final-year CSE student passionate about AI and open-source contributions.",
    image: "/images/deepak1.jpg",
    linkedin: "https://linkedin.com/in/amanverma",
    github: "https://github.com/amanverma",
  },
  {
    name: "Priya Sharma",
    role: "Vice President",
    bio: "Full-stack developer with a love for hackathons and teaching.",
    image: "/images/deepak1.jpg",
    linkedin: "https://linkedin.com/in/priyasharma",
    github: "https://github.com/priyasharma",
  },
  {
    name: "Rohit Kumar",
    role: "Technical Lead",
    bio: "Backend engineer & cloud enthusiast, loves solving complex problems.",
    image: "/images/deepak1.jpg",
    linkedin: "https://linkedin.com/in/rohitkumar",
    github: "https://github.com/rohitkumar",
  },
];

export default function LeadsPage() {
  return (
    <div className="leads-page">
      <section className="leads-grid">
        {leadsData.map((lead, index) => (
          <div className="lead-card" key={index}>
            <img src={lead.image} alt={lead.name} />
            <h2>{lead.name}</h2>
            <h4>{lead.role}</h4>
            <p>{lead.bio}</p>
            <div className="social-links">
              <a href={lead.linkedin} target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={lead.github} target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
