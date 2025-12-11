import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioCards() {
  const cardsRef = useRef([]);
  const containersRef = useRef([]); // per-card container refs
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scales, setScales] = useState({}); // { [index]: scale }

  const IFRAME_NATURAL_WIDTH = 1200;
  const TARGET_RATIO = 0.8; // iframe should occupy 80% of container width
  const MIN_SCALE = 0.12;
  const MAX_SCALE = 1;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}projects/get-all`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error loading projects", err);
      } finally {
        setLoading(true);
      }
    };

    fetchProjects();
  }, []);

  // GSAP animations (run when projects available)
  useEffect(() => {
    if (projects.length === 0) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { scale: 0.95, opacity: 0 },
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

  // set up ResizeObservers per container to compute scale per card
  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const observers = [];

    const updateScaleForIndex = (index) => {
      const container = containersRef.current[index];
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const newScale = (containerWidth * TARGET_RATIO) / IFRAME_NATURAL_WIDTH;
      const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

      setScales((prev) => {
        if (prev[index] === clamped) return prev;
        return { ...prev, [index]: clamped };
      });
    };

    // attach observers and initial measurements
    projects.forEach((_, index) => {
      const container = containersRef.current[index];
      if (!container) return;

      // initial measurement
      updateScaleForIndex(index);

      // ResizeObserver to watch this container
      const ro = new ResizeObserver(() => updateScaleForIndex(index));
      ro.observe(container);
      observers.push(ro);
    });

    // window resize fallback
    const onWinResize = () => {
      projects.forEach((_, index) => updateScaleForIndex(index));
    };
    window.addEventListener("resize", onWinResize);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("resize", onWinResize);
    };
  }, [projects]);

  if (loading) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: 20, opacity: 0.7 }}>
          My portfolio server is waking up (free tier). Thanks for your patience!
        </p>
        <div className="portfolio-container">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card skeleton" />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="portfolio-container" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {projects?.map((card, index) => (
        <a
          href={card?.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-card"
          key={card._id}
          ref={(el) => (cardsRef.current[index] = el)}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            flex: "1 1 320px",
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="portfolio-image-container"
            ref={(el) => (containersRef.current[index] = el)}
            style={{
              background: card.background,
              overflow: "hidden",
              position: "relative", // important for absolute iframe
            }}
          >
            <iframe
              src={card.liveDemo}
              title={card.title}
              loading="lazy"
              className="iframe-card"
              style={{
                border: "0",
                width: `${IFRAME_NATURAL_WIDTH}px`,
                height: "800px",
                transform: `scale(${scales[index] ?? 0.2})`,
                pointerEvents: "none",
                position: "absolute",
                borderRadius: 12,
                overflow: "hidden",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
          </div>

          <div className="portfolio-content" style={{ padding: "12px" }}>
            <h3 style={{ margin: 0 }}>{card.title}</h3>
            <div className="portfolio-stats" />
          </div>
        </a>
      ))}
    </div>
  );
}
