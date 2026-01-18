import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';

interface Room4Props {
  onComplete: (answer: string) => void;
}

export function Room4({ onComplete }: Room4Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [movingBag, setMovingBag] = useState(false);

  useEffect(() => {
    // Make the last bag move periodically
    const interval = setInterval(() => {
      setMovingBag(true);
      setTimeout(() => setMovingBag(false), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (num: number) => {
    setSelectedAnswer(num);
    if (num === 7) {
      setTimeout(() => onComplete('7'), 1000);
    } else {
      setWrongAttempts(prev => prev + 1);
      setTimeout(() => setSelectedAnswer(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/10 to-black flex items-center justify-center p-4">
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
          <p className="text-gray-500 text-sm uppercase tracking-widest">Room 4</p>
          <h2 className="text-4xl font-bold text-white">🪦 THE COUNTING CORPSES</h2>
          <p className="text-red-400 text-sm italic">Theme: Visual trauma & misdirection</p>
        </motion.div>

        {/* Sign */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-950/30 border-2 border-red-900 p-6 rounded text-center"
        >
          <p className="text-red-400 text-2xl font-bold tracking-wider">
            "COUNT THE DEAD."
          </p>
        </motion.div>

        {/* Hallway with body bags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg min-h-[300px] flex items-center justify-center"
        >
          <div className="grid grid-cols-4 gap-6 w-full max-w-3xl">
            {[...Array(7)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: index === 6 && movingBag ? [-2, 2, -2, 2, 0] : 0 
                }}
                transition={{ 
                  delay: 1.5 + index * 0.2,
                  y: { duration: 0.5 }
                }}
                className={`relative ${index === 6 ? 'col-span-4 flex justify-center' : ''}`}
              >
                <div className="w-32 h-48 bg-gray-800 border-2 border-gray-700 rounded-lg relative overflow-hidden shadow-2xl">
                  {/* Body bag zipper */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gray-600" />
                  
                  {/* Tag */}
                  <div className="absolute top-4 right-2 bg-yellow-200 text-black text-xs px-2 py-1 rounded">
                    #{index + 1}
                  </div>

                  {/* Movement indicator for last bag */}
                  {index === 6 && movingBag && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      className="absolute inset-0 bg-red-900/30 flex items-center justify-center"
                    >
                      <span className="text-red-400 text-2xl font-bold">!</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="space-y-4"
        >
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gray-800/30 border border-gray-700 p-4 rounded text-center"
          >
            <p className="text-gray-400 italic">
              "The living do not count."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="bg-red-950/20 border border-red-900/50 p-4 rounded text-center"
          >
            <p className="text-red-400 italic">
              "The dead do not lie."
            </p>
          </motion.div>
        </motion.div>

        {/* Error message */}
        {wrongAttempts > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-red-500 text-xl font-bold">
              ✗ The corpses reject your count.
            </p>
            {wrongAttempts >= 2 && (
              <p className="text-gray-400 text-sm italic mt-2">
                One bag moves. But does movement mean life?<br/>
                The dead do not lie... even when they seem to move.
              </p>
            )}
          </motion.div>
        )}

        {/* Answer buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="flex justify-center gap-6"
        >
          {[6, 7].map((num) => (
            <Button
              key={num}
              onClick={() => handleSubmit(num)}
              disabled={selectedAnswer !== null}
              className={`w-32 h-16 text-3xl font-bold rounded-lg transition-all ${
                selectedAnswer === num
                  ? num === 7
                    ? 'bg-green-700 text-white'
                    : 'bg-red-700 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-white hover:scale-105'
              }`}
            >
              {num}
            </Button>
          ))}
        </motion.div>

        <p className="text-gray-500 text-center text-sm italic">
          How many are dead?
        </p>
      </motion.div>
    </div>
  );
}
