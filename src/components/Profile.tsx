import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src='https://github.com/daniel-motta98.png' alt='Daniel Motta' />
            <div>
                <strong>Daniel Motta</strong>
                <p> 
                   <img src='icons/level.svg' alt='Level' />
                    Level 1
                </p>
            </div>
        </div>
    );
}