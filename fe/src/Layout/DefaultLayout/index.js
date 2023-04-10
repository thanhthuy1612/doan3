import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';

export default function DefaultLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>{children}</div>
        </div>
    );
}
