import Post from '../Account/Post';
import styles from './Collection.module.scss';
export default function Collection() {
    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>My Collection</p>
            <Post />
        </div>
    );
}
