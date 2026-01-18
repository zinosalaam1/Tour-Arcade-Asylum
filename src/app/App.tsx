import { useState } from 'react';
import { IntroScreen } from '@/app/components/IntroScreen';
import { Room1 } from '@/app/components/Room1';
import { Room2 } from '@/app/components/Room2';
import { Room3 } from '@/app/components/Room3';
import { Room4 } from '@/app/components/Room4';
import { Room5 } from '@/app/components/Room5';
import { Room6 } from '@/app/components/Room6';
import { FinalReveal } from '@/app/components/FinalReveal';

type GameState = 'intro' | 'room1' | 'room2' | 'room3' | 'room4' | 'room5' | 'room6' | 'ending';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [username, setUsername] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStart = (name: string) => {
    setUsername(name);
    setGameState('room1');
  };

  const handleRoom1Complete = (answer: string) => {
    setAnswers([answer]);
    setGameState('room2');
  };

  const handleRoom2Complete = (answer: string) => {
    setAnswers(prev => [...prev, answer]);
    setGameState('room3');
  };

  const handleRoom3Complete = (answer: string) => {
    setAnswers(prev => [...prev, answer]);
    setGameState('room4');
  };

  const handleRoom4Complete = (answer: string) => {
    setAnswers(prev => [...prev, answer]);
    setGameState('room5');
  };

  const handleRoom5Complete = (answer: string) => {
    setAnswers(prev => [...prev, answer]);
    setGameState('room6');
  };

  const handleRoom6Complete = (answer: string) => {
    setAnswers(prev => [...prev, answer]);
    setGameState('ending');
  };

  const handleRestart = () => {
    setGameState('intro');
    setUsername('');
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {gameState === 'intro' && <IntroScreen onStart={handleStart} />}
      {gameState === 'room1' && <Room1 onComplete={handleRoom1Complete} username={username} />}
      {gameState === 'room2' && <Room2 onComplete={handleRoom2Complete} />}
      {gameState === 'room3' && <Room3 onComplete={handleRoom3Complete} />}
      {gameState === 'room4' && <Room4 onComplete={handleRoom4Complete} />}
      {gameState === 'room5' && <Room5 onComplete={handleRoom5Complete} />}
      {gameState === 'room6' && <Room6 onComplete={handleRoom6Complete} answers={answers} />}
      {gameState === 'ending' && <FinalReveal username={username} onRestart={handleRestart} />}
    </div>
  );
}
