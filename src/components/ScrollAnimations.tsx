import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in';
  delay?: number;
  threshold?: number;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(`animate-${animation}`);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animation, delay, threshold]);

  return (
    <div
      ref={elementRef}
      className={`animate-on-scroll ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;