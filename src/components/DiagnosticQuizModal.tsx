import React, { useState } from 'react';
import { X, Award, ArrowRight } from 'lucide-react';
import { DIAGNOSTIC_QUIZZES } from '../data/learnersData.js';
import { LearnerProfile, QuizQuestion } from '../types/index.js';

interface DiagnosticQuizModalProps {
  learner: LearnerProfile;
  onClose: () => void;
  onQuizCompleted: (updatedSkills: Record<string, number>, weakAreas: string[], scorePercent: number) => void;
}

export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({
  learner,
  onClose,
  onQuizCompleted,
}) => {
  const activeQuiz = DIAGNOSTIC_QUIZZES.find(q => learner.preferredTopics.includes(q.category)) || DIAGNOSTIC_QUIZZES[0];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question: QuizQuestion = activeQuiz.questions[currentQuestionIndex];
  const totalQuestions = activeQuiz.questions.length;
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateAndFinish();
    }
  };

  const calculateAndFinish = () => {
    let correctCount = 0;
    const weakSubskills: string[] = [];
    const skillAdjustments: Record<string, number> = {};

    activeQuiz.questions.forEach((q, idx) => {
      const chosen = selectedAnswers[idx];
      const isCorrect = chosen === q.correctIndex;
      if (isCorrect) {
        correctCount += 1;
        skillAdjustments[q.subskill] = Math.min(95, (learner.currentSkills[q.subskill] || 50) + 15);
      } else {
        weakSubskills.push(q.subskill);
        skillAdjustments[q.subskill] = Math.max(20, (learner.currentSkills[q.subskill] || 50) - 10);
      }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    setIsSubmitted(true);
    onQuizCompleted(skillAdjustments, weakSubskills, scorePercent);
  };

  return (
    <div 
      className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#181818] border border-white/10 rounded-lg p-6 md:p-8 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Quiz Header */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <span className="text-[10px] font-bold text-[#E50914] uppercase tracking-wider block">
                {activeQuiz.category} · Technical Diagnostic
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
                {activeQuiz.title}
              </h2>
              <div className="flex items-center justify-between text-xs text-[#808080] mt-2">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span className="text-white font-medium">{question.subskill}</span>
              </div>

              {/* Red Netflix Progress Bar */}
              <div className="w-full bg-[#222222] h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-[#E50914] h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="mb-6">
              <p className="text-sm md:text-base font-medium text-white leading-relaxed mb-5">
                {question.question}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                  const isCorrect = idx === question.correctIndex;

                  let borderClass = 'border-white/10 hover:border-white/30 bg-[#222222] text-neutral-200';
                  if (isSelected && !showExplanation) {
                    borderClass = 'border-red-600 bg-red-950/40 text-white font-medium';
                  } else if (showExplanation) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-red-600 bg-red-950/40 text-red-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${borderClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation reveal */}
            {showExplanation && (
              <div className={`p-3.5 rounded text-xs leading-relaxed mb-6 border ${
                selectedAnswers[currentQuestionIndex] === question.correctIndex
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                  : 'bg-red-950/30 border-red-500/30 text-red-200'
              }`}>
                <strong>{selectedAnswers[currentQuestionIndex] === question.correctIndex ? 'Correct! ' : 'Explanation: '}</strong>
                {question.explanation}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {!showExplanation ? (
                <button
                  disabled={!isAnswered}
                  onClick={() => setShowExplanation(true)}
                  className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-[#222222] rounded disabled:opacity-40 cursor-pointer"
                >
                  Verify Answer
                </button>
              ) : (
                <span className="text-xs text-neutral-400">Response recorded</span>
              )}

              <button
                disabled={!isAnswered}
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#E50914] hover:bg-red-700 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm rounded transition-all cursor-pointer shadow-lg"
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? 'Submit & Recalibrate' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Assessment Ingested!
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
              Your test performance has updated your skill graph. The recommendation engine has dynamically recalibrated courses to target your identified gap areas.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#E50914] text-white font-semibold text-xs sm:text-sm rounded hover:bg-red-700 transition-colors cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
