import React from "react";
import "./AboutPage.css";
import LeadsPage from "../About/LeadsSection";
import AchievementSection from "../About/AchievementSection";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* About Section */}
      <section className="about-section">
        <h1>About Coding Club</h1>
        <p>
          The Coding Club is a community of passionate programmers, innovators,
          and tech enthusiasts at our campus. Our mission is to provide a
          platform for students to learn, collaborate, and create amazing tech
          projects. We organize workshops, hackathons, and coding challenges to
          enhance skills and promote innovation.
        </p>
      </section>

      {/* Leads Section */}
      <section className="leads-section">
        <h2>Meet Our Leads</h2>
        <LeadsPage />
      </section>

      {/* Achievements Section */}
      <AchievementSection />
    </div>
  );
}
