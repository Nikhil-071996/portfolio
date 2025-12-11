import React, { useRef, useEffect } from "react";
import "./banner.css";
import eraserSvg from "../assets/img/eraserSvg2.svg";
import bannerImg from "../assets/img/bannerImage.png";
import pencilSketch from "../assets/img/pencil-sketch.png";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skills from "./skills/Skills";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export default function Banner({ onReady, textStartRef }) {

  const windowWidth = window.innerWidth;
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const maskImgRef = useRef(null);
  

  useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const imgElement = imageRef.current;

  const handleImageLoad = () => {
    canvas.width = imgElement.offsetWidth;
    canvas.height = imgElement.offsetHeight;

    const sketch = new Image();
    sketch.src = pencilSketch;

    sketch.onload = () => {
      ctx.drawImage(sketch, 0, 0, canvas.width, canvas.height);

      if (onReady) onReady();
    };
  };

  if (imgElement.complete) {
    handleImageLoad();
  } else {
    imgElement.onload = handleImageLoad;
  }

  // preload eraser image
  const maskImg = new Image();
  maskImg.src = eraserSvg;
  maskImgRef.current = maskImg;

  const eraseSmooth = (x, y, baseSize = 120) => {
    let size = 0;
    const draw = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(maskImgRef.current, x - size / 2, y - size / 2, size, size);
      ctx.globalCompositeOperation = "source-over";
    };
    gsap.to({ s: 0 }, {
      s: baseSize,
      duration: 0.4,
      ease: "power2.out",
      onUpdate: function () {
        size = this.targets()[0].s;
        draw();
      },
    });
  };

  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    eraseSmooth(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); 
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    eraseSmooth(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let radius = 0;

    gsap.to({ r: 0 }, {
      r: Math.max(canvas.width, canvas.height) * 2,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function () {
        radius = this.targets()[0].r;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      },
      onComplete: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      },
    });
  };

  window.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("click", handleClick);

  canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
  canvas.addEventListener("touchstart", handleTouchMove, { passive: false });

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("click", handleClick);

    canvas.removeEventListener("touchmove", handleTouchMove);
    canvas.removeEventListener("touchstart", handleTouchMove);
  };
}, [onReady]);



  return (
    <div className="reveal-container">
      <div className="banner-container">
        <div className="col-1">
          <h3>Hi</h3>
          <h1>I'm Nikhil Kachi</h1>
          <h2>Front-End <div ref={textStartRef} style={{ display: "inline-block" }}>Developer</div></h2>
          {/* <h2 ref={movingText} style={{ zIndex: 1000 }}>Developer</h2> */}
          {
            windowWidth > 990 
            &&
            <div className="skills-section-container">
              <Skills />
            </div>
          }
        </div>
        <div className="col-2">
          <div className="reveal-text">
            <canvas ref={canvasRef} className="reveal-canvas"></canvas>
            <img src={bannerImg} alt="bannerImg" ref={imageRef} />
          </div>
        </div>

        {
            windowWidth < 990 
            &&
            <div className="skills-section-container">
              <Skills />
            </div>
          }
      </div>

      
    </div>
  );
}
