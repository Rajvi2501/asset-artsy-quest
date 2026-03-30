const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large blob top-right */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/5 animate-blob" />
      
      {/* Small circle left */}
      <div className="absolute top-1/3 -left-10 w-32 h-32 rounded-full bg-secondary/5 animate-float-slow" />
      
      {/* Dots pattern */}
      <div className="absolute bottom-20 right-1/4 w-40 h-40 animate-float" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '16px 16px'
      }} />
      
      {/* Small shapes */}
      <div className="absolute top-1/2 right-10 w-6 h-6 rounded bg-sunshine/20 animate-wiggle" style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute top-20 left-1/3 w-4 h-4 rounded-full bg-coral/20 animate-float" />
      <div className="absolute bottom-1/3 left-20 w-5 h-5 rounded bg-mint/20 animate-float-slow" style={{ transform: 'rotate(30deg)' }} />
    </div>
  );
};

export default FloatingShapes;
