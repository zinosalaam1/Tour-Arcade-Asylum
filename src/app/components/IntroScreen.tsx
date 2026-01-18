import { useState } from 'react';
import { motion } from 'motion/react';
import { Skull } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface IntroScreenProps {
  onStart: (username: string) => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const [username, setUsername] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleStart = () => {
    if (username.trim()) {
      setShowWarning(true);
      setTimeout(() => {
        onStart(username.trim());
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Blood drip effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        {/* Skull icon */}
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="flex justify-center"
        >
          <Skull className="w-20 h-20 text-red-800" />
        </motion.div>

        {/* Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-red-600 text-sm tracking-[0.3em] uppercase"
          >
            🩸 TOUR ARCADE Presents
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 0 20px rgba(220, 38, 38, 0.5)' }}
          >
            THE ASYLUM OF ECHOES
          </motion.h2>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-2 text-gray-400 italic text-lg"
        >
          <p>"You were never meant to leave.</p>
          <p>You were only meant to remember."</p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="space-y-4 text-gray-300 max-w-xl mx-auto"
        >
          <p>You wake up inside an abandoned asylum.</p>
          <p>The halls whisper.</p>
          <p>The rooms change.</p>
          <p>Your own thoughts start to feel… unreliable.</p>
          <p className="text-red-400 font-bold">There are 6 sealed rooms.</p>
          <p className="text-red-400 font-bold">Each one damages your sense of reality.</p>
        </motion.div>

        {/* Username input */}
        {!showWarning ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="space-y-4 max-w-md mx-auto"
          >
            <div className="space-y-2">
              <label className="text-gray-400 text-sm uppercase tracking-wider block">
                Enter your name... if you dare
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Patient Name"
                className="bg-gray-900 border-red-900/50 text-white text-center text-xl h-14 focus:border-red-600 transition-colors"
                maxLength={20}
              />
            </div>
            
            <Button
              onClick={handleStart}
              disabled={!username.trim()}
              className="w-full bg-red-900 hover:bg-red-800 text-white text-lg h-14 uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
            >
              Enter the Asylum
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 text-red-500 text-2xl font-bold"
          >
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              Opening the doors...
            </motion.p>
            <p className="text-gray-400 text-base">
              Welcome, {username}.
            </p>
            <p className="text-gray-500 text-sm italic">
              We've been expecting you.
            </p>
          </motion.div>
        )}

        {/* Bottom warning */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5 }}
          className="text-gray-600 text-xs uppercase tracking-widest"
        >
          ⚠ Not recommended for those with weak minds ⚠
        </motion.p>
      </motion.div>
    </div>
  );
}
