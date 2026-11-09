import React, { useState } from 'react';
import { Course } from '../types/index.js';

interface CourseThumbnailProps {
  course: Course;
  className?: string;
  priority?: boolean;
}

export const CourseThumbnail: React.FC<CourseThumbnailProps> = ({
  course,
  className = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  // Default path is the local bundled SVG in /thumbnails/
  const localSvgPath = `/thumbnails/${course.id}.svg`;

  if (hasError) {
    // Clean, abstract visual gradient fallback with zero conflicting text
    const categoryColors: Record<string, { bg: string; accent: string }> = {
      'Artificial Intelligence & ML': { bg: 'from-[#200005] via-[#3a000c] to-[#0d0004]', accent: '#e50914' },
      'Data Structures & Algorithms': { bg: 'from-[#030e20] via-[#082247] to-[#02060f]', accent: '#0284c7' },
      'Full Stack Development': { bg: 'from-[#0e0422] via-[#230b50] to-[#070211]', accent: '#8b5cf6' },
      'Data Science & Analytics': { bg: 'from-[#021814] via-[#06362d] to-[#010d0a]', accent: '#059669' },
      'Cloud & DevOps': { bg: 'from-[#1c1003] via-[#3d2307] to-[#0c0701]', accent: '#d97706' },
      'Cyber Security': { bg: 'from-[#1c0303] via-[#380808] to-[#0d0101]', accent: '#dc2626' },
    };

    const color = categoryColors[course.category] || { bg: 'from-[#141414] via-[#222222] to-[#0a0a0a]', accent: '#e50914' };

    return (
      <div className={`w-full h-full bg-gradient-to-br ${color.bg} relative overflow-hidden select-none ${className}`}>
        {/* Abstract geometric grid lines */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Subtle accent glow in bottom right */}
        <div 
          className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-30" 
          style={{ backgroundColor: color.accent }}
        />

        {/* Ambient watermark top right */}
        <div className="absolute top-3 right-3 opacity-30">
          <span 
            className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded text-white"
            style={{ backgroundColor: color.accent }}
          >
            LEARNFLIX
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={localSvgPath}
      alt={course.title}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
};
