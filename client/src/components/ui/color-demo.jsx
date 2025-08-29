import React, { useState } from 'react';
import EnhancedButton from './enhanced-button';
import InteractiveCard from './interactive-card';
import StatusBadge from './status-badge';

const ColorDemo = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = (variant) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    console.log(`${variant} button clicked!`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Interactive Color System</h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive color system with distinct interactive states and visual feedback
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-black rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Background</p>
              <p className="text-xs text-muted-foreground">#000000</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#111111] rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Card</p>
              <p className="text-xs text-muted-foreground">#111111</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#333333] rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Border</p>
              <p className="text-xs text-muted-foreground">#333333</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#666666] rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-xs text-muted-foreground">#666666</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-white rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Foreground</p>
              <p className="text-xs text-muted-foreground">#ffffff</p>
            </div>
          </div>
        </section>

        {/* Interactive Colors */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Interactive Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-white rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Primary (White)</p>
              <p className="text-xs text-muted-foreground">#ffffff</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#333333] rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Secondary (Dark Gray)</p>
              <p className="text-xs text-muted-foreground">#333333</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#666666] rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Accent (Medium Gray)</p>
              <p className="text-xs text-muted-foreground">#666666</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[#888888] rounded-lg border border-border"></div>
              <p className="text-sm font-medium">Muted (Light Gray)</p>
              <p className="text-xs text-muted-foreground">#888888</p>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Button Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <EnhancedButton 
              variant="primary" 
              onClick={() => handleButtonClick('primary')}
              loading={loading}
            >
              Primary
            </EnhancedButton>
            <EnhancedButton 
              variant="secondary" 
              onClick={() => handleButtonClick('secondary')}
            >
              Secondary
            </EnhancedButton>
            <EnhancedButton 
              variant="accent" 
              onClick={() => handleButtonClick('accent')}
            >
              Accent
            </EnhancedButton>
            <EnhancedButton 
              variant="destructive" 
              onClick={() => handleButtonClick('destructive')}
            >
              Delete
            </EnhancedButton>
            <EnhancedButton 
              variant="ghost" 
              onClick={() => handleButtonClick('ghost')}
            >
              Ghost
            </EnhancedButton>
            <EnhancedButton 
              variant="outline" 
              onClick={() => handleButtonClick('outline')}
            >
              Outline
            </EnhancedButton>
          </div>
        </section>

        {/* Interactive Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Interactive Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InteractiveCard
              title="Default Card"
              subtitle="Hover and click to see interactions"
              selected={selectedCard === 'default'}
              onClick={() => setSelectedCard('default')}
            >
              <p className="text-muted-foreground">This card shows default interactions with hover and selection states.</p>
            </InteractiveCard>
            
            <InteractiveCard
              title="Success Card"
              subtitle="Green border and background"
              variant="success"
              selected={selectedCard === 'success'}
              onClick={() => setSelectedCard('success')}
            >
              <p className="text-muted-foreground">This card has a success theme with green accents.</p>
            </InteractiveCard>
            
            <InteractiveCard
              title="Warning Card"
              subtitle="Amber border and background"
              variant="warning"
              selected={selectedCard === 'warning'}
              onClick={() => setSelectedCard('warning')}
            >
              <p className="text-muted-foreground">This card has a warning theme with amber accents.</p>
            </InteractiveCard>
            
            <InteractiveCard
              title="Premium Card"
              subtitle="Enhanced styling with gradient"
              variant="premium"
              selected={selectedCard === 'premium'}
              onClick={() => setSelectedCard('premium')}
            >
              <p className="text-muted-foreground">This card has premium styling with enhanced effects.</p>
            </InteractiveCard>
            
            <InteractiveCard
              title="Glass Card"
              subtitle="Glassmorphism effect"
              variant="glass"
              selected={selectedCard === 'glass'}
              onClick={() => setSelectedCard('glass')}
            >
              <p className="text-muted-foreground">This card has a glassmorphism effect with blur.</p>
            </InteractiveCard>
            
            <InteractiveCard
              title="Error Card"
              subtitle="Red border and background"
              variant="error"
              selected={selectedCard === 'error'}
              onClick={() => setSelectedCard('error')}
            >
              <p className="text-muted-foreground">This card has an error theme with red accents.</p>
            </InteractiveCard>
          </div>
        </section>

        {/* Status Badges */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Status Badges</h2>
          <div className="flex flex-wrap gap-4">
            <StatusBadge status="online">Online</StatusBadge>
            <StatusBadge status="offline">Offline</StatusBadge>
            <StatusBadge status="pending">Pending</StatusBadge>
            <StatusBadge status="error">Error</StatusBadge>
            <StatusBadge status="success">Success</StatusBadge>
            <StatusBadge status="warning">Warning</StatusBadge>
          </div>
        </section>

        {/* Gradients */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">Primary Gradient</span>
            </div>
            <div className="h-32 gradient-bg-alt rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-semibold">Accent Gradient</span>
            </div>
            <div className="h-32 gradient-bg-premium rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Premium Gradient</span>
            </div>
          </div>
        </section>

        {/* Effects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Interactive Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="h-32 bg-card border border-border rounded-lg hover-lift flex items-center justify-center">
              <span className="font-semibold">Hover Lift</span>
            </div>
            <div className="h-32 bg-card border border-border rounded-lg glow-on-hover flex items-center justify-center">
              <span className="font-semibold">Glow Effect</span>
            </div>
            <div className="h-32 bg-card border border-border rounded-lg hover-3d flex items-center justify-center">
              <span className="font-semibold">3D Hover</span>
            </div>
            <div className="h-32 glass-card rounded-lg flex items-center justify-center">
              <span className="font-semibold">Glass Effect</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorDemo; 