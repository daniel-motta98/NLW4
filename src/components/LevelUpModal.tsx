import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {

  const { level, cleseLevelUpModal } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{ level }</header>
        <strong>PARABÉNS!</strong>
        <p>Você alcançou um novo level!</p>

        <button
          type='button'
          onClick={cleseLevelUpModal}
        >
          <img src='/icons/close.svg' alt='Fechar modal' />
        </button>
      </div>
      </div>
  );
}