import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface Room3Props {
  onComplete: (answer: string) => void;
}

export function Room3({ onComplete }: Room3Props) {
  const [answer, setAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const names = ['ANNA', 'BETH', 'CLARA', 'DANIEL'];

  const handleSubmit = () => {
    const normalized = answer.trim().toUpperCase();
    if (normalized === 'SILENCE') {
      onComplete(normalized);
    } else {
      setWrongAttempts(prev => prev + 1);
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl w-full space-y-12"
      >
        {/* Room title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-2"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest">Room 3</p>
          <h2 className="text-4xl font-bold text-white">🕯️ THE EMPTY BED</h2>
          <p className="text-red-400 text-sm italic">Theme: Missing memory</p>
        </motion.div>

        {/* Hospital bed */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 border-2 border-gray-700 p-10 rounded-lg space-y-8"
        >
          {/* Patient names */}
          <div className="space-y-3">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              Patient Registry
            </p>
            {names.map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.3 }}
                className="text-2xl font-mono text-gray-300 border-l-4 border-gray-600 pl-4"
              >
                {name}
              </motion.div>
            ))}
            
            {/* Empty line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
              className="text-2xl font-mono text-gray-600 border-l-4 border-red-900 pl-4 h-10 flex items-center"
            >
              _____
            </motion.div>
          </div>

          {/* Nurse's note */}
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 3 }}
            className="bg-yellow-100 text-gray-900 p-6 rounded shadow-lg border-l-8 border-yellow-600"
            style={{ 
              fontFamily: 'cursive',
              transform: 'rotate(-1deg)'
            }}
          >
            <p className="text-sm uppercase tracking-wider text-yellow-800 mb-2">
              Nurse's Note
            </p>
            <p className="text-lg italic">
              "One never woke up.
            </p>
            <p className="text-lg italic">
              One was never written."
            </p>
          </motion.div>
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 4 }}
          className="text-center text-gray-500 text-sm italic"
        >
          The missing name isn't a real name.<br/>
          It's about what was never written.
        </motion.div>

        {/* Error message */}
        {wrongAttempts > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-red-500 text-xl font-bold">
              ✗ That name was written. Think deeper.
            </p>
            {wrongAttempts >= 2 && (
              <p className="text-gray-400 text-sm italic mt-2">
                What fills the space when nothing is written?<br/>
                What is the sound of a name never spoken?
              </p>
            )}
          </motion.div>
        )}

        {/* Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <p className="text-gray-400 text-center text-sm">
            What is the missing name?
          </p>
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter the fifth name..."
            className="bg-gray-900 border-gray-700 text-white text-center text-xl h-14 uppercase"
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white h-12"
          >
            Submit Answer
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
