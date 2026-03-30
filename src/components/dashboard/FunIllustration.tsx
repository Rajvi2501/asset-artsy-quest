const FunIllustration = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {/* Desk */}
      <rect x="30" y="120" width="140" height="8" rx="4" fill="hsl(var(--primary) / 0.15)" />
      <rect x="50" y="128" width="8" height="40" rx="2" fill="hsl(var(--primary) / 0.1)" />
      <rect x="142" y="128" width="8" height="40" rx="2" fill="hsl(var(--primary) / 0.1)" />
      
      {/* Monitor */}
      <rect x="60" y="68" width="80" height="52" rx="6" fill="hsl(var(--primary))" />
      <rect x="64" y="72" width="72" height="40" rx="3" fill="hsl(var(--primary) / 0.3)" />
      {/* Screen content - code lines */}
      <rect x="70" y="78" width="30" height="3" rx="1.5" fill="hsl(var(--sunshine))" />
      <rect x="70" y="84" width="50" height="3" rx="1.5" fill="hsl(var(--mint) / 0.8)" />
      <rect x="70" y="90" width="40" height="3" rx="1.5" fill="hsl(var(--coral) / 0.8)" />
      <rect x="70" y="96" width="55" height="3" rx="1.5" fill="hsl(var(--lavender))" />
      <rect x="70" y="102" width="25" height="3" rx="1.5" fill="hsl(var(--sky))" />
      {/* Monitor stand */}
      <rect x="92" y="120" width="16" height="6" rx="2" fill="hsl(var(--primary) / 0.2)" />
      
      {/* Keyboard */}
      <rect x="72" y="114" width="56" height="6" rx="3" fill="hsl(var(--muted-foreground) / 0.2)" />
      
      {/* Mouse */}
      <ellipse cx="145" cy="116" rx="7" ry="9" fill="hsl(var(--primary) / 0.15)" />
      
      {/* Coffee cup */}
      <rect x="35" y="106" width="14" height="14" rx="3" fill="hsl(var(--coral))" />
      <rect x="33" y="104" width="18" height="4" rx="2" fill="hsl(var(--coral) / 0.8)" />
      {/* Steam */}
      <path d="M40 100 Q42 94 40 88" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M46 100 Q48 95 46 90" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Plant */}
      <rect x="155" y="102" width="14" height="18" rx="4" fill="hsl(var(--sunshine) / 0.6)" />
      <circle cx="162" cy="95" r="8" fill="hsl(var(--mint))" />
      <circle cx="157" cy="92" r="6" fill="hsl(var(--mint) / 0.7)" />
      <circle cx="167" cy="93" r="5" fill="hsl(var(--mint) / 0.8)" />
      
      {/* Floating elements */}
      <circle cx="30" cy="40" r="4" fill="hsl(var(--sunshine) / 0.4)" className="animate-float" />
      <rect x="165" y="35" width="8" height="8" rx="2" fill="hsl(var(--coral) / 0.3)" className="animate-wiggle" style={{ transformOrigin: '169px 39px' }} />
      <circle cx="150" cy="25" r="3" fill="hsl(var(--primary) / 0.2)" className="animate-float-slow" />
      
      {/* Stars / sparkles */}
      <path d="M45 30 L47 25 L49 30 L54 32 L49 34 L47 39 L45 34 L40 32Z" fill="hsl(var(--sunshine) / 0.5)" className="animate-wiggle" style={{ transformOrigin: '47px 32px' }} />
      <path d="M175 60 L176 57 L177 60 L180 61 L177 62 L176 65 L175 62 L172 61Z" fill="hsl(var(--lavender) / 0.6)" className="animate-float" />
    </svg>
  );
};

export default FunIllustration;
