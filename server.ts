import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { COURSES } from './src/data/coursesData.js';
import { INITIAL_PROFILES, DIAGNOSTIC_QUIZZES } from './src/data/learnersData.js';
import { 
  generateRecommendations, 
  detectSkillGaps, 
  generateLearningPath, 
  computeModelEvaluationMetrics 
} from './src/utils/recommendationEngine.js';
import { LearnerProfile } from './src/types/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// In-memory state
let currentProfiles: LearnerProfile[] = JSON.parse(JSON.stringify(INITIAL_PROFILES));

// Initialize Gemini client (Server-side only)
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// API Routes
app.get('/api/courses', (req: Request, res: Response) => {
  res.json({ success: true, count: COURSES.length, data: COURSES });
});

app.get('/api/learners', (req: Request, res: Response) => {
  res.json({ success: true, data: currentProfiles });
});

app.post('/api/learners', (req: Request, res: Response) => {
  const newProfile: LearnerProfile = req.body;
  if (!newProfile.id || !newProfile.name) {
    res.status(400).json({ error: 'Profile ID and Name are required' });
    return;
  }
  currentProfiles.push(newProfile);
  res.json({ success: true, data: newProfile });
});

app.put('/api/learners/:id/skills', (req: Request, res: Response) => {
  const profileId = req.params.id;
  const { updatedSkills, quizResult, completedCourseId } = req.body;
  const profileIndex = currentProfiles.findIndex(p => p.id === profileId);

  if (profileIndex === -1) {
    res.status(404).json({ error: 'Learner profile not found' });
    return;
  }

  const profile = currentProfiles[profileIndex];

  if (updatedSkills) {
    profile.currentSkills = { ...profile.currentSkills, ...updatedSkills };
    profile.isColdStart = false;
  }

  if (completedCourseId && !profile.completedCourses.includes(completedCourseId)) {
    profile.completedCourses.push(completedCourseId);
    // remove from inProgress if present
    profile.inProgressCourses = profile.inProgressCourses.filter(p => p.courseId !== completedCourseId);
    profile.isColdStart = false;
  }

  if (quizResult) {
    profile.assessmentHistory.push(quizResult);
    profile.isColdStart = false;
  }

  currentProfiles[profileIndex] = profile;
  res.json({ success: true, data: profile });
});

app.post('/api/recommendations', (req: Request, res: Response) => {
  const learner: LearnerProfile = req.body;
  if (!learner) {
    res.status(400).json({ error: 'Learner profile payload required' });
    return;
  }
  const recommendations = generateRecommendations(learner, COURSES);
  res.json({ success: true, data: recommendations });
});

app.post('/api/skill-gap', (req: Request, res: Response) => {
  const learner: LearnerProfile = req.body;
  if (!learner) {
    res.status(400).json({ error: 'Learner profile payload required' });
    return;
  }
  const gaps = detectSkillGaps(learner, COURSES);
  res.json({ success: true, data: gaps });
});

app.post('/api/adaptive-path', (req: Request, res: Response) => {
  const learner: LearnerProfile = req.body;
  if (!learner) {
    res.status(400).json({ error: 'Learner profile payload required' });
    return;
  }
  const milestones = generateLearningPath(learner, COURSES);
  res.json({ success: true, data: milestones });
});

app.get('/api/quizzes', (req: Request, res: Response) => {
  res.json({ success: true, data: DIAGNOSTIC_QUIZZES });
});

app.get('/api/evaluate', (req: Request, res: Response) => {
  const metrics = computeModelEvaluationMetrics();
  res.json({ success: true, data: metrics });
});

// LLM Explainability Endpoint (USP)
app.post('/api/explain', async (req: Request, res: Response) => {
  const { learner, course, recommendationType } = req.body;
  if (!learner || !course) {
    res.status(400).json({ error: 'Learner and Course objects required' });
    return;
  }

  const prompt = `
You are the Chief Academic Officer and AI Recommendation Engine for LearnFlix.
A student named "${learner.name}" is pursuing the career goal: "${learner.targetRole}" (${learner.learningGoal}).
Their current proficiency level is "${learner.currentProficiency}".
Their current skill metrics: ${JSON.stringify(learner.currentSkills)}.
Their completed courses: ${JSON.stringify(learner.completedCourses)}.

Our hybrid recommendation engine ranked the course:
Title: "${course.title}"
Provider: "${course.provider} (${course.author})"
Level: "${course.level}"
Prerequisites: ${JSON.stringify(course.prerequisites)}
Skills Taught: ${JSON.stringify(course.skillsTaught)}
Recommendation Category: "${recommendationType}"

Please provide a concise, insightful explanation (3-4 bullet points max) addressing:
1. Why this specific course matches their career target ("${learner.targetRole}")
2. How it addresses their current skill gap and connects to their existing knowledge
3. Prerequisites assessment (whether they are ready or what to watch first)
4. Expected outcome upon completion.

Keep tone professional, encouraging, and pedagogically precise. No fluff.
`;

  try {
    if (ai && process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an elite curriculum advisor. Output concise, well-structured, clear pedagogical reasoning without conversational filler.',
        },
      });

      const explanationText = response.text || '';
      res.json({
        success: true,
        source: 'Gemini 3.8 Flash',
        explanation: explanationText,
      });
      return;
    }
  } catch (err) {
    console.warn('Gemini API call error, falling back to deterministic explanation generator:', err);
  }

  // Deterministic fallback explanation if Gemini is unavailable or rate limited
  const primaryGap = Object.keys(learner.targetSkills || {}).find(s => 
    course.skillsTaught && course.skillsTaught.some((st: string) => st.toLowerCase().includes(s.toLowerCase())) &&
    ((learner.currentSkills && learner.currentSkills[s]) || 0) < 60
  ) || (course.skillsTaught && course.skillsTaught[0]) || 'Core Knowledge';

  const fallback = `• **Goal Alignment**: Directly advances competencies essential for ${learner.targetRole}, specifically targeting ${primaryGap}.
• **Skill Gap Remedy**: Bridges your current gap in ${course.skillsTaught.slice(0, 2).join(' and ')} with verified hands-on curriculum from ${course.provider}.
• **Prerequisite Check**: ${course.prerequisites.length > 0 ? `Built upon foundations in ${course.prerequisites.join(', ')}.` : 'Zero prerequisites required; ideal for immediate onboarding.'}
• **Expected Milestone**: Completing this resource positions you for advanced project implementation and elevates your portfolio for hiring standards.`;

  res.json({
    success: true,
    source: 'Deterministic Explainability Engine',
    explanation: fallback,
  });
});

// Dataset export in CSV or JSON format for assignment evaluation
app.get('/api/dataset', (req: Request, res: Response) => {
  const format = req.query.format || 'json';

  if (format === 'csv') {
    const headers = ['id', 'title', 'provider', 'author', 'category', 'level', 'duration', 'rating', 'enrollments', 'prerequisites', 'skillsTaught', 'url'];
    const rows = COURSES.map(c => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.provider}"`,
      `"${c.author.replace(/"/g, '""')}"`,
      `"${c.category}"`,
      c.level,
      c.duration,
      c.rating,
      c.enrollments,
      `"${c.prerequisites.join('; ')}"`,
      `"${c.skillsTaught.join('; ')}"`,
      `"${c.url}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="learnflix_courses_dataset.csv"');
    res.send(csvContent);
    return;
  }

  res.json({
    metadata: {
      title: 'LearnFlix Open-Source Course Recommendation Dataset',
      version: '1.2.0',
      totalCourses: COURSES.length,
      license: 'Creative Commons Open Educational Resources',
      trainValTestSplit: '80% Train / 10% Validation / 10% Test'
    },
    courses: COURSES,
    sampleLearnerProfiles: currentProfiles
  });
});

// Vite Middleware for development or static serving for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`LearnFlix full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
