import fs from 'fs';
import path from 'path';
import { COURSES } from '../src/data/coursesData.js';

const outDir = path.resolve(process.cwd(), 'public/thumbnails');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

interface Palette {
  from: string;
  via: string;
  to: string;
  accent: string;
  accentGlow: string;
  iconType: 'ai' | 'code' | 'dsa' | 'data' | 'cloud' | 'security';
}

function getPalette(category: string): Palette {
  switch (category) {
    case 'Artificial Intelligence & ML':
      return {
        from: '#1a0206',
        via: '#38040d',
        to: '#0d0103',
        accent: '#e50914',
        accentGlow: '#ff3344',
        iconType: 'ai'
      };
    case 'Data Structures & Algorithms':
      return {
        from: '#030e20',
        via: '#082247',
        to: '#02060f',
        accent: '#0284c7',
        accentGlow: '#38bdf8',
        iconType: 'dsa'
      };
    case 'Full Stack Development':
      return {
        from: '#0e0422',
        via: '#230b50',
        to: '#070211',
        accent: '#8b5cf6',
        accentGlow: '#c084fc',
        iconType: 'code'
      };
    case 'Data Science & Analytics':
      return {
        from: '#021814',
        via: '#06362d',
        to: '#010d0a',
        accent: '#059669',
        accentGlow: '#34d399',
        iconType: 'data'
      };
    case 'Cloud & DevOps':
      return {
        from: '#1c1003',
        via: '#3d2307',
        to: '#0c0701',
        accent: '#d97706',
        accentGlow: '#fbbf24',
        iconType: 'cloud'
      };
    case 'Cyber Security':
      return {
        from: '#1c0303',
        via: '#380808',
        to: '#0d0101',
        accent: '#dc2626',
        accentGlow: '#f87171',
        iconType: 'security'
      };
    default:
      return {
        from: '#141414',
        via: '#262626',
        to: '#0a0a0a',
        accent: '#e50914',
        accentGlow: '#ff4d5a',
        iconType: 'code'
      };
  }
}

function renderVisualArtwork(iconType: string, accent: string, glow: string): string {
  switch (iconType) {
    case 'ai':
      return `
        <!-- Neural Network Architecture Illustration -->
        <g opacity="0.6">
          <!-- Connection Mesh -->
          <g stroke="${accent}" stroke-width="2" opacity="0.4">
            <line x1="600" y1="180" x2="800" y2="120" />
            <line x1="600" y1="180" x2="800" y2="260" />
            <line x1="600" y1="360" x2="800" y2="260" />
            <line x1="600" y1="360" x2="800" y2="440" />
            <line x1="600" y1="540" x2="800" y2="440" />
            <line x1="600" y1="540" x2="800" y2="600" />

            <line x1="800" y1="120" x2="1000" y2="200" />
            <line x1="800" y1="260" x2="1000" y2="200" />
            <line x1="800" y1="260" x2="1000" y2="380" />
            <line x1="800" y1="440" x2="1000" y2="380" />
            <line x1="800" y1="440" x2="1000" y2="520" />
            <line x1="800" y1="600" x2="1000" y2="520" />

            <line x1="1000" y1="200" x2="1160" y2="360" stroke="${glow}" stroke-width="3" opacity="0.7" />
            <line x1="1000" y1="380" x2="1160" y2="360" stroke="${glow}" stroke-width="3" opacity="0.7" />
            <line x1="1000" y1="520" x2="1160" y2="360" stroke="${glow}" stroke-width="3" opacity="0.7" />
          </g>

          <!-- Nodes with ambient glow -->
          <g>
            <circle cx="600" cy="180" r="16" fill="${accent}" opacity="0.8" />
            <circle cx="600" cy="360" r="16" fill="${accent}" opacity="0.8" />
            <circle cx="600" cy="540" r="16" fill="${accent}" opacity="0.8" />

            <circle cx="800" cy="120" r="18" fill="${glow}" opacity="0.85" />
            <circle cx="800" cy="260" r="18" fill="${glow}" opacity="0.85" />
            <circle cx="800" cy="440" r="18" fill="${glow}" opacity="0.85" />
            <circle cx="800" cy="600" r="18" fill="${glow}" opacity="0.85" />

            <circle cx="1000" cy="200" r="22" fill="${accent}" />
            <circle cx="1000" cy="380" r="22" fill="${accent}" />
            <circle cx="1000" cy="520" r="22" fill="${accent}" />

            <!-- Core Output Node -->
            <circle cx="1160" cy="360" r="34" fill="${glow}" opacity="0.3" />
            <circle cx="1160" cy="360" r="24" fill="#ffffff" />
          </g>
        </g>
      `;

    case 'dsa':
      return `
        <!-- Algorithmic Tree & Array Graph -->
        <g opacity="0.6">
          <g stroke="${glow}" stroke-width="3" opacity="0.5">
            <line x1="950" y1="160" x2="820" y2="280" />
            <line x1="950" y1="160" x2="1080" y2="280" />
            <line x1="820" y1="280" x2="740" y2="420" />
            <line x1="820" y1="280" x2="890" y2="420" />
            <line x1="1080" y1="280" x2="1010" y2="420" />
            <line x1="1080" y1="280" x2="1160" y2="420" />
          </g>
          <g fill="${accent}">
            <circle cx="950" cy="160" r="28" fill="#ffffff" />
            <circle cx="820" cy="280" r="22" fill="${glow}" />
            <circle cx="1080" cy="280" r="22" fill="${glow}" />
            <circle cx="740" cy="420" r="18" />
            <circle cx="890" cy="420" r="18" />
            <circle cx="1010" cy="420" r="18" />
            <circle cx="1160" cy="420" r="18" />
          </g>
          <!-- Indexed Memory Array Matrix -->
          <g transform="translate(680, 520)" opacity="0.6">
            <rect x="0" y="0" width="480" height="70" rx="8" fill="#030e20" stroke="${glow}" stroke-width="2" />
            <line x1="120" y1="0" x2="120" y2="70" stroke="${glow}" stroke-width="2" />
            <line x1="240" y1="0" x2="240" y2="70" stroke="${glow}" stroke-width="2" />
            <line x1="360" y1="0" x2="360" y2="70" stroke="${glow}" stroke-width="2" />
            <rect x="240" y="0" width="120" height="70" fill="${accent}" opacity="0.3" />
          </g>
        </g>
      `;

    case 'code':
      return `
        <!-- Full-Stack Architecture Code Graphic -->
        <g opacity="0.55" transform="translate(680, 140)">
          <path d="M 120 40 L 20 220 L 120 400" stroke="${glow}" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.8" />
          <path d="M 360 40 L 460 220 L 360 400" stroke="${glow}" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.8" />
          <line x1="280" y1="30" x2="200" y2="420" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.9" />
        </g>
      `;

    case 'data':
      return `
        <!-- Data Distribution & Matrix Analytics -->
        <g opacity="0.6" transform="translate(620, 160)">
          <!-- Gaussian Regression Curve -->
          <path d="M 20 420 Q 180 410 260 220 T 400 60 T 540 320 T 660 420" fill="none" stroke="${glow}" stroke-width="5" opacity="0.9" />
          <!-- Histogram Density Bars -->
          <g fill="${accent}" opacity="0.4">
            <rect x="60" y="340" width="45" height="90" rx="4" />
            <rect x="120" y="270" width="45" height="160" rx="4" />
            <rect x="180" y="190" width="45" height="240" rx="4" />
            <rect x="240" y="110" width="45" height="320" rx="4" fill="${glow}" opacity="0.7" />
            <rect x="300" y="70" width="45" height="360" rx="4" fill="${glow}" opacity="0.8" />
            <rect x="360" y="140" width="45" height="290" rx="4" />
            <rect x="420" y="230" width="45" height="200" rx="4" />
            <rect x="480" y="310" width="45" height="120" rx="4" />
            <rect x="540" y="370" width="45" height="60" rx="4" />
          </g>
        </g>
      `;

    case 'cloud':
      return `
        <!-- Distributed Cloud & Microservices -->
        <g opacity="0.6" transform="translate(680, 140)">
          <!-- Floating Cloud Cluster -->
          <path d="M 120 220 A 70 70 0 0 1 240 140 A 100 100 0 0 1 420 160 A 80 80 0 0 1 480 250 A 60 60 0 0 1 440 340 L 100 340 A 60 60 0 0 1 120 220 Z" fill="${accent}" opacity="0.25" stroke="${glow}" stroke-width="3" />
          <!-- Container Pods -->
          <rect x="120" y="380" width="80" height="65" rx="6" fill="${glow}" opacity="0.7" />
          <rect x="230" y="380" width="80" height="65" rx="6" fill="${accent}" opacity="0.8" />
          <rect x="340" y="380" width="80" height="65" rx="6" fill="${glow}" opacity="0.7" />
          <line x1="200" y1="340" x2="160" y2="380" stroke="${glow}" stroke-width="2" stroke-dasharray="4" />
          <line x1="280" y1="340" x2="270" y2="380" stroke="${glow}" stroke-width="2" stroke-dasharray="4" />
          <line x1="360" y1="340" x2="380" y2="380" stroke="${glow}" stroke-width="2" stroke-dasharray="4" />
        </g>
      `;

    case 'security':
      return `
        <!-- Security Shield & Firewall Matrix -->
        <g opacity="0.6" transform="translate(740, 120)">
          <path d="M 240 40 L 420 110 L 420 290 C 420 410 240 500 240 500 C 240 500 60 410 60 290 L 60 110 Z" fill="${accent}" opacity="0.2" stroke="${glow}" stroke-width="4" />
          <circle cx="240" cy="220" r="45" fill="${glow}" opacity="0.7" />
          <rect x="225" y="220" width="30" height="90" rx="8" fill="#ffffff" />
        </g>
      `;

    default:
      return '';
  }
}

COURSES.forEach(course => {
  const palette = getPalette(course.category);
  const visualArt = renderVisualArtwork(palette.iconType, palette.accent, palette.accentGlow);

  // Pure aesthetic poster: ZERO overlapping text!
  // Only subtle artistic gradients, abstract technical illustrations, and sleek watermark!
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <!-- Background Cinematic Gradient -->
    <linearGradient id="bg_${course.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.from}" />
      <stop offset="45%" stop-color="${palette.via}" />
      <stop offset="100%" stop-color="${palette.to}" />
    </linearGradient>

    <!-- Deep Vignette Scrim (Ensures text rendered in HTML on top is 100% legible) -->
    <radialGradient id="vignette_${course.id}" cx="50%" cy="50%" r="60%">
      <stop offset="40%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.9" />
    </radialGradient>

    <linearGradient id="fadeLeft_${course.id}" x1="0%" y1="0%" x2="70%" y2="0%">
      <stop offset="0%" stop-color="#141414" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#141414" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#141414" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <!-- Base Canvas -->
  <rect width="1280" height="720" fill="url(#bg_${course.id})" />

  <!-- Thematic Visual Schematic Graphic -->
  ${visualArt}

  <!-- Left Shadow Scrim (Leaves clean focal area for HTML headlines) -->
  <rect width="1280" height="720" fill="url(#fadeLeft_${course.id})" />
  <rect width="1280" height="720" fill="url(#vignette_${course.id})" />

  <!-- Subtle Ambient Corner Grid Pattern -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="120" x2="1280" y2="120" />
    <line x1="0" y1="240" x2="1280" y2="240" />
    <line x1="0" y1="360" x2="1280" y2="360" />
    <line x1="0" y1="480" x2="1280" y2="480" />
    <line x1="0" y1="600" x2="1280" y2="600" />
    <line x1="160" y1="0" x2="160" y2="720" />
    <line x1="320" y1="0" x2="320" y2="720" />
    <line x1="480" y1="0" x2="480" y2="720" />
    <line x1="640" y1="0" x2="640" y2="720" />
    <line x1="800" y1="0" x2="800" y2="720" />
    <line x1="960" y1="0" x2="960" y2="720" />
    <line x1="1120" y1="0" x2="1120" y2="720" />
  </g>

  <!-- Discreet Brand Monogram in Top Right (Never interferes with left HTML text) -->
  <g transform="translate(1180, 50)" opacity="0.4">
    <rect x="-40" y="-15" width="80" height="30" rx="4" fill="#000000" opacity="0.5" />
    <text x="0" y="6" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="${palette.accent}" text-anchor="middle" letter-spacing="1">NETFLIX</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${course.id}.svg`), svgContent, 'utf-8');
});

console.log(`Successfully generated ${COURSES.length} clean cinematic SVG thumbnails (ZERO text collision) in ${outDir}`);
