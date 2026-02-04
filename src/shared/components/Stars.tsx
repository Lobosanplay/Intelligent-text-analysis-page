import { useState, useEffect, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
}

export default function Stars({ numOfStart }: { numOfStart: number }) {
  const [stars, setStars] = useState<Star[]>(() =>
    Array.from({ length: numOfStart }).map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: 0.3 + Math.random() * 0.7,
    })),
  );

  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const directionChangeRef = useRef(0);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      directionChangeRef.current += deltaTime;

      setStars((prevStars) => {
        if (directionChangeRef.current > 8000) {
          directionChangeRef.current = 0;

          return prevStars.map((star) => ({
            ...star,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
          }));
        }

        return prevStars.map((star) => {
          let newX = star.x + star.vx * (deltaTime / 50);
          let newY = star.y + star.vy * (deltaTime / 50);

          if (newX < -5) newX = 105;
          if (newX > 105) newX = -5;
          if (newY < -5) newY = 105;
          if (newY > 105) newY = -5;

          return {
            ...star,
            x: newX,
            y: newY,
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute size-0.5 rounded-full bg-white"
          style={{
            top: `${star.y}vh`,
            left: `${star.x}vw`,
            opacity: star.opacity * 0.8,
            filter: "blur(1px)",
            transform: `translate(${star.vx * 5}px, ${star.vy * 5}px)`,
            transition: "transform 1s ease, opacity 1s ease",
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
          }}
        />
      ))}
    </div>
  );
}
