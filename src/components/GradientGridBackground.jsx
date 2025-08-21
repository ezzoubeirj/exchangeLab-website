const GradientGridBackground = () => {
    return (
      <svg 
        className="absolute inset-0 w-full h-full z-0 opacity-10" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 560" 
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5A5F" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path 
              d="M 80 0 L 0 0 0 80" 
              fill="none" 
              stroke="url(#gridGradient)" 
              strokeWidth="1.5" 
              strokeOpacity="0.3"
            />
          </pattern>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5A5F" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
  
        <rect width="100%" height="100%" fill="white" />
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="400" cy="150" r="100" fill="url(#circleGradient)" fillOpacity="0.05" />
        <circle cx="1000" cy="400" r="150" fill="url(#circleGradient)" fillOpacity="0.05" />
        <path d="M0,80 Q720,150 1440,80 L1440,0 L0,0 Z" fill="url(#circleGradient)" fillOpacity="0.03" />
        <path d="M0,560 Q720,400 1440,560 L1440,560 L0,560 Z" fill="url(#circleGradient)" fillOpacity="0.03" />
      </svg>
    );
  };
  
  export default GradientGridBackground;
  