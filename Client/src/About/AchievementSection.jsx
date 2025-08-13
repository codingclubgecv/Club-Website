import React from "react";
import "./AchievementSection.css";

export default function AchievementSection() {
  const achievements = [
    {
      img: "/images/job.png",
      title: "🏆 Winner - National Hackathon 2024",
      description:
        "Our team secured 1st place among 200+ teams in the National Hackathon.",
    },
    {
      img: "/images/job.png",
      title: "💡 AI Project Recognition",
      description:
        "Developed an AI-powered tool featured in a top tech magazine.",
    },
    {
      img: "/images/job.png",
      title: "🌍 Community Impact",
      description:
        "Organized free coding workshops for 500+ students across the city.",
    },
  ];

  return (
    <section className="achievements-section">
      <h2>Our Achievements</h2>
      <div className="achievements-grid">
        {achievements.map((item, index) => (
          <div className="achievement-card" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="achievement-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
