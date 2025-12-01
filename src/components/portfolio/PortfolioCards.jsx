import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

// const portfolioData = [
//   {
//     id: 1,
//     title: "Movie Website",
//     author: "Pentaclay",
//     img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdeP5qG5X8AJlHz3vwmMk4YgiTpqQtg7Kddhe8E3xO8riQjeShkpK-D7av2n8LRCtNnge_12-WhSh6gHRf5h32LI5aFciDJcHegUI4P3mO6N8a68GpzZX0nM3kTcHGdANeTXQlhqmcBjZEabCootn4lLT4?key=9dbtyPrz-WAw8-HYTpZTqA",
//     likes: 188,
//     views: "29.1k",
//     style: {
//       background: "linear-gradient(to bottom, #1a1e26, #2c2f38)",
//       boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
//       borderRadius: "12px",
//     },
//   },
//   {
//     id: 2,
//     title: "Admin Panel",
//     author: "Orizon Agency",
//     img: "https://www.superoffice.com/globalassets/home-com-website/content/dashboards/business-insights.png?v=49cbc3",
//     likes: 154,
//     views: "44.9k",
//     style: {
//       background: "linear-gradient(to bottom, #f7f8f9, #e2e5e8)",
//       boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
//       borderRadius: "12px",
//     },
//   },
//   {
//     id: 3,
//     title: "E-commerce",
//     author: "Tommaso Tavormina",
//     img: "https://cdn.dribbble.com/userupload/13606666/file/original-17521e86823d09eec75a072b7cacd1cd.png?format=webp&resize=400x300&vertical=center",
//     likes: 93,
//     views: "15.3k",
//     style: {
//       background: "linear-gradient(135deg, #fddde6, #d1fddc)",
//       boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
//       borderRadius: "12px",
//     },
//   },
//   {
//     id: 4,
//     title: "Movie Website",
//     author: "Pentaclay",
//     img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdeP5qG5X8AJlHz3vwmMk4YgiTpqQtg7Kddhe8E3xO8riQjeShkpK-D7av2n8LRCtNnge_12-WhSh6gHRf5h32LI5aFciDJcHegUI4P3mO6N8a68GpzZX0nM3kTcHGdANeTXQlhqmcBjZEabCootn4lLT4?key=9dbtyPrz-WAw8-HYTpZTqA",
//     likes: 188,
//     views: "29.1k",
//     style: {
//       background: "linear-gradient(to bottom, #1a1e26, #2c2f38)",
//       boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
//       borderRadius: "12px",
//     },
//   },
//   {
//     id: 5,
//     title: "Admin Panel",
//     author: "Orizon Agency",
//     img: "https://www.superoffice.com/globalassets/home-com-website/content/dashboards/business-insights.png?v=49cbc3",
//     likes: 154,
//     views: "44.9k",
//     style: {
//       background: "linear-gradient(to bottom, #f7f8f9, #e2e5e8)",
//       boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
//       borderRadius: "12px",
//     },
//   },
//   {
//     id: 6,
//     title: "E-commerce",
//     author: "Tommaso Tavormina",
//     img: "https://cdn.dribbble.com/userupload/13606666/file/original-17521e86823d09eec75a072b7cacd1cd.png?format=webp&resize=400x300&vertical=center",
//     likes: 93,
//     views: "15.3k",
//     style: {
//       background: "linear-gradient(135deg, #fddde6, #d1fddc)",
//       boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
//       borderRadius: "12px",
//     },
//   },
// ];

export default function PortfolioCards() {
  const cardsRef = useRef([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/projects");
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
