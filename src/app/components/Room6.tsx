import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface Room6Props {
  onComplete: (answer: string) => void;
  answers: string[];
}

export function Room6({ onComplete, answers }: Room6Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const fears = [
    { word: 'Blood', letter: 'B', color: 'text-red-600' },
    { word: 'Whispers', letter: 'W', color: 'text-gray-500' },
    { word: 'Silence', letter: 'S', color: 'text-gray-400' },
    { word: 'Moving corpses', letter: 'M', color: 'text-red-500' },
    { word: 'Time distortion', letter: 'T', color: 'text-blue-500' }
  ];

  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => setCurrentStep(1), 4000);
      return () => clearTimeout(timer);
    } else if (currentStep === 1) {
      const timer = setTimeout(() => setCurrentStep(2), 5000);
      return () => clearTimeout(timer);
    } else if (currentStep === 2) {
      const timer = setTimeout(() => setCurrentStep(3), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleSubmit = () => {
    const normalized = answer.trim().toUpperCase();
    if (normalized === 'TOMBS') {
      onComplete(normalized);
    } else {
      setWrongAttempts(prev => prev + 1);
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full space-y-12"
      >
        {/* Room title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-2"
        >
          <p className="text-red-500 text-sm uppercase tracking-widest">Room 6 - Final Room</p>
          <h2 className="text-5xl font-bold text-white flex items-center justify-center gap-3">
            <Brain className="w-12 h-12" />
            YOUR MIND
          </h2>
          <p className="text-red-400 text-sm italic">Theme: Psychological collapse</p>
        </motion.div>

        {/* Step 1: Show previous answers */}
        {currentStep >= 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/50 border border-gray-700 p-8 rounded-lg"
          >
            <p className="text-gray-400 text-center mb-6 uppercase tracking-wider text-sm">
              The screen shows your answers:
            </p>
            <div className="space-y-3">
              {answers.map((ans, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="text-2xl font-mono text-gray-300 text-center py-2 bg-gray-800/50 rounded"
                >
                  {ans}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Warning message */}
        {currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-950/30 border-2 border-red-900 p-6 rounded text-center space-y-2"
          >
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500 text-2xl font-bold"
            >
              "Everything you saw was wrong.
            </motion.p>
            <p className="text-red-400 text-xl">
              Only what scared you was real."
            </p>
          </motion.div>
        )}

        {/* Step 3: Show fears */}
        {currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <p className="text-gray-400 text-center uppercase tracking-wider text-sm">
              What scared you the most:
            </p>
            <div className="grid grid-cols-1 gap-3">
              {fears.map((fear, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="bg-gray-800/30 border border-gray-700 p-4 rounded flex justify-between items-center"
                >
                  <span className={`text-xl ${fear.color}`}>{fear.word}</span>
                  <span className="text-2xl font-bold text-white bg-gray-900 px-4 py-2 rounded">
                    {fear.letter}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center space-y-2"
            >
              <p className="text-gray-400 italic">
                Take the first letters:
              </p>
              <p className="text-3xl font-mono text-white tracking-widest">
                {fears.map(f => f.letter).join(' ')}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Step 4: Final hint */}
        {currentStep >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-950/20 border border-red-900/50 p-6 rounded text-center"
          >
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-400 text-xl italic"
            >
              "Fear rearranges memory."
            </motion.p>
            <p className="text-gray-500 text-sm mt-2">
              Rearrange the letters to spell something meaningful...
            </p>
          </motion.div>
        )}

        {/* Error message */}
        {wrongAttempts > 0 && currentStep >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-red-500 text-xl font-bold">
              ✗ Your mind rejects this answer.
            </p>
            {wrongAttempts >= 2 && (
              <p className="text-gray-400 text-sm italic mt-2">
                B W S M T... where do these letters rest?<br/>
                What holds the remains of the dead?
              </p>
            )}
          </motion.div>
        )}

        {/* Input */}
        {currentStep >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4 max-w-md mx-auto"
          >
            <p className="text-gray-400 text-center">
              🔐 Enter the final answer to escape:
            </p>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Rearrange the letters..."
              className="bg-gray-900 border-gray-700 text-white text-center text-2xl h-16 uppercase tracking-widest"
            />
            <Button
              onClick={handleSubmit}
              className="w-full bg-red-900 hover:bg-red-800 text-white h-14 text-lg uppercase tracking-wider"
            >
              Escape the Asylum
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
