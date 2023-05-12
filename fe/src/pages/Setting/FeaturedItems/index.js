import Post from '~/pages/Account/Post';
import styles from './FeaturedItems.module.scss';
export default function FeaturedItems() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Featured items</h1>
            <p>List items in your wallet from being bought, sold.</p>
            <Post />
        </div>
    );
}
