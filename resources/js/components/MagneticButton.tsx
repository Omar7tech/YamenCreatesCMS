import gsap from 'gsap';
import { useRef, useEffect, useState, type ReactNode, type MouseEvent } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    strength?: number;
    className?: string;
}

export default function MagneticButton({ 
    children, 
    strength = 0.3,
    className = ''
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button || isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            
            // Calculate distance from center
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const maxDistance = Math.max(rect.width, rect.height) * 2;
            
            // Only apply magnetism when within range
            if (distance < maxDistance) {
                const falloff = 1 - (distance / maxDistance);
                const magnetX = distanceX * strength * falloff * 0.5;
                const magnetY = distanceY * strength * falloff * 0.5;
                
                gsap.to(button, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.4,
                    ease: 'power3.out',
                });
            } else {
                // Reset when out of range
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
            });
        };

        document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
            button.removeEventListener('mouseleave', handleMouseLeave);
            gsap.killTweensOf(button);
        };
    }, [strength]);

    return (
        <div ref={buttonRef} className={className}>
            {children}
        </div>
    );
}
