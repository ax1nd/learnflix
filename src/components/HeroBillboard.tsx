import React from 'react';
import { Play, Info, Sparkles, ExternalLink } from 'lucide-react';
import { CourseRecommendation, LearnerProfile } from '../types/index.js';
import { CourseThumbnail } from './CourseThumbnail.js';

interface HeroBillboardProps {
  topRecommendation: CourseRecommendation | null;
  learner: LearnerProfile;
  onOpenDetails: (rec: CourseRecommendation) => void;
  onOpenExplain: (rec: CourseRecommendation) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  topRecommendation,
  learner,
  onOpenDetails,
  onOpenExplain,
}) => {
  if (!topRecommendation) return null;

  const { course, matchScore, explanation, recommendationType } = topRecommendation;

  return (
    <div className="relative w-full min-h-[520px] sm:min-h-[560px] md:min-h-[620px] overflow-hidden select-none flex flex-col justify-end">
      {/* Background Hero Banner */}
      <div className="absolute inset-0 w-full h-full scale-105 filter brightness-[0.72] transition-transform duration-1000 ease-out">
        <CourseThumbnail course={course} priority={true} />
      </div>

      {/* Cinematic Netflix Scrim Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />

      {/* Billboard Content */}
      <div className="relative max-w-7xl mx-auto w-full px-4 md:px-12 pt-24 pb-8 md:pb-12 z-10">
        
        {/* Netflix Top Badges */}
        <div className="flex items-center gap-3 mb-3 text-xs">
          <span className="font-bold text-emerald-400">
            {matchScore}% Match
          </span>
          <span className="text-neutral-300 font-semibold uppercase tracking-wider text-[11px]">
            {course.provider}
          </span>
          <span className="text-neutral-500" aria-hidden="true">·</span>
          <span className="text-neutral-300 text-[11px]">
            {course.duration}
          </span>
          <span className="text-neutral-500" aria-hidden="true">·</span>
          <span className="text-neutral-400 border border-neutral-600 px-1 py-0.5 text-[9px] rounded font-mono">
            HD
          </span>
          <span className="text-amber-400 font-semibold text-[11px]">
            ★ {course.rating.toFixed(2)}
          </span>
        </div>

        {/* Course Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white max-w-3xl tracking-tight leading-tight mb-3 drop-shadow-lg">
          {course.title}
        </h1>

        {/* Explainability Subtitle (USP) */}
        <div className="max-w-2xl bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-2.5 mb-4 text-xs text-neutral-300 flex items-start gap-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
          <p className="line-clamp-2">
            <strong className="text-white">Why for {learner.name}: </strong>
            {explanation.primaryReason} Addresses <span className="text-emerald-400 font-medium">{explanation.skillGapAddressed}</span>.
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-neutral-300 max-w-2xl line-clamp-2 md:line-clamp-3 mb-6 text-shadow">
          {course.description}
        </p>

        {/* Netflix Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenDetails(topRecommendation)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold text-sm rounded hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg active:scale-95"
          >
            <Play className="w-4 h-4 fill-black" />
            Watch Lecture Preview
          </button>

          <button
            onClick={() => onOpenExplain(topRecommendation)}
            className="flex items-center gap-2 px-5 py-2.5 bg-neutral-600/70 hover:bg-neutral-600/90 text-white font-semibold text-sm rounded backdrop-blur transition-colors cursor-pointer active:scale-95"
          >
            <Info className="w-4 h-4" />
            More Info & AI Rationale
          </button>

          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs sm:text-sm rounded border border-white/10 transition-colors cursor-pointer"
            title={`Open official ${course.provider} resource in new tab`}
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Open on {course.provider}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
