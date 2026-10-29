import React, { useMemo } from 'react';

interface StarConfig {
  id: number;
  top: string;
  left?: string;
  right?: string;
  size: number;
  type: 'four' | 'eight' | 'diamond' | 'dot';
  duration: string;
  delay: string;
  baseOpacity: number;
}

export default function CelestialBackground() {
  // Dense celestial constellation across 0% to 100% of the entire page height (~95 stars)
  const stars: StarConfig[] = useMemo(() => {
    const starList: StarConfig[] = [
      // === 0% - 10% (Top Hero Banner) ===
      { id: 1, top: '1.5%', right: '18%', size: 18, type: 'four', duration: '4.5s', delay: '0s', baseOpacity: 0.22 },
      { id: 2, top: '2.8%', right: '6%', size: 14, type: 'eight', duration: '5.2s', delay: '1.4s', baseOpacity: 0.18 },
      { id: 3, top: '4.2%', left: '8%', size: 20, type: 'four', duration: '4.2s', delay: '3.2s', baseOpacity: 0.20 },
      { id: 4, top: '3.0%', left: '26%', size: 16, type: 'eight', duration: '5.6s', delay: '0.8s', baseOpacity: 0.16 },
      { id: 5, top: '5.5%', right: '35%', size: 13, type: 'diamond', duration: '3.8s', delay: '2.5s', baseOpacity: 0.22 },
      { id: 6, top: '6.8%', left: '16%', size: 12, type: 'diamond', duration: '6.0s', delay: '2.1s', baseOpacity: 0.15 },
      { id: 7, top: '7.5%', right: '12%', size: 17, type: 'four', duration: '4.8s', delay: '2.8s', baseOpacity: 0.20 },
      { id: 8, top: '8.5%', left: '4%', size: 14, type: 'dot', duration: '4.6s', delay: '1.7s', baseOpacity: 0.16 },
      { id: 9, top: '9.2%', left: '42%', size: 14, type: 'four', duration: '5.0s', delay: '4.0s', baseOpacity: 0.15 },
      { id: 10, top: '9.8%', right: '48%', size: 11, type: 'diamond', duration: '5.4s', delay: '3.5s', baseOpacity: 0.16 },
      { id: 11, top: '4.8%', right: '25%', size: 12, type: 'dot', duration: '4.1s', delay: '1.1s', baseOpacity: 0.18 },
      { id: 12, top: '8.0%', left: '22%', size: 15, type: 'eight', duration: '5.3s', delay: '2.6s', baseOpacity: 0.17 },

      // === 10% - 20% (Hero Details & Quran verse) ===
      { id: 13, top: '11.5%', left: '12%', size: 17, type: 'four', duration: '4.6s', delay: '0.4s', baseOpacity: 0.20 },
      { id: 14, top: '12.8%', right: '15%', size: 19, type: 'eight', duration: '5.1s', delay: '1.8s', baseOpacity: 0.19 },
      { id: 15, top: '14.2%', left: '32%', size: 13, type: 'diamond', duration: '4.4s', delay: '3.1s', baseOpacity: 0.16 },
      { id: 16, top: '15.5%', right: '5%', size: 15, type: 'four', duration: '5.8s', delay: '0.9s', baseOpacity: 0.18 },
      { id: 17, top: '16.8%', left: '6%', size: 14, type: 'eight', duration: '4.9s', delay: '2.3s', baseOpacity: 0.17 },
      { id: 18, top: '18.0%', right: '28%', size: 12, type: 'dot', duration: '6.2s', delay: '1.5s', baseOpacity: 0.15 },
      { id: 19, top: '19.2%', left: '20%', size: 18, type: 'four', duration: '4.3s', delay: '3.7s', baseOpacity: 0.21 },
      { id: 20, top: '19.8%', right: '42%', size: 11, type: 'diamond', duration: '5.5s', delay: '0.2s', baseOpacity: 0.16 },

      // === 20% - 30% (Languages Showcase) ===
      { id: 21, top: '21.0%', right: '9%', size: 18, type: 'eight', duration: '4.8s', delay: '0.5s', baseOpacity: 0.18 },
      { id: 22, top: '22.5%', left: '14%', size: 16, type: 'four', duration: '5.5s', delay: '2.2s', baseOpacity: 0.20 },
      { id: 23, top: '23.8%', right: '24%', size: 13, type: 'diamond', duration: '4.0s', delay: '1.1s', baseOpacity: 0.15 },
      { id: 24, top: '25.0%', left: '5%', size: 15, type: 'eight', duration: '6.2s', delay: '3.7s', baseOpacity: 0.17 },
      { id: 25, top: '26.4%', right: '6%', size: 20, type: 'four', duration: '4.4s', delay: '0.9s', baseOpacity: 0.21 },
      { id: 26, top: '27.8%', left: '24%', size: 12, type: 'diamond', duration: '5.1s', delay: '2.7s', baseOpacity: 0.16 },
      { id: 27, top: '28.9%', right: '36%', size: 16, type: 'eight', duration: '4.7s', delay: '1.5s', baseOpacity: 0.18 },
      { id: 28, top: '29.7%', left: '9%', size: 14, type: 'dot', duration: '5.8s', delay: '3.1s', baseOpacity: 0.15 },
      { id: 29, top: '24.2%', left: '46%', size: 11, type: 'diamond', duration: '4.3s', delay: '0.7s', baseOpacity: 0.16 },
      { id: 30, top: '28.2%', right: '16%', size: 15, type: 'four', duration: '5.2s', delay: '2.4s', baseOpacity: 0.19 },

      // === 30% - 40% (Global Values & Mission) ===
      { id: 31, top: '31.2%', left: '11%', size: 17, type: 'eight', duration: '5.0s', delay: '1.3s', baseOpacity: 0.18 },
      { id: 32, top: '32.6%', right: '14%', size: 19, type: 'four', duration: '4.7s', delay: '2.9s', baseOpacity: 0.20 },
      { id: 33, top: '34.0%', left: '28%', size: 13, type: 'dot', duration: '5.9s', delay: '0.6s', baseOpacity: 0.15 },
      { id: 34, top: '35.4%', right: '7%', size: 16, type: 'eight', duration: '4.2s', delay: '3.4s', baseOpacity: 0.18 },
      { id: 35, top: '36.8%', left: '6%', size: 18, type: 'four', duration: '5.4s', delay: '1.7s', baseOpacity: 0.20 },
      { id: 36, top: '38.0%', right: '26%', size: 12, type: 'diamond', duration: '4.8s', delay: '0.2s', baseOpacity: 0.16 },
      { id: 37, top: '39.2%', left: '18%', size: 15, type: 'eight', duration: '6.1s', delay: '2.8s', baseOpacity: 0.17 },
      { id: 38, top: '39.8%', right: '45%', size: 14, type: 'four', duration: '4.5s', delay: '1.9s', baseOpacity: 0.18 },

      // === 40% - 50% (Investor & Partnership Area) ===
      { id: 39, top: '41.0%', left: '8%', size: 21, type: 'four', duration: '4.6s', delay: '0.3s', baseOpacity: 0.22 },
      { id: 40, top: '42.4%', right: '10%', size: 15, type: 'eight', duration: '5.3s', delay: '2.9s', baseOpacity: 0.18 },
      { id: 41, top: '43.8%', left: '22%', size: 13, type: 'diamond', duration: '4.1s', delay: '1.8s', baseOpacity: 0.16 },
      { id: 42, top: '45.0%', right: '18%', size: 18, type: 'four', duration: '5.7s', delay: '3.4s', baseOpacity: 0.22 },
      { id: 43, top: '46.2%', left: '34%', size: 14, type: 'dot', duration: '4.9s', delay: '0.7s', baseOpacity: 0.15 },
      { id: 44, top: '47.5%', right: '6%', size: 17, type: 'eight', duration: '4.3s', delay: '2.4s', baseOpacity: 0.19 },
      { id: 45, top: '48.8%', left: '12%', size: 15, type: 'four', duration: '5.9s', delay: '1.2s', baseOpacity: 0.17 },
      { id: 46, top: '49.6%', right: '30%', size: 12, type: 'diamond', duration: '4.7s', delay: '4.1s', baseOpacity: 0.16 },
      { id: 47, top: '44.5%', left: '4%', size: 16, type: 'eight', duration: '5.1s', delay: '2.1s', baseOpacity: 0.18 },
      { id: 48, top: '48.2%', right: '42%', size: 13, type: 'four', duration: '4.8s', delay: '0.8s', baseOpacity: 0.17 },

      // === 50% - 60% (Partnership Details & Impact) ===
      { id: 49, top: '51.0%', left: '16%', size: 19, type: 'eight', duration: '4.5s', delay: '1.0s', baseOpacity: 0.19 },
      { id: 50, top: '52.3%', right: '12%', size: 17, type: 'four', duration: '5.2s', delay: '3.0s', baseOpacity: 0.20 },
      { id: 51, top: '53.8%', left: '5%', size: 13, type: 'diamond', duration: '4.3s', delay: '0.4s', baseOpacity: 0.16 },
      { id: 52, top: '55.0%', right: '22%', size: 18, type: 'eight', duration: '5.8s', delay: '2.5s', baseOpacity: 0.19 },
      { id: 53, top: '56.4%', left: '26%', size: 14, type: 'dot', duration: '4.7s', delay: '1.6s', baseOpacity: 0.15 },
      { id: 54, top: '57.6%', right: '5%', size: 20, type: 'four', duration: '4.9s', delay: '3.5s', baseOpacity: 0.21 },
      { id: 55, top: '58.8%', left: '10%', size: 15, type: 'eight', duration: '6.0s', delay: '0.9s', baseOpacity: 0.18 },
      { id: 56, top: '59.7%', right: '35%', size: 12, type: 'diamond', duration: '4.2s', delay: '2.7s', baseOpacity: 0.16 },

      // === 60% - 70% (Features & Core Experience) ===
      { id: 57, top: '61.0%', right: '14%', size: 18, type: 'eight', duration: '5.1s', delay: '0.6s', baseOpacity: 0.18 },
      { id: 58, top: '62.5%', left: '8%', size: 19, type: 'four', duration: '4.5s', delay: '2.0s', baseOpacity: 0.21 },
      { id: 59, top: '63.8%', right: '28%', size: 14, type: 'diamond', duration: '5.4s', delay: '3.8s', baseOpacity: 0.16 },
      { id: 60, top: '65.0%', left: '19%', size: 16, type: 'eight', duration: '4.2s', delay: '1.3s', baseOpacity: 0.18 },
      { id: 61, top: '66.4%', right: '8%', size: 13, type: 'dot', duration: '6.1s', delay: '2.6s', baseOpacity: 0.15 },
      { id: 62, top: '67.8%', left: '4%', size: 21, type: 'four', duration: '4.9s', delay: '0.4s', baseOpacity: 0.20 },
      { id: 63, top: '68.9%', right: '34%', size: 15, type: 'eight', duration: '5.6s', delay: '3.0s', baseOpacity: 0.17 },
      { id: 64, top: '69.8%', left: '29%', size: 12, type: 'diamond', duration: '4.4s', delay: '1.9s', baseOpacity: 0.15 },
      { id: 65, top: '64.2%', right: '4%', size: 16, type: 'four', duration: '5.0s', delay: '1.1s', baseOpacity: 0.19 },
      { id: 66, top: '68.2%', left: '12%', size: 14, type: 'eight', duration: '4.7s', delay: '2.3s', baseOpacity: 0.17 },

      // === 70% - 80% (Interactive Features & Tools) ===
      { id: 67, top: '71.2%', right: '16%', size: 19, type: 'four', duration: '4.6s', delay: '0.8s', baseOpacity: 0.20 },
      { id: 68, top: '72.5%', left: '7%', size: 17, type: 'eight', duration: '5.3s', delay: '2.2s', baseOpacity: 0.18 },
      { id: 69, top: '73.8%', right: '25%', size: 13, type: 'diamond', duration: '4.1s', delay: '3.6s', baseOpacity: 0.16 },
      { id: 70, top: '75.0%', left: '22%', size: 18, type: 'four', duration: '5.7s', delay: '1.4s', baseOpacity: 0.20 },
      { id: 71, top: '76.3%', right: '6%', size: 15, type: 'eight', duration: '4.8s', delay: '2.9s', baseOpacity: 0.18 },
      { id: 72, top: '77.5%', left: '11%', size: 14, type: 'dot', duration: '6.0s', delay: '0.5s', baseOpacity: 0.15 },
      { id: 73, top: '78.8%', right: '38%', size: 20, type: 'four', duration: '4.4s', delay: '2.7s', baseOpacity: 0.21 },
      { id: 74, top: '79.6%', left: '32%', size: 12, type: 'diamond', duration: '5.2s', delay: '1.0s', baseOpacity: 0.16 },

      // === 80% - 88% (Action CTA & Community - Stops before Footer) ===
      { id: 75, top: '80.5%', left: '6%', size: 18, type: 'eight', duration: '4.7s', delay: '1.8s', baseOpacity: 0.19 },
      { id: 76, top: '81.4%', right: '14%', size: 20, type: 'four', duration: '5.1s', delay: '0.2s', baseOpacity: 0.22 },
      { id: 77, top: '82.8%', left: '18%', size: 13, type: 'diamond', duration: '4.3s', delay: '2.5s', baseOpacity: 0.16 },
      { id: 78, top: '83.8%', right: '8%', size: 17, type: 'eight', duration: '5.5s', delay: '3.3s', baseOpacity: 0.18 },
      { id: 79, top: '84.8%', left: '28%', size: 15, type: 'four', duration: '4.8s', delay: '0.9s', baseOpacity: 0.19 },
      { id: 80, top: '85.5%', right: '26%', size: 14, type: 'dot', duration: '6.2s', delay: '2.1s', baseOpacity: 0.15 },
      { id: 81, top: '86.5%', left: '10%', size: 19, type: 'four', duration: '4.5s', delay: '3.7s', baseOpacity: 0.20 },
      { id: 82, top: '87.2%', right: '38%', size: 12, type: 'diamond', duration: '5.0s', delay: '1.4s', baseOpacity: 0.16 },
      { id: 83, top: '83.0%', left: '4%', size: 15, type: 'eight', duration: '5.3s', delay: '0.6s', baseOpacity: 0.17 },
      { id: 84, top: '86.0%', right: '5%', size: 16, type: 'four', duration: '4.9s', delay: '2.8s', baseOpacity: 0.19 }
    ];
    return starList;
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Crescent Moon (Top-Right Angle) */}
      <div 
        className="absolute top-20 right-4 sm:top-24 sm:right-8 md:top-24 md:right-12 lg:right-16 xl:right-20 text-amber-500 opacity-[0.14] animate-float-crescent pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <svg 
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 -rotate-12" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Subtle Outer Glow / Shadow in SVG */}
          <defs>
            <linearGradient id="gold-crescent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          {/* Thin outline crescent moon */}
          <path 
            d="M 64 12 A 40 40 0 1 0 88 74 A 32 32 0 1 1 64 12 Z" 
            stroke="url(#gold-crescent-grad)" 
            strokeWidth="1.5" 
          />
        </svg>
      </div>

      {/* Densely scattered Twinkling Stars across entire length (0% to 100%) */}
      <div className="absolute inset-0 w-full h-full text-amber-500">
        {stars.map((star) => (
          <div 
            key={star.id}
            className="absolute animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              right: star.right,
              opacity: star.baseOpacity,
              animationDelay: star.delay,
              animationDuration: star.duration,
              willChange: 'opacity, transform'
            }}
          >
            {star.type === 'four' && <FourPointStar size={star.size} />}
            {star.type === 'eight' && <EightPointStar size={star.size} />}
            {star.type === 'diamond' && <DiamondStar size={star.size} />}
            {star.type === 'dot' && <DotStar size={star.size} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// 4-Pointed Star Sparkle
function FourPointStar({ size = 16 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className="drop-shadow-[0_0_2px_rgba(245,158,11,0.35)]"
    >
      <path d="M12 0 C12 7.5 16.5 12 24 12 C16.5 12 12 16.5 12 24 C12 16.5 7.5 12 0 12 C7.5 12 12 7.5 12 0 Z" />
    </svg>
  );
}

// 8-Pointed Star Sparkle (Islamic 8-star aesthetic)
function EightPointStar({ size = 16 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className="drop-shadow-[0_0_2px_rgba(245,158,11,0.35)]"
    >
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Subtle Diamond Star Dot
function DiamondStar({ size = 12 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="currentColor"
      className="drop-shadow-[0_0_1.5px_rgba(245,158,11,0.3)]"
    >
      <polygon points="8,0 10.5,5.5 16,8 10.5,10.5 8,16 5.5,10.5 0,8 5.5,5.5" />
    </svg>
  );
}

// Soft Glowing Circular Star Dot
function DotStar({ size = 12 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="currentColor"
      className="drop-shadow-[0_0_2px_rgba(245,158,11,0.4)]"
    >
      <circle cx="8" cy="8" r="4" />
      <path d="M8 1 L8 15 M1 8 L15 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
