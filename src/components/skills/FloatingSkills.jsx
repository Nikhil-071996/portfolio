import { useEffect, useRef } from "react";
import "./skills.css";

export default function InfiniteIcons() {
  const trackRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
  const track = trackRef.current;
  const slider = sliderRef.current;
  if (!track || !slider) return;

  const logos = Array.from(track.children);
  logos.forEach((logo) => track.appendChild(logo.cloneNode(true)));

  const images = track.querySelectorAll("img");
  const loads = Array.from(images).map(img =>
    new Promise(res => {
      if (img.complete) return res();
      img.addEventListener("load", res, { once: true });
      img.addEventListener("error", res, { once: true });
    })
  );

  Promise.all(loads).then(() => {
    const pxDistance = track.scrollWidth / 2;
    const pixelsPerSecond = 80; 
    const duration = Math.max(6, pxDistance / pixelsPerSecond); 

    track.style.setProperty("--duration", `${duration}s`);
    track.style.animationPlayState = "running";
  });

}, []);


  return (
    <div className="logo-slider" ref={sliderRef}>
      <div className="logo-track" ref={trackRef}>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
      </div>
    </div>
  );
}
