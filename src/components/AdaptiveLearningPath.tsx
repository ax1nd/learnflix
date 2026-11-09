import React from 'react';
import { CheckCircle2, Lock, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import { LearningPathMilestone, LearnerProfile, Course } from '../types/index.js';
import { CourseThumbnail } from './CourseThumbnail.js';

interface AdaptiveLearningPathProps {
  milestones: LearningPathMilestone[];
  learner: LearnerProfile;
  onOpenCourse: (course: Course) => void;
  onTakeQuiz: () => void;
}

export const AdaptiveLearningPath: React.FC<AdaptiveLearningPathProps> = ({
  milestones,
  learner,
  onOpenCourse,
  onTakeQuiz,
}) => {
  const completedMilestones = milestones.filter(m => m.status === 'Completed').length;
  const progressPercent = Math.round((completedMilestones / (milestones.length || 1)) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 select-none">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <span className="text-xs font-bold text-[#E50914] uppercase tracking-wider block">
            Prerequisite-Aware Curriculum
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
            Personalised Path for {learner.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#808080] mt-1 max-w-2xl leading-relaxed">
            Target Role: <strong className="text-white">{learner.targetRole}</strong>. Milestones adapt dynamically as prerequisite criteria are met or after diagnostic test evaluations.
          </p>
        </div>

        {/* Progress Metric */}
        <div className="bg-[#181818] border border-white/10 rounded-lg p-3.5 flex items-center gap-4 shrink-0">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#808080]">Roadmap Progress</span>
              <span className="text-emerald-400 font-bold ml-3">{progressPercent}%</span>
            </div>
            <div className="w-32 sm:w-36 h-2 bg-[#222222] rounded-full overflow-hidden">
              <div 
                className="bg-[#E50914] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={onTakeQuiz}
            className="px-3 py-1.5 bg-[#E50914] hover:bg-red-700 text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            Recalibrate
          </button>
        </div>
      </div>

      {/* Path Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-5 before:w-0.5 before:bg-white/10">
        {milestones.map((milestone) => {
          const isCompleted = milestone.status === 'Completed';
          const isInProgress = milestone.status === 'In Progress';
          const isUpNext = milestone.status === 'Up Next';
          const isLocked = milestone.status === 'Locked';

          return (
            <div key={milestone.step} className="relative pl-9 sm:pl-12 md:pl-14">
              
              {/* Step Icon Badge */}
              <div 
                className={`absolute left-0 top-2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-xl z-10 transition-colors ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white ring-4 ring-[#141414]' 
                    : isInProgress 
                    ? 'bg-[#E50914] text-white ring-4 ring-[#141414]'
                    : isUpNext
                    ? 'bg-[#222222] text-white ring-4 ring-[#141414] border border-white/20'
                    : 'bg-[#181818] text-neutral-600 border border-neutral-800'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" /> : isLocked ? <Lock className="w-3.5 h-3.5" /> : milestone.step}
              </div>

              {/* Milestone Card */}
              <div className={`bg-[#181818] border rounded-lg p-4 sm:p-5 md:p-6 transition-all ${
                isInProgress 
                  ? 'border-red-600/50 shadow-xl' 
                  : isCompleted 
                  ? 'border-emerald-600/30' 
                  : 'border-white/5 opacity-85'
              }`}>
                
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      isCompleted ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                      isInProgress ? 'bg-red-950 text-red-400 border border-red-500/30' :
                      isUpNext ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                      'bg-neutral-900 text-neutral-500 border border-neutral-800'
                    }`}>
                      {milestone.status}
                    </span>
                    <span className="text-xs text-[#808080] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{milestone.estimatedHours} Hours
                    </span>
                  </div>

                  {!milestone.prerequisitesMet && milestone.unmetPrerequisites.length > 0 && (
                    <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Prerequisite Block: {milestone.unmetPrerequisites.join(', ')}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mb-3 leading-relaxed">
                  {milestone.description}
                </p>

                {/* Target Competencies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {milestone.targetSkills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[#222222] border border-white/5 text-[10px] text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enrolled Courses in this Milestone */}
                <div className="pt-3 border-t border-white/5">
                  <span className="text-[11px] font-semibold text-[#808080] block mb-2">
                    Recommended Open-Source Courses:
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {milestone.courses.map((course) => {
                      const isCourseCompleted = learner.completedCourses.includes(course.id);
                      return (
                        <div
                          key={course.id}
                          onClick={() => onOpenCourse(course)}
                          className="flex items-center gap-3 p-2 bg-[#222222] hover:bg-neutral-800 border border-white/5 hover:border-white/20 rounded cursor-pointer transition-all group"
                        >
                          <div className="w-14 h-9 rounded overflow-hidden shrink-0 filter brightness-90 group-hover:brightness-100">
                            <CourseThumbnail course={course} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors truncate">
                              {course.title}
                            </h4>
                            <p className="text-[10px] text-neutral-400 truncate">
                              {course.provider} · {course.duration}
                            </p>
                          </div>
                          <div className="shrink-0 text-neutral-500 group-hover:text-white">
                            {isCourseCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <ArrowRight className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
