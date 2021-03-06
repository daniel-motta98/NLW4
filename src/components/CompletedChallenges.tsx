import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenge() {
    const { challengesCompleted } = useContext(ChallengesContext);
    return(
        <div className={styles.containerCompletedChallenges}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}