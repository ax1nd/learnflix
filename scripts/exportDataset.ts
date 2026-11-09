import fs from 'fs';
import path from 'path';
import { COURSES } from '../src/data/coursesData.js';

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
const outputPath = path.resolve('public', 'learnflix_courses_dataset.csv');
fs.writeFileSync(outputPath, csvContent, 'utf-8');
console.log(`Saved dataset to ${outputPath} (${COURSES.length} courses)`);
