import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Pill, AlertTriangle } from 'lucide-react';

interface Room2Props {
  onComplete: (answer: string) => void;
}

export function Room2({ onComplete }: Room2Props) {
  const [answer, setAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const handleSubmit = () => {
    const normalized = answer.trim().toUpperCase();
    // The answer is "EIGHT" 
    // Players must count the TOTAL pills across all bottles: 3+2+1+2 = 8
    // Then realize the question asks for the word, not the number
    if (normalized === 'EIGHT') {
      onComplete(normalized);
    } else {
      setWrongAttempts(prev => prev + 1);
      setAnswer('');
    }
  };

  const medications = [
    { 
      name: 'Somnitol',
      dosage: '50mg',
      time: '22:00',
      frequency: 'Nightly',
      bottleNum: 'B-447',
      pillsRemaining: 3,
      color: 'bg-blue-500',
      instruction: 'Take before sleep'
    },
    { 
      name: 'Calmara',
      dosage: '25mg',
      time: '08:00',
      frequency: 'Morning',
      bottleNum: 'B-192',
      pillsRemaining: 2,
      color: 'bg-green-500',
      instruction: 'Take with food'
    },
    { 
      name: 'Nocturne',
      dosage: '100mg',
      time: '14:00',
      frequency: 'Afternoon',
      bottleNum: 'B-883',
      pillsRemaining: 1,
      color: 'bg-purple-500',
      instruction: 'May cause drowsiness'
    },
    { 
      name: 'Serenex',
      dosage: '75mg',
      time: '18:00',
      frequency: 'Evening',
      bottleNum: 'B-256',
      pillsRemaining: 2,
      color: 'bg-yellow-500',
      instruction: 'Do not crush'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl w-full space-y-8"
      >
        {/* Room title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-2"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest">Room 2</p>
          <h2 className="text-4xl font-bold text-white">💊 THE MEDICINE CABINET</h2>
          <p className="text-red-400 text-sm italic">Theme: Count what remains</p>
        </motion.div>

        {/* Warning Sign */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-red-950/30 border-2 border-red-800 p-4 rounded-lg flex items-center gap-3"
        >
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div className="text-sm text-red-300">
            <span className="font-bold">CRITICAL:</span> Patient must finish ALL remaining medication before discharge.
            Failure to complete regimen may result in <span className="text-red-500 font-bold">permanent containment</span>.
          </div>
        </motion.div>

        {/* Medication Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medications.map((med, index) => (
            <motion.div
              key={med.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="bg-white text-gray-900 p-6 rounded-lg shadow-xl border-2 border-gray-300"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-gray-300 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{med.name}</h3>
                    <p className="text-sm text-gray-600">{med.bottleNum}</p>
                  </div>
                  <div className={`w-12 h-12 ${med.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs uppercase">Dosage</p>
                    <p className="font-bold text-lg">{med.dosage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase">Time</p>
                    <p className="font-bold text-lg font-mono">{med.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase">Frequency</p>
                    <p className="font-semibold">{med.frequency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase">Remaining</p>
                    <p className="font-bold text-lg text-red-600">{med.pillsRemaining} pills</p>
                  </div>
                </div>

                {/* Instruction */}
                <div className="bg-gray-100 p-2 rounded text-xs italic text-gray-700">
                  {med.instruction}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Doctor's Orders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="bg-yellow-50 text-gray-900 p-6 rounded-lg border-l-8 border-yellow-600 shadow-lg"
          style={{ fontFamily: 'cursive' }}
        >
          <p className="text-xs text-yellow-800 uppercase font-bold mb-2">Dr. Marsh - Final Orders:</p>
          <p className="text-sm italic mb-3">
            "Patient shows signs of counting obsession. Before discharge, they must prove their mind is sound 
            by answering correctly."
          </p>
          <p className="text-base font-bold text-gray-800 bg-yellow-100 p-3 rounded border-2 border-yellow-600">
            "How many pills must you take to leave this place?"
          </p>
          <p className="text-xs text-gray-600 mt-2 italic">
            * Answer must be written as a word, not a number. Numbers are symptoms of madness.
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
              ✗ The medicine rejects you.
            </p>
            {wrongAttempts >= 2 && (
              <p className="text-gray-400 text-sm italic">
                Count the pills remaining in ALL bottles...<br/>
                The doctor wants the answer as a WORD, not a number.
              </p>
            )}
            {wrongAttempts >= 3 && (
              <p className="text-gray-500 text-xs mt-2">
                (Hint: 3 + 2 + 1 + 2 = ?)
              </p>
            )}
          </motion.div>
        )}

        {/* Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="space-y-4 max-w-md mx-auto"
        >
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Write your answer as a word..."
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
