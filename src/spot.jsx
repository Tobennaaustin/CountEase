import React, { useState, useEffect, useRef } from 'react';

const SpotliumLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [isFullyLit, setIsFullyLit] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      if (!hasMouseMoved) {
        setHasMouseMoved(true);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        setIsVisible(prev => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting
        }));
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);

    // Observe sections
    const sections = document.querySelectorAll('[data-observe]');
    sections.forEach(section => observer.observe(section));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [hasMouseMoved]);

  const SpotlightEffect = () => (
    <div
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        background: isFullyLit 
          ? 'rgba(0,0,0,0)'
          : hasMouseMoved 
          ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 40%, rgba(0,0,0,0.95) 100%)`
          : 'rgba(0,0,0,1)',
        transition: isFullyLit 
          ? 'background 2s ease-out' 
          : hasMouseMoved ? 'none' : 'background 1s ease-out'
      }}
    />
  );

  const BulbGlow = () => (
    hasMouseMoved && !isFullyLit && (
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Main bulb light */}
        <div 
          className="w-96 h-96 rounded-full opacity-80"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 30%, rgba(139,92,246,0.05) 60%, transparent 100%)',
            filter: 'blur(2px)'
          }}
        />
        {/* Inner bright core */}
        <div 
          className="absolute inset-0 w-64 h-64 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          }}
        />
        {/* Bright center dot */}
        <div 
          className="absolute w-8 h-8 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"
          style={{ filter: 'blur(1px)' }}
        />
      </div>
    )
  );

  const FloatingParticle = ({ delay, size, color }) => (
    <div
      className={`absolute ${size} rounded-full opacity-40`}
      style={{
        background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
        animation: `float ${4 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        left: `${20 + delay * 15}%`,
        top: `${30 + delay * 10}%`,
        transform: `translateY(${Math.sin(scrollY * 0.01 + delay) * 30}px)`
      }}
    />
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <SpotlightEffect />
      <BulbGlow />
      
      {/* Dark background with subtle particles */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 transition-all duration-2000"
          style={{
            background: isFullyLit 
              ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)'
              : 'black'
          }}
        />
        <FloatingParticle delay={0} size="w-2 h-2" color="#8B5CF6" />
        <FloatingParticle delay={1} size="w-1 h-1" color="#3B82F6" />
        <FloatingParticle delay={2} size="w-3 h-3" color="#06B6D4" />
        <FloatingParticle delay={3} size="w-1 h-1" color="#F59E0B" />
      </div>

      {/* Initial instruction overlay */}
      {!hasMouseMoved && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="text-center space-y-6 animate-pulse">
            <div className="text-6xl">💡</div>
            <p className="text-2xl text-gray-400">Move your mouse to illuminate</p>
            <p className="text-lg text-gray-500">Discover what lies in the darkness</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-4xl">
          <div 
            className="relative"
            style={{
              transform: `translateY(${scrollY * -0.3}px)`
            }}
          >
            <h1 className="text-8xl md:text-9xl font-bold tracking-tight">
              <span 
                className="inline-block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                style={{
                  textShadow: (hasMouseMoved || isFullyLit) ? '0 0 30px rgba(139, 92, 246, 0.5)' : 'none',
                  opacity: (hasMouseMoved || isFullyLit) ? 1 : 0,
                  transition: 'opacity 1s ease-out, text-shadow 0.5s ease-out'
                }}
              >
                SPOT
              </span>
              <span 
                className="inline-block bg-gradient-to-r from-yellow-200 via-white to-blue-200 bg-clip-text text-transparent"
                style={{
                  textShadow: (hasMouseMoved || isFullyLit) ? '0 0 30px rgba(255, 255, 255, 0.8)' : 'none',
                  opacity: (hasMouseMoved || isFullyLit) ? 1 : 0,
                  transition: 'opacity 1s ease-out 0.3s, text-shadow 0.5s ease-out'
                }}
              >
                LIUM
              </span>
            </h1>
            
            {/* Animated light rays behind text */}
            {(hasMouseMoved || isFullyLit) && (
              <div className="absolute inset-0 -z-10">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `conic-gradient(from ${i * 60}deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.1) 15deg, transparent 30deg)`,
                      animation: `spin ${20 + i * 3}s linear infinite`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              opacity: (hasMouseMoved || isFullyLit) ? Math.max(0, 1 - scrollY * 0.002) : 0,
              transition: 'opacity 1s ease-out 0.6s'
            }}
          >
            Illuminate your digital presence with precision and brilliance
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
              opacity: (hasMouseMoved || isFullyLit) ? Math.max(0, 1 - scrollY * 0.002) : 0,
              transition: 'opacity 1s ease-out 0.9s'
            }}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            
            <button className="px-8 py-4 border border-white/30 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-observe className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              (isVisible.features && hasMouseMoved) || isFullyLit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Illuminate Every Detail
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Precision meets innovation in our spotlight technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Precision Targeting", 
                desc: "Pinpoint accuracy in every interaction, revealing exactly what you need when you need it",
                icon: "🎯",
                color: "from-purple-500 to-pink-500"
              },
              { 
                title: "Dynamic Illumination", 
                desc: "Adaptive lighting that responds to your needs, brightening possibilities in real-time",
                icon: "💡",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                title: "Seamless Integration", 
                desc: "Effortlessly blend with your existing workflow, lighting up connections naturally",
                icon: "⚡",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:scale-105 ${
                  ((isVisible.features && hasMouseMoved) || isFullyLit)
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                }}
              >
                <div className={`text-4xl mb-4 p-3 rounded-xl bg-gradient-to-r ${feature.color} inline-block`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
                
                {/* Hover light effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-20 blur-xl`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="interactive" data-observe className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 ${
              (isVisible.interactive && hasMouseMoved) || isFullyLit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-white to-blue-400 bg-clip-text text-transparent">
              Master the Darkness
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Your cursor is the key to revealing hidden insights. Move it around to discover what's possible when precision meets illumination.
            </p>
            
            {/* Interactive light zone */}
            <div className="relative w-96 h-96 mx-auto mb-12 rounded-full border border-white/10">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)`,
                  opacity: (hasMouseMoved || isFullyLit) ? 1 : 0,
                  transition: 'opacity 1s ease-out'
                }}
              />
              
              {/* Animated particles within the circle */}
              {(hasMouseMoved || isFullyLit) && [...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/40 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    animation: `orbit ${3 + i * 0.5}s linear infinite`,
                    transformOrigin: `${60 + i * 20}px 0`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
              
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsFullyLit(true)}
              >
                <div className="text-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl mb-2">
                    {isFullyLit ? '✨' : hasMouseMoved ? '🔦' : '💡'}
                  </div>
                  <span className="text-lg font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
                    {isFullyLit 
                      ? 'Fully Illuminated!' 
                      : hasMouseMoved 
                      ? 'Click to light everything!' 
                      : 'Waiting for light...'}
                  </span>
                  {hasMouseMoved && !isFullyLit && (
                    <p className="text-sm text-gray-400 mt-2 animate-pulse">
                      🖱️ Click here
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                "Reveal hidden content with mouse movement",
                "Experience dynamic lighting effects",
                "Discover interactive storytelling"
              ].map((text, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-lg border border-white/10 bg-white/5"
                  style={{
                    opacity: (hasMouseMoved || isFullyLit) ? 1 : 0,
                    transition: `opacity 1s ease-out ${i * 0.3}s`
                  }}
                >
                  <p className="text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="relative z-10 py-16 px-6 border-t border-white/10"
        style={{
          opacity: (hasMouseMoved || isFullyLit) ? 1 : 0,
          transition: 'opacity 1s ease-out 1.5s'
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SPOTLIUM
          </div>
          <p className="text-gray-400 mb-8">
            Illuminating the future, one spotlight at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SpotliumLanding;