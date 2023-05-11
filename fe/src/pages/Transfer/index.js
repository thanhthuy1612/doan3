import styles from './Transfer.module.scss';
import Tab from './Tabs';

export default function Transfer() {
    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Transaction History</p>
            <Tab />
        </div>
    );
}
