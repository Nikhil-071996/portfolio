import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioCards() {
  const cardsRef = useRef([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error loading projects", err);
      }
    };

    fetchProjects();
  }, []);

  

useEffect(() => {
  if (projects.length === 0) return; // stop until data arrives

  cardsRef.current.forEach((card) => {
    gsap.fromTo(
      card,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        duration: 0.8,
        scrollTrigger: { trigger: card },
      }
    );
  });
}, [projects]); 



  return (
    <div className="portfolio-container">
      {projects?.map((card, index) => (
        <a
          href={card?.liveDemo}
          target="_blank"
          className="portfolio-card"
          key={card._id}
          ref={(el) => (cardsRef.current[index] = el)}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            flex: "1",
          }}
        >
          <div
            className="portfolio-image-container"
            style={{ background: card.background, overflow: "hidden",  }}
          >
            
            <iframe
              src={card.liveDemo}
              title={card.title}
              loading="lazy"
              style={{
                border: "0",
                width: "1200px",     
                height: "800px",      
                transform: "scale(0.3)", 
                pointerEvents: "none", 
                position: "absolute",
                borderRadius: 12,
                overflow: "hidden",
                scrollbarWidth: "none",         
                msOverflowStyle: "none", 
              }}
            ></iframe>
          </div>
          <div className="portfolio-content" style={{ padding: "12px" }}>
            <h3>{card.title}</h3>
            <div className="portfolio-stats">
              {/* <span>❤️ {card.likes}</span>
              <span>👁 {card.views}</span> */}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
