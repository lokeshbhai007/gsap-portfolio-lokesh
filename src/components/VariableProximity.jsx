import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";

function VariableProximity({
  label,
  containerRef,
  radius = 100,
  className = "",
  falloff = "linear"
}) {
  const letterRefs = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef(null);
  const lastUpdateTime = useRef(0);
  
  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    const now = Date.now();
    // Throttle to ~60fps
    if (now - lastUpdateTime.current < 16) return;
    lastUpdateTime.current = now;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [containerRef]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Reset all letters to default state
    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return;
      letterRef.style.fontWeight = '300';
      letterRef.style.transform = 'scale(1)';
      letterRef.style.color = 'rgba(230, 232, 250, 0.8)';
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Optimized animation loop
  useEffect(() => {
    if (!isHovering || !containerRef.current) return;

    const updateLetters = () => {
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
          let intensity;
          
          // Different falloff curves for smoother transitions
          switch (falloff) {
            case "exponential":
              intensity = Math.pow(1 - (distance / radius), 2);
              break;
            case "smooth":
              const normalized = distance / radius;
              intensity = 1 - (3 * normalized * normalized - 2 * normalized * normalized * normalized);
              break;
            default: // linear
              intensity = 1 - (distance / radius);
          }

          const weight = 300 + (intensity * 600); // 300 to 900
          const scale = 1 + intensity * 0.3; // Increased scale effect
          const opacity = 0.7 + intensity * 0.3;
          
          letterRef.style.fontWeight = `${Math.round(weight)}`;
          letterRef.style.transform = `scale(${scale})`;
          letterRef.style.color = `rgba(255, 255, 255, ${opacity})`;
        } else {
          letterRef.style.fontWeight = '300';
          letterRef.style.transform = 'scale(1)';
          letterRef.style.color = 'rgba(230, 232, 250, 0.8)';
        }
      });
    };

    const animate = () => {
      updateLetters();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, radius, containerRef, isHovering, falloff]);

  // Memoize word processing for better performance
  const processedWords = useMemo(() => {
    const words = label.split(' ');
    let letterIndex = 0;
    
    return words.map((word, wordIndex) => ({
      word,
      wordIndex,
      letters: word.split('').map((letter) => ({
        letter,
        index: letterIndex++
      }))
    }));
  }, [label]);

  return (
    <span className={className}>
      {processedWords.map(({ word, wordIndex, letters }) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {letters.map(({ letter, index }) => (
            <span
              key={index}
              ref={(el) => { letterRefs.current[index] = el; }}
              style={{
                display: 'inline-block',
                fontWeight: '300',
                color: 'rgba(230, 232, 250, 0.8)',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transformOrigin: 'center',
                willChange: 'transform, font-weight, color'
              }}
            >
              {letter}
            </span>
          ))}
          {wordIndex < processedWords.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default VariableProximity;