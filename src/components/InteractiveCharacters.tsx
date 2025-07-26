import React, { useState, useEffect } from 'react';

interface Character {
  id: string;
  top: string;
  left: string;
  idleImage: string;
  workingImage: string;
  size: string;
}

const characters: Character[] = [
  {
    id: 'char1',
    top: '15%',
    left: '10%',
    idleImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    workingImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    size: '80px'
  },
  {
    id: 'char2',
    top: '25%',
    left: '85%',
    idleImage: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    workingImage: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    size: '70px'
  },
  {
    id: 'char3',
    top: '45%',
    left: '5%',
    idleImage: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    workingImage: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    size: '75px'
  },
  {
    id: 'char4',
    top: '60%',
    left: '90%',
    idleImage: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    workingImage: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    size: '85px'
  },
  {
    id: 'char5',
    top: '35%',
    left: '50%',
    idleImage: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    workingImage: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=200&h=300',
    size: '90px'
  }
];

const InteractiveCharacters: React.FC = () => {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Don't show on mobile for performance
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {characters.map((character) => {
        const isHovered = hoveredCharacter === character.id;
        const parallaxOffset = scrollY * 0.3;
        
        return (
          <div
            key={character.id}
            className="absolute transition-all duration-500 ease-out pointer-events-auto cursor-pointer"
            style={{
              top: character.top,
              left: character.left,
              transform: `translateY(${parallaxOffset}px) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
              width: character.size,
              height: character.size,
            }}
            onMouseEnter={() => setHoveredCharacter(character.id)}
            onMouseLeave={() => setHoveredCharacter(null)}
          >
            {/* Hanging rope */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-gray-600 to-gray-800 opacity-60"
              style={{
                width: '2px',
                height: '40px',
                marginTop: '-40px'
              }}
            />
            
            {/* Character container with swing animation */}
            <div 
              className={`relative w-full h-full transition-all duration-300 ${
                isHovered ? '' : 'animate-swing'
              }`}
              style={{
                transformOrigin: 'top center',
              }}
            >
              {/* Character silhouette/figure */}
              <div 
                className={`w-full h-full rounded-lg transition-all duration-300 relative overflow-hidden ${
                  isHovered 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50' 
                    : 'bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg shadow-gray-500/30'
                }`}
                style={{
                  filter: isHovered 
                    ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' 
                    : 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))'
                }}
              >
                {/* Head */}
                <div 
                  className={`absolute top-2 left-1/2 transform -translate-x-1/2 rounded-full transition-colors duration-300 ${
                    isHovered ? 'bg-yellow-300' : 'bg-gray-400'
                  }`}
                  style={{ width: '20%', height: '20%' }}
                />
                
                {/* Body */}
                <div 
                  className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 rounded transition-colors duration-300 ${
                    isHovered ? 'bg-blue-200' : 'bg-gray-500'
                  }`}
                  style={{ width: '40%', height: '35%' }}
                />
                
                {/* Arms - animated when working */}
                <div 
                  className={`absolute top-2/5 left-1/4 rounded transition-all duration-300 ${
                    isHovered ? 'bg-yellow-200 animate-pulse' : 'bg-gray-500'
                  }`}
                  style={{ 
                    width: '15%', 
                    height: '25%',
                    transform: isHovered ? 'rotate(-20deg)' : 'rotate(0deg)',
                    transformOrigin: 'top center'
                  }}
                />
                <div 
                  className={`absolute top-2/5 right-1/4 rounded transition-all duration-300 ${
                    isHovered ? 'bg-yellow-200 animate-pulse' : 'bg-gray-500'
                  }`}
                  style={{ 
                    width: '15%', 
                    height: '25%',
                    transform: isHovered ? 'rotate(20deg)' : 'rotate(0deg)',
                    transformOrigin: 'top center'
                  }}
                />
                
                {/* Legs */}
                <div 
                  className={`absolute bottom-2 left-1/3 rounded transition-colors duration-300 ${
                    isHovered ? 'bg-blue-300' : 'bg-gray-500'
                  }`}
                  style={{ width: '12%', height: '25%' }}
                />
                <div 
                  className={`absolute bottom-2 right-1/3 rounded transition-colors duration-300 ${
                    isHovered ? 'bg-blue-300' : 'bg-gray-500'
                  }`}
                  style={{ width: '12%', height: '25%' }}
                />
                
                {/* Work tools appear when hovered */}
                {isHovered && (
                  <>
                    {/* Laptop/screen */}
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded animate-pulse"
                      style={{ width: '60%', height: '30%' }}
                    >
                      <div className="w-full h-2/3 bg-blue-400 rounded-t animate-pulse"></div>
                    </div>
                    
                    {/* Sparkles/work effect */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Hover tooltip */}
              {isHovered && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-fadeIn">
                  Working on your project!
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveCharacters;