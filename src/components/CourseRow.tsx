import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import { CourseRecommendation, LearnerProfile } from '../types/index.js';
import { CourseThumbnail } from './CourseThumbnail.js';

interface CourseRowProps {
  title: string;
  subtitle?: string;
  recommendations: CourseRecommendation[];
  learner: LearnerProfile;
  onOpenDetails: (rec: CourseRecommendation) => void;
  onOpenExplain: (rec: CourseRecommendation) => void;
}

export const CourseRow: React.FC<CourseRowProps> = ({
  title,
  subtitle,
  recommendations,
  learner,
  onOpenDetails,
  onOpenExplain,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="relative mb-8 group/row px-4 md:px-12 select-none">
      {/* Row Header */}
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2 hover:text-[#E50914] transition-colors cursor-pointer">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#808080] mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className="text-xs text-neutral-500 font-medium">
          {recommendations.length} titles
        </span>
      </div>

      {/* Row Carousel Container */}
      <div className="relative">
        {/* Left Scroll Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-30 w-10 md:w-12 bg-black/60 hover:bg-black/90 text-white opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-r"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Courses Horizontal List */}
        <div
          ref={rowRef}
          className="flex items-stretch gap-2.5 md:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-2"
        >
          {recommendations.map((rec) => {
            const { course, matchScore } = rec;
            const isCompleted = learner.completedCourses.includes(course.id);
            const inProgress = learner.inProgressCourses.find(p => p.courseId === course.id);

            return (
              <div
                key={course.id}
                className="shrink-0 w-[220px] sm:w-[260px] md:w-[280px] bg-[#181818] rounded overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-105 group/card flex flex-col justify-between"
              >
                {/* 16:9 Thumbnail Container */}
                <div 
                  onClick={() => onOpenDetails(rec)}
                  className="relative aspect-video overflow-hidden cursor-pointer bg-neutral-900 group-hover/card:scale-105 transition-transform duration-500"
                >
                  <CourseThumbnail course={course} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Top Left Match Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="text-[10px] md:text-[11px] font-bold text-emerald-400 bg-black/80 px-1.5 py-0.5 rounded">
                      {matchScore}% Match
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-semibold text-white bg-red-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> Done
                      </span>
                    )}
                  </div>

                  {/* Provider Pill */}
                  <div className="absolute top-2 right-2">
                    <span className="text-[9px] font-medium text-neutral-300 bg-black/70 border border-white/10 px-1.5 py-0.5 rounded">
                      {course.provider}
                    </span>
                  </div>

                  {/* Hover Overlay Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 bg-black/30 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-90 group-hover/card:scale-100 transition-transform">
                      <Play className="w-4 h-4 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Duration & Rating */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-neutral-300">
                    <span>{course.duration}</span>
                    <span className="text-amber-400">★ {course.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onOpenDetails(rec)}
                      className="text-xs sm:text-sm font-semibold text-white line-clamp-1 hover:text-[#E50914] transition-colors cursor-pointer mb-1"
                      title={course.title}
                    >
                      {course.title}
                    </h3>
                    
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 line-clamp-2 mb-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Metadata with Typographic Separator */}
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 mb-1 truncate">
                      <span>{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{course.skillsTaught[0]}</span>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => onOpenExplain(rec)}
                      className="flex items-center gap-1 text-[10px] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="View AI recommendation rationale"
                    >
                      <Sparkles className="w-3 h-3 text-[#E50914]" />
                      <span>Why for you</span>
                    </button>

                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-neutral-400 hover:text-white transition-colors"
                      title={`Open on ${course.provider}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* In Progress Bar */}
                {inProgress && (
                  <div className="w-full bg-neutral-800 h-1">
                    <div 
                      className="bg-[#E50914] h-1 transition-all"
                      style={{ width: `${inProgress.progressPercent}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Scroll Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-30 w-10 md:w-12 bg-black/60 hover:bg-black/90 text-white opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-l"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
