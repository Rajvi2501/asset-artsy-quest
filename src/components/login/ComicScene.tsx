import { motion } from "framer-motion";

const ComicScene = () => {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Desk surface */}
      <rect x="20" y="150" width="280" height="10" rx="5" fill="hsl(var(--primary) / 0.12)" />
      <rect x="60" y="160" width="10" height="50" rx="3" fill="hsl(var(--primary) / 0.08)" />
      <rect x="250" y="160" width="10" height="50" rx="3" fill="hsl(var(--primary) / 0.08)" />

      {/* Monitor */}
      <rect x="90" y="70" width="120" height="78" rx="8" fill="hsl(var(--foreground))" />
      <rect x="95" y="75" width="110" height="62" rx="4" fill="hsl(var(--primary) / 0.15)" />
      {/* Screen glow */}
      <rect x="100" y="80" width="100" height="52" rx="2" fill="hsl(var(--primary) / 0.05)" />
      {/* Code lines on screen */}
      <rect x="106" y="86" width="35" height="3" rx="1.5" fill="hsl(var(--sunshine))" opacity="0.9" />
      <rect x="106" y="92" width="55" height="3" rx="1.5" fill="hsl(var(--mint))" opacity="0.8" />
      <rect x="106" y="98" width="42" height="3" rx="1.5" fill="hsl(var(--coral))" opacity="0.8" />
      <rect x="106" y="104" width="60" height="3" rx="1.5" fill="hsl(var(--lavender))" opacity="0.7" />
      <rect x="106" y="110" width="30" height="3" rx="1.5" fill="hsl(var(--sky))" opacity="0.8" />
      <rect x="106" y="116" width="48" height="3" rx="1.5" fill="hsl(var(--sunshine))" opacity="0.6" />
      <rect x="106" y="122" width="38" height="3" rx="1.5" fill="hsl(var(--mint))" opacity="0.7" />
      {/* Monitor stand */}
      <rect x="140" y="148" width="20" height="6" rx="2" fill="hsl(var(--foreground) / 0.3)" />
      <rect x="130" y="152" width="40" height="4" rx="2" fill="hsl(var(--foreground) / 0.2)" />

      {/* Keyboard */}
      <rect x="110" y="140" width="70" height="10" rx="4" fill="hsl(var(--muted-foreground) / 0.15)" />
      {/* Key dots */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={115 + i * 8} y={143} width={5} height={4} rx={1} fill="hsl(var(--muted-foreground) / 0.1)" />
      ))}

      {/* Mouse */}
      <ellipse cx="200" cy="146" rx="8" ry="10" fill="hsl(var(--primary) / 0.12)" />
      <line x1="200" y1="139" x2="200" y2="143" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />

      {/* Coffee mug */}
      <rect x="40" y="130" width="18" height="20" rx="4" fill="hsl(var(--coral))" />
      <rect x="38" y="128" width="22" height="5" rx="2.5" fill="hsl(var(--coral) / 0.85)" />
      {/* Mug handle */}
      <path d="M58 135 Q65 135 65 142 Q65 148 58 148" stroke="hsl(var(--coral) / 0.6)" strokeWidth="2.5" fill="none" />
      {/* Heart on mug */}
      <path d="M47 140 Q47 137 49 137 Q51 137 51 140 Q51 137 53 137 Q55 137 55 140 Q55 143 51 146 Q47 143 47 140Z" fill="hsl(var(--secondary))" opacity="0.7" />
      {/* Steam */}
      <path d="M46 124 Q48 118 46 112" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M52 124 Q54 119 52 114" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Cactus in pot */}
      <rect x="260" y="128" width="20" height="22" rx="5" fill="hsl(var(--sunshine) / 0.5)" />
      <rect x="263" y="126" width="14" height="4" rx="2" fill="hsl(var(--sunshine) / 0.7)" />
      <ellipse cx="270" cy="118" rx="6" ry="12" fill="hsl(var(--mint))" />
      <ellipse cx="278" cy="112" rx="4" ry="7" fill="hsl(var(--mint) / 0.7)" />
      <ellipse cx="263" cy="110" rx="3.5" ry="6" fill="hsl(var(--mint) / 0.8)" />
      {/* Cactus spines */}
      <line x1="270" y1="108" x2="270" y2="105" stroke="hsl(var(--mint) / 0.5)" strokeWidth="0.8" />
      <line x1="274" y1="112" x2="277" y2="110" stroke="hsl(var(--mint) / 0.5)" strokeWidth="0.8" />

      {/* Headphones */}
      <path d="M230 130 Q230 115 245 115 Q260 115 260 130" stroke="hsl(var(--primary) / 0.3)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="230" cy="133" r="5" fill="hsl(var(--primary) / 0.2)" />
      <circle cx="260" cy="133" r="5" fill="hsl(var(--primary) / 0.2)" />

      {/* Floating decorative elements */}
      {/* Star */}
      <path d="M40 50 L42 44 L44 50 L50 52 L44 54 L42 60 L40 54 L34 52Z" fill="hsl(var(--sunshine) / 0.5)" />
      {/* Small circles */}
      <circle cx="280" cy="40" r="4" fill="hsl(var(--coral) / 0.3)" />
      <circle cx="30" cy="85" r="3" fill="hsl(var(--lavender) / 0.4)" />
      {/* Diamond */}
      <rect x="268" cy="75" width="8" height="8" rx="1" fill="hsl(var(--sky) / 0.3)" transform="rotate(45 272 79)" />

      {/* Halftone dots pattern - top right */}
      {[0,1,2,3,4].map(row =>
        [0,1,2,3,4].map(col => (
          <circle
            key={`dot-${row}-${col}`}
            cx={240 + col * 8}
            cy={20 + row * 8}
            r={1.2 - (row + col) * 0.08}
            fill="hsl(var(--primary) / 0.1)"
          />
        ))
      )}
    </svg>
  );
};

export default ComicScene;
