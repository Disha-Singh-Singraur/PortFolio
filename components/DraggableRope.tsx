'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function DraggableRope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartAngle = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Gentle idle swing state
  const idleTimeRef = useRef(0);
  const isTransitioningRef = useRef(false);



  // Global mouse repulsion ("running away from mouse" animation)
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Don't interfere if dragging
      if (isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const pivotX = rect.left + rect.width / 2;
      const pivotY = rect.top; // anchor point at the top center
      
      const dx = e.clientX - pivotX;
      const dy = e.clientY - pivotY;

      // Check if mouse is in proximity of the rope (within 200px horizontally and 850px vertically)
      if (Math.abs(dx) < 200 && dy > 0 && dy < 850) {
        isTransitioningRef.current = true;
        
        // If mouse is to the left (dx < 0), rotate right (positive angle)
        // If mouse is to the right (dx > 0), rotate left (negative angle)
        const direction = dx < 0 ? 1 : -1;
        
        // Stronger repulsion the closer the mouse is
        const proximity = (200 - Math.abs(dx)) / 200; // 0 to 1
        const targetHoverAngle = direction * 5.0 * proximity;

        // Smoothly interpolate towards the target hover angle
        setRotation((prev) => prev + (targetHoverAngle - prev) * 0.12);
      } else {
        // If mouse has exited the region, decay the rotation smoothly back to 0
        if (isTransitioningRef.current) {
          setRotation((prev) => {
            const nextAngle = prev * 0.92;
            if (Math.abs(nextAngle) < 0.1) {
              isTransitioningRef.current = false;
              idleTimeRef.current = 0; // Reset idle timer for smooth restart
              return 0;
            }
            return nextAngle;
          });
        }
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    isTransitioningRef.current = true;
    setIsDragging(true);
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const pivotX = rect.left + rect.width / 2;
      const pivotY = rect.top;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const angle = Math.atan2(mouseX - pivotX, mouseY - pivotY) * (180 / Math.PI);
      dragStartAngle.current = angle - rotation;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const pivotX = rect.left + rect.width / 2;
    const pivotY = rect.top;
    
    const angle = Math.atan2(e.clientX - pivotX, e.clientY - pivotY) * (180 / Math.PI);
    // Limit swing to max 65 degrees
    const targetRotation = Math.max(-65, Math.min(65, angle));
    setRotation(targetRotation);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Spring-pendulum physical simulation to return to center (0)
    let currentAngle = rotation;
    let velocity = 0;
    const stiffness = 0.05; // Spring stiffness constant
    const damping = 0.93;   // Friction decay factor
    
    const step = () => {
      const force = -stiffness * currentAngle;
      velocity = (velocity + force) * damping;
      currentAngle += velocity;
      
      setRotation(currentAngle);
      
      // If motion has died down, settle to 0 and allow idle swing to take over
      if (Math.abs(currentAngle) > 0.05 || Math.abs(velocity) > 0.005) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setRotation(0);
        isTransitioningRef.current = false;
        idleTimeRef.current = 0;
      }
    };
    
    animationRef.current = requestAnimationFrame(step);
  };

  // Global mouse event listeners while dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, rotation]);

  // Touch Support for mobile/tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    isTransitioningRef.current = true;
    setIsDragging(true);
    
    if (containerRef.current && e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const pivotX = rect.left + rect.width / 2;
      const pivotY = rect.top;
      
      const angle = Math.atan2(touch.clientX - pivotX, touch.clientY - pivotY) * (180 / Math.PI);
      dragStartAngle.current = angle - rotation;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const pivotX = rect.left + rect.width / 2;
    const pivotY = rect.top;
    
    const angle = Math.atan2(touch.clientX - pivotX, touch.clientY - pivotY) * (180 / Math.PI);
    const targetRotation = Math.max(-65, Math.min(65, angle));
    setRotation(targetRotation);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      className="hidden md:block absolute left-[25%] top-[-115px] z-20 cursor-grab active:cursor-grabbing select-none"
      style={{
        width: '400px',
        transformOrigin: 'top center',
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <Image
        src="/images/rope.png"
        alt="Girl hanging on a rope"
        width={1536}
        height={4400}
        priority
        className="pointer-events-none w-full h-auto"
      />
    </div>
  );
}
