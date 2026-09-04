import { useEffect, useRef } from "react";

function Particles({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const particles = [];
    let animationFrameId = 0;

    const createParticles = () => {
      particles.length = 0;
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.47;

      for (let i = 0; i < 180; i += 1) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          radius: 20 + Math.random() * maxRadius,
          speed: 0.008 + Math.random() * 0.018,
          size: 1.4 + Math.random() * 2.8,
          alpha: 0.18 + Math.random() * 0.72,
          hue: 180 + Math.random() * 100,
        });
      }
    };

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, clientWidth * ratio);
      canvas.height = Math.max(1, clientHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.angle += particle.speed;
        const spiralRadius = particle.radius + Math.sin(particle.angle * 2.2) * 10;
        const x = centerX + Math.cos(particle.angle * 1.4) * spiralRadius;
        const y = centerY + Math.sin(particle.angle) * (spiralRadius * 0.42);

        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 70%, ${particle.alpha})`;
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (index % 4 === 0) {
          const next = particles[(index + 1) % particles.length];
          const nextX = centerX + Math.cos(next.angle * 1.4) * (next.radius + Math.sin(next.angle * 2.2) * 10);
          const nextY = centerY + Math.sin(next.angle) * (next.radius * 0.42);

          ctx.beginPath();
          ctx.strokeStyle = `hsla(${particle.hue}, 85%, 65%, 0.18)`;
          ctx.lineWidth = 1;
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}

export default Particles;
