import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { FileText } from 'lucide-react';

interface Room1Props {
  onComplete: (answer: string) => void;
  username: string;
}

export function Room1({ onComplete, username }: Room1Props) {
  const [answer, setAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const handleSubmit = () => {
    const normalized = answer.trim().toUpperCase();
    // The answer is "VOID" - formed by taking the first letter of each diagnosis
    // Vertigo, Obsession, Insomnia, Delusion
    if (normalized === 'VOID') {
      onComplete(normalized);
    } else {
      setWrongAttempts(prev => prev + 1);
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full space-y-8"
      >
        {/* Room title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-2"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest">Room 1</p>
          <h2 className="text-4xl font-bold text-white">📋 THE ADMISSION FORM</h2>
          <p className="text-red-400 text-sm italic">Theme: Hidden diagnosis</p>
        </motion.div>

        {/* Patient form */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 text-gray-900 p-8 rounded-lg shadow-2xl border-4 border-yellow-200"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b-2 border-gray-400 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-red-700" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    PATIENT ADMISSION FORM
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Form ID: A-2847</p>
                  <p className="text-xs text-red-700 font-bold">CONFIDENTIAL</p>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 uppercase text-xs">Patient Name:</p>
                <p className="font-bold text-lg border-b border-gray-400 pb-1">{username}</p>
              </div>
              <div>
                <p className="text-gray-600 uppercase text-xs">Admission Date:</p>
                <p className="font-bold border-b border-gray-400 pb-1">01/18/2026</p>
              </div>
              <div>
                <p className="text-gray-600 uppercase text-xs">Patient ID:</p>
                <p className="font-bold border-b border-gray-400 pb-1">P-{Math.floor(Math.random() * 9000) + 1000}</p>
              </div>
              <div>
                <p className="text-gray-600 uppercase text-xs">Ward:</p>
                <p className="font-bold border-b border-gray-400 pb-1">Isolation Block C</p>
              </div>
            </div>

            {/* Diagnoses Section */}
            <div className="border-t-2 border-gray-300 pt-4">
              <p className="text-gray-700 uppercase text-xs font-bold mb-3">
                ⚠ Preliminary Diagnoses:
              </p>
              <div className="space-y-2 bg-red-50 p-4 rounded border-l-4 border-red-600">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-red-700 font-bold">✓</span>
                  <p>Vertigo - severe disorientation</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-red-700 font-bold">✓</span>
                  <p>Obsession - repetitive thoughts</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-red-700 font-bold">✓</span>
                  <p>Insomnia - complete sleep deprivation</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-red-700 font-bold">✓</span>
                  <p>Delusion - detachment from reality</p>
                </motion.div>
              </div>
            </div>

            {/* Doctor's note */}
            <motion.div
              initial={{ opacity: 0, rotateX: -20 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 2.5 }}
              className="bg-yellow-100 p-4 rounded border-2 border-yellow-600 italic"
              style={{ fontFamily: 'cursive' }}
            >
              <p className="text-xs text-yellow-800 uppercase mb-1">Dr. Marsh - Notes:</p>
              <p className="text-sm text-gray-800">
                "The patient's condition is critical. When asked what they truly suffer from, 
                they could not speak it aloud. The answer exists only in the moments 
                of each symptom."
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-center bg-gray-800/50 border border-gray-700 p-6 rounded-lg"
        >
          <p className="text-xl text-gray-300 mb-2">
            What is your <span className="text-red-500 font-bold">TRUE CONDITION</span>?
          </p>
          <p className="text-sm text-gray-500 italic">
            (The one that contains all the others)
          </p>
        </motion.div>

        {/* Error messages */}
        {wrongAttempts > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-2"
          >
            <p className="text-red-500 text-xl font-bold">
              ✗ The doctor shakes their head.
            </p>
            {wrongAttempts >= 2 && (
              <p className="text-gray-400 text-sm italic">
                Look at the <span className="text-white">first</span> letter of each diagnosis...<br/>
                What word do they spell together?
              </p>
            )}
          </motion.div>
        )}

        {/* Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter your true condition..."
            className="bg-gray-900 border-gray-700 text-white text-center text-xl h-14 uppercase"
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white h-12"
          >
            Submit Diagnosis
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}