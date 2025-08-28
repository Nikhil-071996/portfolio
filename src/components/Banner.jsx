import React, { useRef, useEffect } from "react";
import "./banner.css";
import eraserSvg from "../assets/img/eraserSvg2.svg";
import bannerImg from "../assets/img/bannerImage.png";
import pencilSketch from "../assets/img/pencil-sketch.png";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export default function Banner({ onReady }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const maskImgRef = useRef(null);
  const movingText = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imgElement = imageRef.current;

    imgElement.onload = () => {
      canvas.width = imgElement.offsetWidth;
      canvas.height = imgElement.offsetHeight;

      const sketch = new Image();
      sketch.src = pencilSketch;

      sketch.onload = () => {
        ctx.drawImage(sketch, 0, 0, canvas.width, canvas.height);

        // 👈 Banner is fully ready now
        if (onReady) onReady();
      };
    };

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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [onReady]);

  useEffect(() => {
  gsap.to(movingText.current, {
    duration: 4,
    ease: "power1.inOut",
    motionPath: {
      path: "#textPath",
      align: "#textPath",
      alignOrigin: [0.5, 0.5],
    },
    scrollTrigger: {
      trigger: ".banner-container",   // element that starts the scroll animation
      start: "top -10%",            // when top of banner hits center of viewport
      end: "bottom top",           // when bottom of banner hits center
      scrub: true,                    // link animation progress to scroll
      onUpdate: (self) => {
        if (self.progress > 0.5) {
          movingText.current.textContent = "Portfolio";
        } else {
          movingText.current.textContent = "Developer";
        }
      },
    },
  });
}, []);



  return (
    <div className="reveal-container">
      <div className="banner-container">
        <div className="col-1">
          <h3>Hi</h3>
          <h1>I'm Nikhil Kachi</h1>
          <h2>Front-End <span style={{opacity:0}}>Developer</span> <div ref={movingText} style={{ zIndex: 1000 }}>Developer</div></h2>
        </div>
        <div className="col-2">
          <div className="reveal-text">
            <canvas ref={canvasRef} className="reveal-canvas"></canvas>
            <img src={bannerImg} alt="bannerImg" ref={imageRef} />
          </div>
        </div>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", bottom: 0, left: 0, opacity:0 }}>
        <path
          id="textPath"
          d="M225.87,546.698 C464.639,568.261 402.046,1223.517 775.417,1115.391 " // adjust path as per your layout
          stroke="transparent"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
