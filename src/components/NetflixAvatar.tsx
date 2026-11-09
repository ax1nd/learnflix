import React from 'react';

export type NetflixAvatarType = 'purple-glasses' | 'cyan-smile' | 'green-smile' | 'red-kid' | 'blue-smile' | 'yellow-smile' | 'add';

interface NetflixAvatarProps {
  type: NetflixAvatarType;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const NetflixAvatar: React.FC<NetflixAvatarProps> = ({
  type,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded',
    md: 'w-10 h-10 rounded',
    lg: 'w-28 h-28 md:w-36 md:h-36 rounded-md',
    xl: 'w-32 h-32 md:w-40 md:h-40 rounded-md',
  }[size];

  switch (type) {
    case 'purple-glasses':
      // Purple background, character with stylish hair, round glasses, and white collar
      return (
        <div className={`${sizeClasses} bg-[#6a1b9a] overflow-hidden relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background gradient/solid */}
            <rect width="100" height="100" fill="#6a1b9a" />
            
            {/* Body / Shirt */}
            <path d="M 15 100 C 15 80 35 75 50 75 C 65 75 85 80 85 100 Z" fill="#ffffff" />
            <path d="M 40 75 C 40 82 60 82 60 75 Z" fill="#e0e0e0" />
            
            {/* Neck */}
            <rect x="42" y="65" width="16" height="15" fill="#c68b59" />

            {/* Head */}
            <ellipse cx="50" cy="50" rx="20" ry="22" fill="#c68b59" />

            {/* Hair */}
            <path d="M 28 42 C 28 20 40 18 55 18 C 72 18 78 28 78 38 C 70 34 62 34 52 38 C 42 42 34 46 28 42 Z" fill="#3e2723" />
            <path d="M 26 40 C 24 35 24 25 35 20 C 45 16 65 16 75 22 C 78 30 76 42 74 44 C 68 36 50 32 38 38 Z" fill="#3e2723" />
            
            {/* Glasses */}
            <circle cx="38" cy="50" r="9" stroke="#1a1a1a" strokeWidth="3.5" fill="none" />
            <circle cx="62" cy="50" r="9" stroke="#1a1a1a" strokeWidth="3.5" fill="none" />
            <line x1="47" y1="50" x2="53" y2="50" stroke="#1a1a1a" strokeWidth="3.5" />
            
            {/* Eyes inside glasses */}
            <circle cx="38" cy="50" r="3" fill="#1a1a1a" />
            <circle cx="62" cy="50" r="3" fill="#1a1a1a" />
            <circle cx="39" cy="49" r="1" fill="#ffffff" />
            <circle cx="63" cy="49" r="1" fill="#ffffff" />

            {/* Smile */}
            <path d="M 44 60 Q 50 64 56 60" stroke="#5d4037" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'cyan-smile':
      // Cyan/teal square with iconic white dot eyes and smiling curve
      return (
        <div className={`${sizeClasses} bg-[#00bcd4] overflow-hidden relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#00bcd4" />
            {/* Left Eye */}
            <circle cx="28" cy="45" r="5" fill="#ffffff" />
            {/* Right Eye */}
            <circle cx="72" cy="45" r="5" fill="#ffffff" />
            {/* Smile Curve */}
            <path d="M 38 60 Q 56 70 76 56" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'green-smile':
      // Lime green square with iconic white dot eyes and smiling curve
      return (
        <div className={`${sizeClasses} bg-[#76c81f] overflow-hidden relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#76c81f" />
            {/* Left Eye */}
            <circle cx="28" cy="45" r="5" fill="#ffffff" />
            {/* Right Eye */}
            <circle cx="72" cy="45" r="5" fill="#ffffff" />
            {/* Smile Curve */}
            <path d="M 38 60 Q 56 70 76 56" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'red-kid':
      // Red background, dark-skinned character with cyan/blue shirt
      return (
        <div className={`${sizeClasses} bg-[#c62828] overflow-hidden relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#c62828" />
            
            {/* Shirt */}
            <path d="M 15 100 C 15 82 35 78 50 78 C 65 78 85 82 85 100 Z" fill="#29b6f6" />
            <path d="M 40 78 C 40 84 60 84 60 78 Z" fill="#0288d1" />

            {/* Neck */}
            <rect x="43" y="68" width="14" height="12" fill="#4a2e18" />

            {/* Head */}
            <ellipse cx="50" cy="52" rx="19" ry="21" fill="#4a2e18" />

            {/* Ears */}
            <ellipse cx="31" cy="52" rx="4" ry="6" fill="#4a2e18" />
            <ellipse cx="69" cy="52" rx="4" ry="6" fill="#4a2e18" />

            {/* Hair */}
            <path d="M 30 45 C 30 24 40 22 50 22 C 60 22 70 24 70 45 C 65 40 55 38 50 38 C 45 38 35 40 30 45 Z" fill="#1c120c" />
            <circle cx="50" cy="28" r="14" fill="#1c120c" />

            {/* Eyes */}
            <circle cx="42" cy="52" r="3.5" fill="#1c120c" />
            <circle cx="58" cy="52" r="3.5" fill="#1c120c" />

            {/* Smile */}
            <path d="M 45 61 Q 50 64 55 61" stroke="#1c120c" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'blue-smile':
      // Blue square with iconic white dot eyes and smiling curve
      return (
        <div className={`${sizeClasses} bg-[#1e88e5] overflow-hidden relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#1e88e5" />
            {/* Left Eye */}
            <circle cx="28" cy="45" r="5" fill="#ffffff" />
            {/* Right Eye */}
            <circle cx="72" cy="45" r="5" fill="#ffffff" />
            {/* Smile Curve */}
            <path d="M 38 60 Q 56 70 76 56" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'yellow-smile':
      // Golden yellow square with smile
      return (
        <div className={`${sizeClasses} bg-[#fbc02d] overflow-hidden relative flex items-center justify-center shrink-0 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#fbc02d" />
            <circle cx="28" cy="45" r="5" fill="#ffffff" />
            <circle cx="72" cy="45" r="5" fill="#ffffff" />
            <path d="M 38 60 Q 56 70 76 56" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'add':
      return (
        <div className={`${sizeClasses} border-2 border-neutral-600 hover:border-white bg-transparent flex items-center justify-center text-neutral-400 hover:text-white transition-colors shrink-0 ${className}`}>
          <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-current" strokeWidth="1.5" fill="none">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`${sizeClasses} bg-[#e50914] flex items-center justify-center text-white font-bold text-2xl shrink-0 ${className}`}>
          L
        </div>
      );
  }
};
