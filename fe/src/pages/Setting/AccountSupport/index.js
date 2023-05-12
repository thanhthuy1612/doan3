import styles from './AccountSupport.module.scss';
import ListItem from './ListItem';
export default function AccountSupport() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Account support</h1>
            <div className={styles.content}>If you need help related to your account, we can help you.</div>
            <ListItem />
        </div>
    );
}
