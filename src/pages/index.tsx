import Head from 'next/head';
import { GetServerSideProps} from 'next';

import { CompletedChallenge } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';  
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengesContext';

interface HomePages {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: HomePages) {
  
  return (
    <ChallengeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengesCompleted} >
      <div className={styles.container}>
        <Head>
          <title>Início | Moveit</title>
        </Head>
      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenge />
            <Countdown />
          </div>

          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
      </div>
      </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}