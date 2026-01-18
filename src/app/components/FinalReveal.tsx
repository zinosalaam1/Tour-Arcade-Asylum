import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Skull } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface FinalRevealProps {
  username: string;
  onRestart: () => void;
}

export function FinalReveal({ username, onRestart }: FinalRevealProps) {
  const [showEnding, setShowEnding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowEnding(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Blood drip from top */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '30vh' }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-900/40 to-transparent pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl w-full text-center space-y-12 relative z-10"
      >
        {/* Success message */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="space-y-6"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Skull className="w-32 h-32 text-red-600 mx-auto" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-6xl font-bold text-green-500"
              style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
            >
              YOU ESCAPE...
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="text-5xl font-bold text-red-600"
              style={{ textShadow: '0 0 30px rgba(220, 38, 38, 0.8)' }}
            >
              OR DO YOU?
            </motion.h2>
          </div>
        </motion.div>

        {/* Doors opening */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-4 text-gray-300 text-xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5 }}
          >
            The doors open.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3 }}
          >
            But the whispers follow you.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="text-red-400 italic"
          >
            Because the asylum didn't want answers.
          </motion.p>
        </motion.div>

        {/* Final revelation */}
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4 }}
          className="bg-red-950/30 border-2 border-red-900 p-8 rounded-lg"
        >
          <p className="text-3xl font-bold text-red-500">
            It wanted your fear.
          </p>
        </motion.div>

        {/* Ending text */}
        {showEnding && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-500 italic text-lg"
            >
              Players don't just solve puzzles —<br/>
              They doubt themselves.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-8 space-y-4"
            >
              <p className="text-gray-600 text-sm">
                Thank you for playing, {username}.
              </p>
              <p className="text-gray-700 text-xs italic">
                The asylum will remember you.
              </p>

              <Button
                onClick={onRestart}
                className="mt-8 bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg"
              >
                Play Again
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Ambient whisper effect */}
      <motion.div
        animate={{ 
          opacity: [0, 0.1, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2
        }}
        className="absolute inset-0 bg-red-900/5 pointer-events-none"
      />
    </div>
  );
}