import React from "react";
import "./PageStyles.css";
import blog1 from "./assets/blog1.jpg";
import blog2 from "./assets/blog2.jpg";
import blog3 from "./assets/blog3.jpg";

export default function Blog() {
  const posts = [
    {
      title: "Healthy Living Tips",
      summary: "Learn how to maintain a balanced lifestyle...",
      img: blog1,
      link: "https://himalayaninstitute.org/online/series/pillars-of-health/?gad_source=1&gad_campaignid=20033835062&gbraid=0AAAAADjruXkPIyRCsluvaYn-4XlWLitOW",
    },
    {
      title: "Managing Stress",
      summary: "Effective strategies to reduce anxiety...",
      img: blog2,
      link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/managing-stress-and-building-resilience/",
    },
    {
      title: "Nutrition & Diet",
      summary: "Key nutrients you need daily...",
      img: blog3,
      link: "https://shimacrobiotics.org/mediterranean-diet-vs-macrobiotics/?gad_source=1&gad_campaignid=1367635080&gbraid=0AAAAADPPqdj_WQaqD9BqmrrUExihwg_W2&gclid=CjwKCAjwmenCBhA4EiwAtVjzmuxDA_OfhWsm1yvDFc8x9F5LobS_kd9xTcAxCEjZuzaRG97i8OlRzhoCP6MQAvD_BwE",
    },
  ];

  return (
    <div className="page-container">
      <h2 className="page-header">Our Blog</h2>
      <div className="page-cards">
        {posts.map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="page-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="page-graphic">
              <img src={p.img} alt={p.title} />
            </div>
            <h4>{p.title}</h4>
            <p>{p.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
