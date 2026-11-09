import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SkillGapItem, LearnerProfile, Course } from '../types/index.js';
import { CourseThumbnail } from './CourseThumbnail.js';

interface SkillGapViewProps {
  gaps: SkillGapItem[];
  learner: LearnerProfile;
  onOpenCourse: (course: Course) => void;
  onLaunchQuiz: () => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  gaps,
  learner,
  onOpenCourse,
  onLaunchQuiz,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <span className="text-xs font-bold text-[#E50914] uppercase tracking-wider block">
            Knowledge Benchmark & Gap Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
            Skill Radar for {learner.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#808080] mt-1 max-w-2xl leading-relaxed">
            Target Role: <strong className="text-white">{learner.targetRole}</strong>. The recommendation engine evaluates the Euclidean delta between your current diagnostic score and target industry benchmarks.
          </p>
        </div>

        <button
          onClick={onLaunchQuiz}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#E50914] hover:bg-red-700 text-white font-semibold text-xs sm:text-sm rounded transition-all shadow-lg active:scale-95 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          Take 5-Min Diagnostic Quiz
        </button>
      </div>

      {/* Latest Assessment Summary */}
      {learner.assessmentHistory.length > 0 && (
        <div className="bg-[#181818] border border-white/5 rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[#808080] block text-[10px] uppercase tracking-wider">Latest Assessment:</span>
            <strong className="text-white text-sm">
              {learner.assessmentHistory[learner.assessmentHistory.length - 1].topic}
            </strong>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[#808080] block text-[10px] uppercase tracking-wider">Diagnostic Score</span>
              <span className="text-emerald-400 font-bold text-sm">
                {learner.assessmentHistory[learner.assessmentHistory.length - 1].score}%
              </span>
            </div>
            <div>
              <span className="text-[#808080] block text-[10px] uppercase tracking-wider">Identified Weak Areas</span>
              <span className="text-amber-400 font-medium">
                {learner.assessmentHistory[learner.assessmentHistory.length - 1].weakAreas.join(', ')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Skill Gaps List */}
      <div className="space-y-3.5">
        {gaps.map((item) => {
          const isCritical = item.severity === 'Critical';
          const isModerate = item.severity === 'Moderate';

          return (
            <div 
              key={item.skill}
              className={`bg-[#181818] border rounded-lg p-4 sm:p-5 transition-all ${
                isCritical 
                  ? 'border-red-600/40 bg-gradient-to-r from-red-950/20 via-[#181818] to-transparent' 
                  : isModerate 
                  ? 'border-amber-600/30' 
                  : 'border-white/5'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3.5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {item.skill}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      isCritical ? 'text-red-400 bg-red-950/80 border border-red-500/30' :
                      isModerate ? 'text-amber-400 bg-amber-950/80 border border-amber-500/30' :
                      'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30'
                    }`}>
                      {item.severity} (Δ {item.gapDelta > 0 ? `-${item.gapDelta}%` : '0%'})
                    </span>
                  </div>
                  <p className="text-xs text-[#808080]">
                    Current: <strong className="text-white">{item.currentScore}%</strong> · Target Benchmark: <strong className="text-white">{item.targetScore}%</strong>
                  </p>
                </div>

                {/* Netflix Style Progress Bar */}
                <div className="w-full md:w-64 space-y-1 text-[10px]">
                  <div className="flex justify-between text-[#808080]">
                    <span>Proficiency Gap</span>
                    <span className="font-mono text-white">{item.currentScore} / {item.targetScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden relative">
                    <div 
                      className="absolute top-0 bottom-0 bg-neutral-700/50"
                      style={{ width: `${item.targetScore}%` }}
                    />
                    <div 
                      className={`h-full relative z-10 transition-all duration-500 ${
                        isCritical ? 'bg-[#E50914]' : isModerate ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.currentScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Direct Remedial Course Recommendations */}
              {item.suggestedCourses.length > 0 && (
                <div className="pt-3 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-[#808080] block mb-2 font-medium">
                    Recommended Open-Source Courses to Close This Gap:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {item.suggestedCourses.map(course => (
                      <div
                        key={course.id}
                        onClick={() => onOpenCourse(course)}
                        className="flex items-center gap-2.5 p-2 bg-black/40 hover:bg-[#222222] rounded border border-white/5 hover:border-white/20 cursor-pointer transition-colors group"
                      >
                        <div className="w-12 h-8 rounded overflow-hidden shrink-0">
                          <CourseThumbnail course={course} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white group-hover:text-[#E50914] truncate">
                            {course.title}
                          </p>
                          <span className="text-[10px] text-neutral-400 truncate block">
                            {course.provider} · {course.duration}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
