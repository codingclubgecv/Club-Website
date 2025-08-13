import React from "react";
import "./EventPage.css";

export default function EventPage() {
  return (
    <div className="event-page">
      {/* Hero */}
      <section className="hero">
        <h1>Coding Club Annual Hackathon 2025</h1>
        <p>
          🚀 Code, Create, Compete — Join the biggest coding event of the year!
        </p>
        <span className="event-date">
          📅 20-22 September 2025 | 🕒 9 AM Onwards
        </span>
        <button className="register-btn">Register Now</button>
      </section>

      {/* About */}
      <section className="details">
        <h2>About the Event</h2>
        <p>
          This 3-day hackathon brings together coding enthusiasts from across
          the country. Build innovative projects, network with industry experts,
          and win exciting prizes.
        </p>
      </section>

      {/* Speakers */}
      <section className="speakers">
        <h2>Guest Speakers</h2>
        <div className="speaker-cards">
          <div className="speaker-card">
            <img src="/speaker1.jpg" alt="Speaker 1" />
            <h3>Jane Doe</h3>
            <p>Google Cloud Engineer</p>
          </div>
          <div className="speaker-card">
            <img src="/speaker2.jpg" alt="Speaker 2" />
            <h3>John Smith</h3>
            <p>OpenAI Developer Advocate</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <ul>
          <li>
            <strong>AI Bootcamp</strong> — 📅 5 Oct 2025 | 🕒 10 AM
            <span>Hands-on workshop on AI & ML</span>
          </li>
          <li>
            <strong>Web Dev Marathon</strong> — 📅 12 Nov 2025 | 🕒 9 AM
            <span>24-hour coding sprint for web projects</span>
          </li>
          <li>
            <strong>Cybersecurity Meetup</strong> — 📅 20 Dec 2025 | 🕒 2 PM
            <span>Learn ethical hacking & security best practices</span>
          </li>
        </ul>
      </section>

      {/* Past Events Gallery */}
      <section className="past-events">
        <h2>Past Events Gallery</h2>
        <div className="gallery">
          <img src="/past1.jpg" alt="Past Event 1" />
          <img src="/past2.jpg" alt="Past Event 2" />
          <img src="/past3.jpg" alt="Past Event 3" />
          <img src="/past4.jpg" alt="Past Event 4" />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>📧 codingclub@example.com | 📍 Tech Park Campus</p>
      </footer>
    </div>
  );
}
