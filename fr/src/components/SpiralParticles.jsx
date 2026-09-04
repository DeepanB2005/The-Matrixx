import { useEffect, useRef } from "react";

const particleConfig = {
  particles: {
    number: {
      value: 205,
      density: {
        enable: true,
        value_area: 900,
      },
    },

    color: {
      value: ["#38bdf8", "#6366f1", "#8b5cf6", "#10b981"],
    },

    shape: {
      type: "circle",
    },

    opacity: {
      value: 0.55,
      random: true,
      anim: {
        enable: false,
      },
    },

    size: {
      value: 5,
      random: true,
      anim: {
        enable: false,
      },
    },

    line_linked: {
      enable: true,
      distance: 150,
      color: "#6366f1",
      opacity: 0.3,
      width: 1,
    },

    move: {
      enable: true,
      speed: 1.1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },

  interactivity: {
    detect_on: "canvas",

    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },

      onclick: {
        enable: false,
      },

      resize: true,
    },

    modes: {
      grab: {
        distance: 160,
        line_linked: {
          opacity: 0.3,
        },
      },
    },
  },

  retina_detect: true,
};

function Particles({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const containerId = "particles-background";

    const initializeParticles = () => {
      if (!window.particlesJS || !containerRef.current) {
        return;
      }

      // Prevent duplicate Particle.js canvas
      container.innerHTML = "";

      window.particlesJS(containerId, particleConfig);
    };

    // If particles.min.js is already loaded
    if (window.particlesJS) {
      initializeParticles();
    } else {
      // Check whether another script is already loading it
      const existingScript = document.querySelector(
        'script[src="/particles.min.js"]'
      );

      if (existingScript) {
        existingScript.addEventListener("load", initializeParticles);
      } else {
        // Load Particle.js from public/particles.min.js
        const script = document.createElement("script");

        script.src = "/particles.min.js";
        script.async = true;

        script.onload = initializeParticles;

        script.onerror = () => {
          console.error(
            "Particle.js could not be loaded. Make sure particles.min.js is inside the public folder."
          );
        };

        document.body.appendChild(script);
      }
    }

    return () => {
      if (window.pJSDom) {
        window.pJSDom.forEach((instance) => {
          instance?.pJS?.fn?.vendors?.destroypJS?.();
        });

        window.pJSDom = [];
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="particles-background"
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}

export default Particles;