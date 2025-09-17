import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioData = [
  {
    id: 1,
    title: "Movie Website",
    author: "Pentaclay",
    img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdeP5qG5X8AJlHz3vwmMk4YgiTpqQtg7Kddhe8E3xO8riQjeShkpK-D7av2n8LRCtNnge_12-WhSh6gHRf5h32LI5aFciDJcHegUI4P3mO6N8a68GpzZX0nM3kTcHGdANeTXQlhqmcBjZEabCootn4lLT4?key=9dbtyPrz-WAw8-HYTpZTqA",
    likes: 188,
    views: "29.1k",
    style: {
      background: "linear-gradient(to bottom, #1a1e26, #2c2f38)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
      borderRadius: "12px",
    },
  },
  {
    id: 2,
    title: "Admin Panel",
    author: "Orizon Agency",
    img: "https://www.superoffice.com/globalassets/home-com-website/content/dashboards/business-insights.png?v=49cbc3",
    likes: 154,
    views: "44.9k",
    style: {
      background: "linear-gradient(to bottom, #f7f8f9, #e2e5e8)",
      boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
    },
  },
  {
    id: 3,
    title: "E-commerce",
    author: "Tommaso Tavormina",
    img: "https://cdn.dribbble.com/userupload/13606666/file/original-17521e86823d09eec75a072b7cacd1cd.png?format=webp&resize=400x300&vertical=center",
    likes: 93,
    views: "15.3k",
    style: {
      background: "linear-gradient(135deg, #fddde6, #d1fddc)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      borderRadius: "12px",
    },
  },
  {
    id: 4,
    title: "Movie Website",
    author: "Pentaclay",
    img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdeP5qG5X8AJlHz3vwmMk4YgiTpqQtg7Kddhe8E3xO8riQjeShkpK-D7av2n8LRCtNnge_12-WhSh6gHRf5h32LI5aFciDJcHegUI4P3mO6N8a68GpzZX0nM3kTcHGdANeTXQlhqmcBjZEabCootn4lLT4?key=9dbtyPrz-WAw8-HYTpZTqA",
    likes: 188,
    views: "29.1k",
    style: {
      background: "linear-gradient(to bottom, #1a1e26, #2c2f38)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
      borderRadius: "12px",
    },
  },
  {
    id: 5,
    title: "Admin Panel",
    author: "Orizon Agency",
    img: "https://www.superoffice.com/globalassets/home-com-website/content/dashboards/business-insights.png?v=49cbc3",
    likes: 154,
    views: "44.9k",
    style: {
      background: "linear-gradient(to bottom, #f7f8f9, #e2e5e8)",
      boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
    },
  },
  {
    id: 6,
    title: "E-commerce",
    author: "Tommaso Tavormina",
    img: "https://cdn.dribbble.com/userupload/13606666/file/original-17521e86823d09eec75a072b7cacd1cd.png?format=webp&resize=400x300&vertical=center",
    likes: 93,
    views: "15.3k",
    style: {
      background: "linear-gradient(135deg, #fddde6, #d1fddc)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      borderRadius: "12px",
    },
  },
];

export default function PortfolioCards() {
  const cardsRef = useRef([]);

  

useEffect(() => {
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 0.8, opacity: 0 }, // start hidden + below
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",   // when card is near bottom of viewport
            end: "top 50%",     // fully visible by middle
            scrub: true,        // link progress to scroll (like CSS animation-timeline)
            toggleActions: "play",
          },
        }
      );
    });
  }, []);


  return (
    <div className="portfolio-container">
      {portfolioData.map((card, index) => (
        <div
          className="portfolio-card"
          key={card.id}
          ref={(el) => (cardsRef.current[index] = el)}
          style={{
            borderRadius: card.style.borderRadius,
            overflow: "hidden",
            flex: "1",
          }}
        >
          <div
            className="portfolio-image-container"
            style={{ background: card.style.background }}
          >
            <img
              src={card.img}
              alt={card.title}
              style={{ boxShadow: card.style.boxShadow }}
              className="portfolio-image"
            />
          </div>
          <div className="portfolio-content" style={{ padding: "12px" }}>
            <h3>{card.title}</h3>
            <div className="portfolio-stats">
              {/* <span>❤️ {card.likes}</span>
              <span>👁 {card.views}</span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
