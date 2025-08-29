import React, { useState } from 'react';

const InteractiveCard = ({ 
  children, 
  title, 
  subtitle, 
  selected = false, 
  onClick, 
  className = '',
  variant = 'default',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = 'card-interactive rounded-xl p-6 transition-all duration-300';
  
  const variants = {
    default: 'bg-card border-border',
    premium: 'card-premium',
    glass: 'card-glass',
    success: 'border-green-500/50 bg-green-500/5',
    warning: 'border-amber-500/50 bg-amber-500/5',
    error: 'border-red-500/50 bg-red-500/5'
  };
  
  const stateClasses = selected ? 'selected' : isHovered ? 'hover:border-primary' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${stateClasses} ${className}`;
  
  return (
    <div
      className={classes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
      
      {/* Status indicator */}
      {selected && (
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default InteractiveCard; 