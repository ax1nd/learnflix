export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  id: string;
  title: string;
  provider: 'YouTube' | 'NPTEL' | 'MIT OCW' | 'freeCodeCamp' | 'Harvard CS50' | 'Stanford Online' | 'DeepLearning.AI';
  author: string;
  category: 'Artificial Intelligence & ML' | 'Data Structures & Algorithms' | 'Full Stack Development' | 'Cloud & DevOps' | 'Data Science & Analytics' | 'Cyber Security';
  level: SkillLevel;
  duration: string; // e.g. "18 hours"
  durationHours: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  enrollments: number;
  description: string;
  prerequisites: string[];
  skillsTaught: string[];
  tags: string[];
  url: string; // Open-source link
  embedVideoId?: string; // YouTube video ID for instant trailer preview
  thumbnail: string;
  isPopular?: boolean;
  featured?: boolean;
}

export interface LearnerProfile {
  id: string;
  name: string;
  avatarColor: string;
  avatarEmoji?: string;
  avatarImage?: string;
  avatarType?: 'purple-glasses' | 'cyan-smile' | 'green-smile' | 'red-kid' | 'blue-smile' | 'yellow-smile' | 'add';
  targetRole: string;
  learningGoal: string;
  currentProficiency: SkillLevel;
  preferredTopics: string[];
  completedCourses: string[]; // Course IDs
  inProgressCourses: { courseId: string; progressPercent: number }[];
  currentSkills: Record<string, number>; // Skill name -> 0-100 score
  targetSkills: Record<string, number>;  // Skill name -> 0-100 target score
  assessmentHistory: {
    quizId: string;
    topic: string;
    score: number;
    date: string;
    weakAreas: string[];
  }[];
  isColdStart?: boolean;
}

export interface RecommendationExplanation {
  primaryReason: string;
  goalAlignment: string;
  skillGapAddressed: string;
  prerequisiteStatus: 'Fulfilled' | 'Recommended Next' | 'Missing Prerequisites';
  collaborativeSignal: string;
  confidenceScore: number; // 0 - 100
  aiDeepRationale?: string;
}

export interface CourseRecommendation {
  course: Course;
  matchScore: number; // e.g. 98%
  contentSimilarity: number;
  collaborativeScore: number;
  hybridScore: number;
  explanation: RecommendationExplanation;
  recommendationType: 'Top Pick (Hybrid)' | 'Skill Gap Remedy' | 'Prerequisite Priority' | 'Trending in Interest' | 'Cold-Start Discovery';
}

export interface QuizQuestion {
  id: string;
  topic: string;
  subskill: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: SkillLevel;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: QuizQuestion[];
}

export interface SkillGapItem {
  skill: string;
  currentScore: number;
  targetScore: number;
  gapDelta: number;
  severity: 'Critical' | 'Moderate' | 'Minor' | 'Mastered';
  suggestedCourses: Course[];
}

export interface LearningPathMilestone {
  step: number;
  title: string;
  description: string;
  courses: Course[];
  targetSkills: string[];
  estimatedHours: number;
  status: 'Completed' | 'In Progress' | 'Up Next' | 'Locked';
  prerequisitesMet: boolean;
  unmetPrerequisites: string[];
}

export interface MLModelMetrics {
  precisionAtK: { k: number; value: number }[];
  recallAtK: { k: number; value: number }[];
  map: number; // Mean Average Precision
  ndcgAtK: { k: number; value: number }[]; // Normalized Discounted Cumulative Gain
  mrr: number; // Mean Reciprocal Rank
  catalogCoveragePercent: number;
  diversityScore: number;
  sampleTestCount: number;
  splitInfo: {
    trainRatio: number;
    validationRatio: number;
    testRatio: number;
    totalInteractions: number;
    totalLearners: number;
    totalCourses: number;
  };
}
