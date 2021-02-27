import { createContext, useState, ReactNode, useEffect } from 'react';
import  Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
  cleseLevelUpModal: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
  level: number
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({
  children,
  ...rest
}: ChallengeProviderProps) {
const [level, setLevel] = useState(rest.level ?? 1);
const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
const [activeChallenge, setActiveChallege] = useState(null);
const [isLevelUpModal, setIsLevelUpModal] = useState(false); 

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

function levelUp() {
  setLevel(level + 1);
  setIsLevelUpModal(true);
}
  
  function cleseLevelUpModal() {
    setIsLevelUpModal(false);
}

function startNewChallenge() {
  const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
  
  setActiveChallege(challenge);

  new Audio('./notification.mp3').play();

  if (Notification.permission === 'granted') {
    new Notification('Novo desafio o/ ', {
      body: `Valendo ${challenge.amount} XP!`
    });
  }
}

function resetChallenge() {
  setActiveChallege(null);
}

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallege(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return(
    <ChallengesContext.Provider 
    value={{ 
      level, 
      currentExperience, 
      challengesCompleted, 
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      cleseLevelUpModal
    }}
      >
      {children}
     {isLevelUpModal &&  <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}