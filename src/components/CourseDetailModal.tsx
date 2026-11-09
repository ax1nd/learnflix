import React, { useState, useEffect } from 'react';
import { X, Play, CheckCircle, ExternalLink, Sparkles, AlertCircle, Clock, Users, Award } from 'lucide-react';
import { CourseRecommendation, LearnerProfile } from '../types/index.js';
import { CourseThumbnail } from './CourseThumbnail.js';

interface CourseDetailModalProps {
  recommendation: CourseRecommendation | null;
  learner: LearnerProfile;
  onClose: () => void;
  onMarkCompleted: (courseId: string) => void;
  onExplainDeep: (rec: CourseRecommendation) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  recommendation,
  learner,
  onClose,
  onMarkCompleted,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'aiExplain'>('overview');
  const [aiRationaleText, setAiRationaleText] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    setIsPlayingVideo(false);
    setActiveTab('overview');
    setAiRationaleText(null);
  }, [recommendation]);

  if (!recommendation) return null;

  const { course, matchScore, explanation, recommendationType, contentSimilarity, collaborativeScore } = recommendation;
  const isCompleted = learner.completedCourses.includes(course.id);

  const generateClientRationale = () => {
    const primaryGap = Object.keys(learner.targetSkills || {}).find(s => 
      course.skillsTaught && course.skillsTaught.some(st => st.toLowerCase().includes(s.toLowerCase())) &&
      ((learner.currentSkills && learner.currentSkills[s]) || 0) < 60
    ) || (course.skillsTaught && course.skillsTaught[0]) || 'Core Concepts';

    return `• **Career Goal Alignment**: Directly advances competencies required for ${learner.targetRole} (${learner.learningGoal}), specifically focusing on ${primaryGap}.
• **Skill Gap Remedy**: Bridges your current gap in ${course.skillsTaught.slice(0, 2).join(' and ')} with rigorous curriculum from ${course.provider}.
• **Prerequisite Assessment**: ${course.prerequisites.length > 0 ? `Builds upon foundations in ${course.prerequisites.join(', ')}.` : 'No strict prerequisites required; ideal for immediate onboarding.'}
• **Target Milestone**: Completing this resource positions you for production-grade project delivery and portfolio validation.`;
  };

  const handleLoadAiRationale = async () => {
    setActiveTab('aiExplain');
    if (aiRationaleText) return;

    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          learner,
          course,
          recommendationType
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setAiRationaleText(data.explanation || generateClientRationale());
      } else {
        setAiRationaleText(generateClientRationale());
      }
    } catch {
      setAiRationaleText(generateClientRationale());
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#181818] rounded-lg overflow-hidden shadow-2xl my-auto text-left border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#181818]/80 hover:bg-[#222222] text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 16:9 Video Banner / Preview */}
        <div className="relative w-full aspect-video max-h-[380px] bg-black">
          {isPlayingVideo && course.embedVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${course.embedVideoId}?autoplay=1&rel=0`}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <>
              <div className="w-full h-full filter brightness-[0.72]">
                <CourseThumbnail course={course} priority={true} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/40 to-black/20" />

              {/* Play Trigger */}
              <div className="absolute inset-0 flex items-center justify-center -translate-y-6">
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="flex items-center gap-2.5 px-5 py-2.5 bg-white text-black font-bold text-xs sm:text-sm rounded hover:bg-neutral-200 shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  Preview Lecture
                </button>
              </div>

              {/* Bottom Title on Banner */}
              <div className="absolute bottom-3 left-4 md:left-8 right-4 z-10">
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="font-bold text-emerald-400 bg-black/80 px-1.5 py-0.5 rounded text-[11px]">
                    {matchScore}% Match
                  </span>
                  <span className="text-neutral-300 font-semibold bg-black/80 px-1.5 py-0.5 rounded text-[10px]">
                    {course.provider}
                  </span>
                  <span className="text-amber-400 font-medium text-[11px]">
                    ★ {course.rating.toFixed(2)}
                  </span>
                </div>
                <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-md line-clamp-2 max-w-xl">
                  {course.title}
                </h2>
              </div>
            </>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8">
          
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#E50914] hover:bg-red-700 text-white font-semibold text-xs sm:text-sm rounded transition-colors shadow-lg cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Open Full Course ({course.provider})
              </a>

              <button
                onClick={() => onMarkCompleted(course.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer border ${
                  isCompleted 
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-[#222222] hover:bg-neutral-800 border-white/10 text-white'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-neutral-400'}`} />
                {isCompleted ? 'Completed' : 'Mark Completed'}
              </button>

              <button
                onClick={handleLoadAiRationale}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#222222] hover:bg-neutral-800 border border-white/10 text-white rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E50914]" />
                Ask AI Rationale
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {(course.enrollments / 1000).toFixed(0)}k Learners
              </span>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-white/10 pb-2.5 mb-5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-1 cursor-pointer transition-colors ${
                activeTab === 'overview' ? 'text-white border-b-2 border-[#E50914]' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview & Scoring
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`pb-1 cursor-pointer transition-colors ${
                activeTab === 'syllabus' ? 'text-white border-b-2 border-[#E50914]' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Prerequisites & Skills
            </button>
            <button
              onClick={handleLoadAiRationale}
              className={`pb-1 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'aiExplain' ? 'text-white border-b-2 border-[#E50914]' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
              LLM Explanation (USP)
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
              <div>
                <h4 className="text-white font-semibold text-xs sm:text-sm mb-1.5">Syllabus Overview</h4>
                <p className="leading-relaxed text-neutral-300">{course.description}</p>
              </div>

              {/* Recommendation Weights */}
              <div className="bg-[#222222] border border-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Recommendation Engine Confidence Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-black/50 p-2.5 rounded border border-white/5">
                    <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Content Similarity</span>
                    <span className="text-white font-bold text-base">{contentSimilarity}%</span>
                    <span className="text-neutral-500 block text-[10px] mt-0.5">TF-IDF Vector Cosine</span>
                  </div>
                  <div className="bg-black/50 p-2.5 rounded border border-white/5">
                    <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Collaborative Signal</span>
                    <span className="text-white font-bold text-base">{collaborativeScore}%</span>
                    <span className="text-neutral-500 block text-[10px] mt-0.5">Peer Interaction Cohort</span>
                  </div>
                  <div className="bg-black/50 p-2.5 rounded border border-white/5">
                    <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Hybrid Confidence</span>
                    <span className="text-emerald-400 font-bold text-base">{matchScore}%</span>
                    <span className="text-neutral-500 block text-[10px] mt-0.5">Weighted Ensemble Score</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 mt-3">
                  <strong className="text-neutral-300">Peer Insight: </strong>
                  {explanation.collaborativeSignal}
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Prerequisites & Skills */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2.5">
                  Prerequisites Check
                </h4>
                <div className="space-y-2">
                  {course.prerequisites.map((prereq) => {
                    const matchingSkill = Object.keys(learner.currentSkills).find(s => 
                      s.toLowerCase().includes(prereq.toLowerCase()) || prereq.toLowerCase().includes(s.toLowerCase())
                    );
                    const userScore = matchingSkill ? learner.currentSkills[matchingSkill] : 20;
                    const isSatisfied = userScore >= 50 || prereq.toLowerCase().includes('none');

                    return (
                      <div
                        key={prereq}
                        className={`flex items-center justify-between p-2.5 rounded border ${
                          isSatisfied 
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-neutral-200'
                            : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isSatisfied ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <span>{prereq}</span>
                        </div>
                        <span className="text-[11px] font-semibold">
                          {isSatisfied ? 'Satisfied' : `Gap detected (~${userScore}% score)`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
                  Target Competencies Taught
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {course.skillsTaught.map(skill => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 bg-[#222222] border border-white/5 rounded text-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: LLM Explanation */}
          {activeTab === 'aiExplain' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#222222] border border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E50914]" />
                    AI Recommendation Rationale
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Gemini 3.8 Flash
                  </span>
                </div>

                {isLoadingAi ? (
                  <div className="py-8 text-center text-xs text-neutral-400 flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing learner skill graph and course pedagogy...</span>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line space-y-2">
                    {aiRationaleText || explanation.primaryReason}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
