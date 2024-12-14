"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function NotFound() {
  const containerRef = useRef(null);
  const magnetRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    // Snowman animations
    gsap.to("#snowman", {
      y: -5,
      rotation: 3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to("#scarf", {
      rotation: 5,
      transformOrigin: "center",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to("#leftArm", {
      rotation: -10,
      transformOrigin: "right",
      duration: 1.8,
      repeat: -1,
      yoyo: true
    });

    gsap.to("#rightArm", {
      rotation: 10,
      transformOrigin: "left",
      duration: 2,
      repeat: -1,
      yoyo: true
    });

    // Create crystal snowflakes
    const snowflakes = Array.from({ length: 40 }).map(() => {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const size = Math.random() * 8 + 6;
      
      const crystal = document.createElementNS("http://www.w3.org/2000/svg", "path");
      crystal.setAttribute("d", `M0 ${-size} L${size} 0 L0 ${size} L${-size} 0 Z`);
      crystal.setAttribute("fill", "url(#crystalGrad)");
      crystal.setAttribute("class", "crystal-flake");
      
      const innerGlow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      innerGlow.setAttribute("r", size/1.5);
      innerGlow.setAttribute("fill", "rgba(255, 255, 255, 0.4)");
      innerGlow.setAttribute("filter", "url(#glow)");

      group.appendChild(innerGlow);
      group.appendChild(crystal);
      svgRef.current.appendChild(group);

      // Animate each snowflake
      gsap.set(group, {
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360
      });

      gsap.to(group, {
        y: window.innerHeight - 20,
        x: "+=100",
        rotation: "+=360",
        duration: Math.random() * 5 + 3,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 3
      });

      return group;
    });

    return () => {
      snowflakes.forEach(snowflake => snowflake.remove());
    };
  }, []);

  useEffect(() => {
    // Create snow accumulation areas
    const snowPiles = {
      ground: {
        path: "M0 650 Q360 630 720 650 Q1080 630 1440 650 L1440 668 L0 668 Z",
        initialY: 668,
        targetY: 650,
      },
      roof: {
        path: `M214 0L400 236H28L214 0Z`,
        fill: "white",
        opacity: 0,
      },
    };

    // Add snow accumulation elements
    Object.entries(snowPiles).forEach(([key, value]) => {
      const snowPile = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      snowPile.setAttribute("d", value.path);
      snowPile.setAttribute("fill", "white");
      snowPile.setAttribute("class", `snow-pile-${key}`);
      svgRef.current.appendChild(snowPile);

      // Animate snow accumulation
      gsap.to(snowPile, {
        opacity: 0.8,
        y: key === "ground" ? -18 : 0,
        duration: 10,
        ease: "power1.inOut",
      });
    });

    // Crystal snowflakes with collision detection
    const snowflakes = Array.from({ length: 40 }).map(() => {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const size = Math.random() * 8 + 6;

      // ... rest of your snowflake creation code ...

      // Add collision animation
      gsap.to(group, {
        y: window.innerHeight - 20,
        x: "+=100",
        rotation: "+=360",
        duration: Math.random() * 5 + 3,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 3,
        onUpdate: function () {
          const bounds = group.getBoundingClientRect();
          if (bounds.bottom >= window.innerHeight - 50) {
            // Add small bounce effect when hitting ground
            gsap.to(group, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                gsap.set(group, {
                  y: -20,
                  x: Math.random() * window.innerWidth,
                  scale: 1,
                  opacity: 1,
                });
              },
            });
          }
        },
      });

      return group;
    });

    return () => {
      snowflakes.forEach((snowflake) => snowflake.remove());
      Object.keys(snowPiles).forEach((key) => {
        document.querySelector(`.snow-pile-${key}`)?.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 via-violet-300 to-amber-400"
    >
      <svg
        ref={svgRef}
        width="668"
        height="668"
        viewBox="0 0 1440 668"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))" }}
      >
        <defs>
          <radialGradient id="snowGradient">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="95%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </radialGradient>
          
          <filter id="snowFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.9" />
            </feComponentTransfer>
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
          </filter>

          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* House Structure */}
        <g id="house">
          <rect
            x="29"
            y="235"
            width="370"
            height="415"
            fill="url(#houseGrad)"
          />
          <path d="M214 0L400 236H28L214 0Z" fill="url(#roofGrad)" />
        </g>

        {/* Snowman */}
        <g id="snowman" className="snowman">
          <circle
            cx="120"
            cy="550"
            r="40"
            fill="url(#snowGradient)"
            filter="url(#snowFilter)"
          />
          <circle
            cx="120"
            cy="480"
            r="30"
            fill="url(#snowGradient)"
            filter="url(#snowFilter)"
          />
          <circle
            cx="120"
            cy="425"
            r="25"
            fill="url(#snowGradient)"
            filter="url(#snowFilter)"
          />

          <circle cx="115" cy="420" r="3.5" fill="#1F2937" />
          <circle cx="125" cy="420" r="3.5" fill="#1F2937" />
          <path
            d="M115 430 Q120 435 125 430"
            stroke="#1F2937"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path d="M120 425 L135 428 L120 431 Z" fill="#FF6B35">
            <animate
              attributeName="fill"
              values="#FF6B35;#FF8C35;#FF6B35"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          <path
            id="leftArm"
            d="M90 480 Q70 470 50 460"
            stroke="#4B5563"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            id="rightArm"
            d="M150 480 Q170 470 190 460"
            stroke="#4B5563"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <g id="scarf">
            <path
              d="M100 445 Q120 455 140 445"
              stroke="#EF4444"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M140 445 Q145 460 150 470"
              stroke="#EF4444"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Add snow filter */}
        <defs>
          <filter id="snowFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.9" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Windows with Light Effect */}
        <g id="windows">
          <rect
            x="253"
            y="272"
            width="132"
            height="99"
            fill="url(#windowGrad)"
            className="window-glow"
          />
          <line
            x1="320"
            y1="272"
            x2="320"
            y2="372"
            stroke="#FFFDFD"
            strokeWidth="2"
          />
        </g>

        {/* 404 Numbers with Modern Style */}
        <g id="numbers">
          <g id="four1" className="number">
            <path
              d="M740 323L775 264V652H746L740 323Z"
              fill="url(#numberGrad)"
            />
            <path
              d="M540 331H775V360L597 372L540 331Z"
              fill="url(#numberGrad)"
            />
          </g>
          <g id="zero" className="number">
            <rect
              x="980"
              y="424"
              width="209"
              height="39"
              fill="url(#numberGrad)"
            />
            <rect
              x="1190"
              y="424"
              width="41"
              height="228"
              fill="url(#numberGrad)"
            />
          </g>
          <g id="four2" className="number">
            <path
              d="M1395 323L1430 264V652H1401L1395 323Z"
              fill="url(#numberGrad)"
            />
            <path
              d="M1195 331H1430V360L1252 372L1195 331Z"
              fill="url(#numberGrad)"
            />
          </g>
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
          <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1EC5E" />
            <stop offset="100%" stopColor="#F1EC5E" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="numberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={magnetRef} className="relative w-full max-w-4xl">
        {/* Add your enhanced SVG content here */}
      </div>

      <div className="text-center mt-12 space-y-6">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
          404
        </h1>
        <p className="text-xl text-indigo-800 font-medium">
          صفحه مورد نظر یافت نشد
        </p>
        <Link
          href="/"
          className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg"
        >
          <span className="absolute left-0 w-0 h-full bg-white opacity-20 transition-all duration-300 group-hover:w-full" />
          <span className="relative">بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </div>
  );
}
