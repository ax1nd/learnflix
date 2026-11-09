/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header.js';
import { ProfileSelection } from './components/ProfileSelection.js';
import { HeroBillboard } from './components/HeroBillboard.js';
import { CourseRow } from './components/CourseRow.js';
import { CourseDetailModal } from './components/CourseDetailModal.js';
import { AdaptiveLearningPath } from './components/AdaptiveLearningPath.js';
import { SkillGapView } from './components/SkillGapView.js';
import { DiagnosticQuizModal } from './components/DiagnosticQuizModal.js';
import { MLEvaluationDashboard } from './components/MLEvaluationDashboard.js';

import { COURSES } from './data/coursesData.js';
import { INITIAL_PROFILES } from './data/learnersData.js';
import { 
  generateRecommendations, 
  detectSkillGaps, 
  generateLearningPath, 
  computeModelEvaluationMetrics 
} from './utils/recommendationEngine.js';
import { Course, CourseRecommendation, LearnerProfile } from './types/index.js';

export default function App() {
  const [profiles, setProfiles] = useState<LearnerProfile[]>(INITIAL_PROFILES);
  const [currentProfile, setCurrentProfile] = useState<LearnerProfile>(INITIAL_PROFILES[0]);
  const [showProfileSelector, setShowProfileSelector] = useState<boolean>(true);
  
  const [activeTab, setActiveTab] = useState<'browse' | 'path' | 'skills' | 'evaluation'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedRecForDetails, setSelectedRecForDetails] = useState<CourseRecommendation | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Compute recommendations for current active profile
  const allRecommendations = useMemo(() => {
    return generateRecommendations(currentProfile, COURSES);
  }, [currentProfile]);

  // Compute skill gaps
  const skillGaps = useMemo(() => {
    return detectSkillGaps(currentProfile, COURSES);
  }, [currentProfile]);

  // Compute adaptive learning path
  const learningPathMilestones = useMemo(() => {
    return generateLearningPath(currentProfile, COURSES);
  }, [currentProfile]);

  // ML Evaluation metrics
  const modelMetrics = useMemo(() => {
    return computeModelEvaluationMetrics();
  }, []);

  // Filter recommendations if search query is active
  const filteredRecs = useMemo(() => {
    if (!searchQuery.trim()) return allRecommendations;
    const query = searchQuery.toLowerCase();
    return allRecommendations.filter(r => 
      r.course.title.toLowerCase().includes(query) ||
      r.course.provider.toLowerCase().includes(query) ||
      r.course.category.toLowerCase().includes(query) ||
      r.course.skillsTaught.some(s => s.toLowerCase().includes(query)) ||
      r.course.tags.some(t => t.toLowerCase().includes(query))
    );
  }, [allRecommendations, searchQuery]);

  // Billboard top recommendation
  const topRec = filteredRecs.length > 0 ? filteredRecs[0] : allRecommendations[0];

  // Specific curated shelves for Netflix layout
  const topPicksShelf = useMemo(() => {
    return filteredRecs.slice(0, 10);
  }, [filteredRecs]);

  const skillGapShelf = useMemo(() => {
    // Courses that target critical or moderate gaps
    const criticalSkillNames = skillGaps
      .filter(g => g.severity === 'Critical' || g.severity === 'Moderate')
      .map(g => g.skill.toLowerCase());

    return filteredRecs.filter(r => 
      r.course.skillsTaught.some(st => criticalSkillNames.some(csn => csn.includes(st.toLowerCase()) || st.toLowerCase().includes(csn)))
    );
  }, [filteredRecs, skillGaps]);

  const nptelAndUniversityShelf = useMemo(() => {
    return filteredRecs.filter(r => 
      r.course.provider === 'NPTEL' || r.course.provider === 'MIT OCW' || r.course.provider === 'Harvard CS50'
    );
  }, [filteredRecs]);

  const quickBoostersShelf = useMemo(() => {
    return filteredRecs.filter(r => r.course.durationHours <= 12);
  }, [filteredRecs]);

  const foundationalShelf = useMemo(() => {
    return filteredRecs.filter(r => r.course.level === 'Beginner');
  }, [filteredRecs]);

  // Handle Mark as Completed
  const handleMarkCompleted = (courseId: string) => {
    const updated = { ...currentProfile };
    if (!updated.completedCourses.includes(courseId)) {
      updated.completedCourses = [...updated.completedCourses, courseId];
    } else {
      updated.completedCourses = updated.completedCourses.filter(id => id !== courseId);
    }
    updated.isColdStart = false;

    // Boost skills taught by course
    const course = COURSES.find(c => c.id === courseId);
    if (course) {
      const skillsCopy = { ...updated.currentSkills };
      course.skillsTaught.forEach(skill => {
        skillsCopy[skill] = Math.min(95, (skillsCopy[skill] || 40) + 20);
      });
      updated.currentSkills = skillsCopy;
    }

    setCurrentProfile(updated);
    setProfiles(profiles.map(p => p.id === updated.id ? updated : p));
  };

  // Handle Quiz Completion
  const handleQuizCompleted = (updatedSkills: Record<string, number>, weakAreas: string[], scorePercent: number) => {
    const updated = { ...currentProfile };
    updated.currentSkills = { ...updated.currentSkills, ...updatedSkills };
    updated.isColdStart = false;
    updated.assessmentHistory = [
      ...updated.assessmentHistory,
      {
        quizId: `quiz-${Date.now()}`,
        topic: currentProfile.preferredTopics[0] || 'Technical Diagnostic',
        score: scorePercent,
        date: new Date().toISOString().split('T')[0],
        weakAreas
      }
    ];

    setCurrentProfile(updated);
    setProfiles(profiles.map(p => p.id === updated.id ? updated : p));
  };

  // Handle adding custom profile
  const handleAddProfile = (newProfile: LearnerProfile) => {
    setProfiles([...profiles, newProfile]);
    setCurrentProfile(newProfile);
    setShowProfileSelector(false);
  };

  // Handle updating existing profile (from Manage Profiles)
  const handleUpdateProfile = (updated: LearnerProfile) => {
    setProfiles(profiles.map(p => p.id === updated.id ? updated : p));
    if (currentProfile.id === updated.id) {
      setCurrentProfile(updated);
    }
  };

  // Helper to open course in detail modal
  const handleOpenCourseByObject = (course: Course) => {
    const rec = allRecommendations.find(r => r.course.id === course.id) || {
      course,
      matchScore: 90,
      contentSimilarity: 88,
      collaborativeScore: 85,
      hybridScore: 89,
      recommendationType: 'Top Pick (Hybrid)' as const,
      explanation: {
        primaryReason: `Recommended for ${currentProfile.targetRole}`,
        goalAlignment: currentProfile.learningGoal,
        skillGapAddressed: course.skillsTaught.slice(0, 3).join(', '),
        prerequisiteStatus: 'Fulfilled' as const,
        collaborativeSignal: 'Popular among peer cohort',
        confidenceScore: 90
      }
    };
    setSelectedRecForDetails(rec);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Netflix Profile Selector ("Who's watching?") */}
      {showProfileSelector && (
        <ProfileSelection
          profiles={profiles}
          onSelectProfile={(p) => {
            setCurrentProfile(p);
            setShowProfileSelector(false);
          }}
          onAddProfile={handleAddProfile}
          onUpdateProfile={handleUpdateProfile}
          canClose={true}
          onClose={() => setShowProfileSelector(false)}
        />
      )}

      {/* Netflix Header */}
      <Header
        currentProfile={currentProfile}
        profiles={profiles}
        onSelectProfile={(p) => setCurrentProfile(p)}
        onOpenProfileSelector={() => setShowProfileSelector(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1 pb-16">
        
        {/* TAB 1: BROWSE (Netflix Home Experience) */}
        {activeTab === 'browse' && (
          <div>
            {/* Cinematic Hero Billboard */}
            {!searchQuery && (
              <HeroBillboard
                topRecommendation={topRec}
                learner={currentProfile}
                onOpenDetails={(rec) => setSelectedRecForDetails(rec)}
                onOpenExplain={(rec) => setSelectedRecForDetails(rec)}
              />
            )}

            {/* Cold Start Notice Banner if active */}
            {currentProfile.isColdStart && (
              <div className="max-w-7xl mx-auto px-4 md:px-12 mt-6 mb-2">
                <div className="bg-[#181818] border border-white/10 rounded-lg p-3.5 text-xs text-neutral-300 flex items-center justify-between gap-4">
                  <div>
                    <strong className="text-white font-bold block mb-0.5">
                      Cold-Start Strategy Engaged (USP)
                    </strong>
                    {currentProfile.name} has 0 completed courses. The engine has adapted weights to 100% metadata and foundational prerequisites ($\alpha = 1.0$) for onboarding without interaction data.
                  </div>
                  <button
                    onClick={() => setShowQuizModal(true)}
                    className="px-4 py-2 bg-[#E50914] hover:bg-red-700 text-white font-semibold rounded text-xs shrink-0 transition-colors cursor-pointer"
                  >
                    Take Diagnostic Quiz
                  </button>
                </div>
              </div>
            )}

            {/* Search Filter Header if searching */}
            {searchQuery && (
              <div className="max-w-7xl mx-auto px-4 md:px-12 pt-8 pb-4">
                <h1 className="text-2xl font-bold text-white">
                  Search Results for "{searchQuery}"
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Found {filteredRecs.length} matching courses across open-source providers
                </p>
              </div>
            )}

            {/* Netflix Rows */}
            <div className={`space-y-6 ${searchQuery ? 'mt-4' : 'mt-6 md:mt-8 relative z-20'}`}>
              
              {/* Row 1: Top Picks for Learner */}
              <CourseRow
                title={`Top Recommendations for ${currentProfile.name}`}
                subtitle={`Hybrid algorithm matching ${currentProfile.targetRole} competencies`}
                recommendations={topPicksShelf}
                learner={currentProfile}
                onOpenDetails={(rec) => setSelectedRecForDetails(rec)}
                onOpenExplain={(rec) => setSelectedRecForDetails(rec)}
              />

              {/* Row 2: Skill Gap Remedies */}
              {skillGapShelf.length > 0 && (
                <CourseRow
                  title="Bridging Your Critical Skill Gaps"
                  subtitle="Prioritized based on quiz performance and target role benchmarks"
                  recommendations={skillGapShelf}
                  learner={currentProfile}
                  onOpenDetails={(rec) => setSelectedRecForDetails(rec)}
                  onOpenExplain={(rec) => setSelectedRecForDetails(rec)}
                />
              )}

              {/* Row 3: University & NPTEL Specials */}
              <CourseRow
                title="Free University OpenCourseWare & NPTEL Specials"
                subtitle="High-rigor academic lectures from MIT, Harvard CS50, and IIT professors"
                recommendations={nptelAndUniversityShelf}
                learner={currentProfile}
                onOpenDetails={(rec) => setSelectedRecForDetails(rec)}
                onOpenExplain={(rec) => setSelectedRecForDetails(rec)}
              />

              {/* Row 4: Foundational Prerequisites */}
              {currentProfile.isColdStart || currentProfile.currentProficiency === 'Beginner' ? (
                <CourseRow
                  title="Foundational Prerequisites & Onboarding"
                  subtitle="Essential computational and mathematical building blocks"
                  recommendations={foundationalShelf}
                  learner={currentProfile}
                  onOpenDetails={(rec) => setSelectedRecForDetails(rec)}
                  onOpenExplain={(rec) => setSelectedRecForDetails(rec)}
                />
              ) : null}

              {/* Row 5: Quick Boosters */}
              <CourseRow
                title="Quick Skill Boosters (Under 12 Hours)"
                subtitle="Targeted crash courses and focused implementations"
                recommendations={quickBoostersShelf}
                learner={currentProfile}
                onOpenDetails={(rec) => setSelectedRecForDetails(rec)}
                onOpenExplain={(rec) => setSelectedRecForDetails(rec)}
              />

            </div>
          </div>
        )}

        {/* TAB 2: ADAPTIVE LEARNING PATH */}
        {activeTab === 'path' && (
          <AdaptiveLearningPath
            milestones={learningPathMilestones}
            learner={currentProfile}
            onOpenCourse={handleOpenCourseByObject}
            onTakeQuiz={() => setShowQuizModal(true)}
          />
        )}

        {/* TAB 3: SKILL RADAR & QUIZ */}
        {activeTab === 'skills' && (
          <SkillGapView
            gaps={skillGaps}
            learner={currentProfile}
            onOpenCourse={handleOpenCourseByObject}
            onLaunchQuiz={() => setShowQuizModal(true)}
          />
        )}

        {/* TAB 4: ML EVALUATION DASHBOARD */}
        {activeTab === 'evaluation' && (
          <MLEvaluationDashboard
            metrics={modelMetrics}
            onOpenCourse={handleOpenCourseByObject}
          />
        )}

      </main>

      {/* Netflix Quick-View Course Modal */}
      {selectedRecForDetails && (
        <CourseDetailModal
          recommendation={selectedRecForDetails}
          learner={currentProfile}
          onClose={() => setSelectedRecForDetails(null)}
          onMarkCompleted={handleMarkCompleted}
          onExplainDeep={(rec) => setSelectedRecForDetails(rec)}
        />
      )}

      {/* Diagnostic Quiz Modal */}
      {showQuizModal && (
        <DiagnosticQuizModal
          learner={currentProfile}
          onClose={() => setShowQuizModal(false)}
          onQuizCompleted={handleQuizCompleted}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c0c0c] py-8 px-4 md:px-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[#E50914] font-extrabold tracking-tighter text-lg">LEARNFLIX</span>
            <span>· AI-Powered Personalised Learning & Course Recommendation System</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('evaluation')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Evaluation Metrics (NDCG / MAP)
            </button>
            <a
              href="/learnflix_courses_dataset.csv"
              download="learnflix_courses_dataset.csv"
              className="hover:text-neutral-300 transition-colors"
            >
              Download Dataset
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
