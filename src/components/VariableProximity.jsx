import React, { useRef, useEffect, useState } from "react";

function VariableProximity({ 
  label, 
  containerRef, 
  radius = 100,
  className = "" 
}) {
  const letterRefs = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [containerRef]);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = Math.sqrt(
        (mousePos.x - letterCenterX) ** 2 + (mousePos.y - letterCenterY) ** 2
      );

      if (distance < radius) {
        const intensity = 1 - (distance / radius);
        const weight = 300 + (intensity * 600); // 300 to 900
        letterRef.style.fontWeight = weight;
        letterRef.style.transform = `scale(${1 + intensity * 0.2})`;
        letterRef.style.color = `rgba(255, 255, 255, ${0.7 + intensity * 0.3})`;
      } else {
        letterRef.style.fontWeight = '300';
        letterRef.style.transform = 'scale(1)';
        letterRef.style.color = 'rgba(230, 232, 250, 0.8)';
      }
    });
  }, [mousePos, radius, containerRef]);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter) => {
            const currentLetterIndex = letterIndex++;
            return (
              <span
                key={currentLetterIndex}
                ref={(el) => { letterRefs.current[currentLetterIndex] = el; }}
                style={{
                  display: 'inline-block',
                  fontWeight: '300',
                  color: 'rgba(230, 232, 250, 0.8)',
                  transition: 'all 0.1s ease-out',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}



export default VariableProximity;