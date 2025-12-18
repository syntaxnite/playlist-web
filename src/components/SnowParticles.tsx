// Snow particles component with toggle functionality

import React, { useEffect, useState, useCallback } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

interface SnowParticlesProps {
  enabled: boolean;
}

export const SnowParticles: React.FC<SnowParticlesProps> = ({ enabled }) => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  const createSnowflake = useCallback((id: number): Snowflake => {
    return {
      id,
      x: Math.random() * window.innerWidth,
      y: -10,
      size: Math.random() * 3 + 2, // 2-5px
      speed: Math.random() * 2 + 1, // 1-3px per frame
      opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0
      drift: (Math.random() - 0.5) * 0.5, // Side-to-side movement
    };
  }, []);

  const updateSnowflake = useCallback((snowflake: Snowflake): Snowflake => {
    const newY = snowflake.y + snowflake.speed;
    const newX = snowflake.x + snowflake.drift;

    // Reset snowflake if it goes off screen
    if (newY > window.innerHeight + 10 || newX < -10 || newX > window.innerWidth + 10) {
      return createSnowflake(snowflake.id);
    }

    return {
      ...snowflake,
      x: newX,
      y: newY,
    };
  }, [createSnowflake]);

  useEffect(() => {
    if (!enabled) {
      setSnowflakes([]);
      return;
    }

    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, (_, i) => createSnowflake(i));
    setSnowflakes(initialSnowflakes);

    const animationFrame = () => {
      setSnowflakes(prev => prev.map(updateSnowflake));
    };

    const interval = setInterval(animationFrame, 50); // ~20 FPS for smooth animation

    return () => clearInterval(interval);
  }, [enabled, createSnowflake, updateSnowflake]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${snowflake.x}px`,
            top: `${snowflake.y}px`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}
    </div>
  );
};

export default SnowParticles;