import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero / Club Name */}
      <section className="hero-section">
        <h1>🚀 Coding Club</h1>
        <p>Learn. Build. Lead.</p>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower students with coding skills, foster
          innovation, and build a community where technology meets creativity.
        </p>
      </section>

      {/* Event Highlight */}
      <section className="event-highlight">
        <h2>🔥 Upcoming Event</h2>
        <div className="event-card">
          <h3>Annual Hackathon 2025</h3>
          <p>📅 20–22 September 2025 | 🕒 9 AM Onwards</p>
          <button className="btn">Register Now</button>
        </div>
      </section>

      {/* Leads Section */}
      <section className="leads-section">
        <h2>Meet Our Leaders</h2>
        <div className="leads-grid">
          <div className="lead-card">
            <img src="/images/deepak1.jpg" alt="Leader 1" />
            <h3>Jane Doe</h3>
            <p>President</p>
          </div>
          <div className="lead-card">
            <img src="/images/deepak1.jpg" alt="Leader 2" />
            <h3>John Smith</h3>
            <p>Vice President</p>
          </div>
          <div className="lead-card">
            <img src="/images/deepak1.jpg" alt="Leader 3" />
            <h3>Sarah Lee</h3>
            <p>Event Coordinator</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>📧 codingclub@example.com | 📍 Tech Park Campus</p>
      </footer>
    </div>
  );
}
