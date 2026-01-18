import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface Room5Props {
  onComplete: (answer: string) => void;
}

export function Room5({ onComplete }: Room5Props) {
  const [answer, setAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [currentTime, setCurrentTime] = useState('03:33');
  
  const madTimes = ['03:33', '01:11', '02:22', '04:44'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % madTimes.length;
      setCurrentTime(madTimes[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    const normalized = answer.trim();
    if (normalized === '12:34') {
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
          <p className="text-gray-500 text-sm uppercase tracking-widest">Room 5</p>
          <h2 className="text-4xl font-bold text-white">🧠 THE BROKEN CLOCK</h2>
          <p className="text-red-400 text-sm italic">Theme: Time distortion</p>
        </motion.div>

        {/* Clock */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-48 h-48 text-gray-700" />
            </motion.div>
            
            {/* Digital display */}
            <motion.div
              key={currentTime}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-black/80 px-8 py-4 rounded-lg border-2 border-red-900">
                <span className="text-5xl font-mono text-red-500 tabular-nums">
                  {currentTime}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Time list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gray-800/30 border border-gray-700 p-8 rounded-lg"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4 text-center">
            Observed Times
          </p>
          <div className="grid grid-cols-2 gap-4">
            {madTimes.map((time, index) => (
              <motion.div
                key={time}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.2 }}
                className={`text-3xl font-mono text-center py-3 rounded ${
                  currentTime === time 
                    ? 'bg-red-900/50 text-red-400' 
                    : 'bg-gray-900/50 text-gray-500'
                }`}
              >
                {time}
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
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gray-800/30 border border-gray-700 p-4 rounded text-center"
          >
            <p className="text-gray-300 text-xl">
              "Madness repeats itself."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="bg-blue-950/20 border border-blue-900/50 p-4 rounded text-center"
          >
            <p className="text-blue-400 text-xl italic">
              "Sanity breaks the pattern."
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
              ✗ Time rejects your answer.
            </p>
            {wrongAttempts >= 2 && (
              <p className="text-gray-400 text-sm italic mt-2">
                All shown times have repeating digits - that's madness.<br/>
                Sanity would be a time that BREAKS the repetition pattern.
              </p>
            )}
          </motion.div>
        )}

        {/* Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <p className="text-gray-400 text-center">
            What time represents sanity?
          </p>
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="00:00"
            className="bg-gray-900 border-gray-700 text-white text-center text-3xl h-16 font-mono tabular-nums"
            maxLength={5}
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
