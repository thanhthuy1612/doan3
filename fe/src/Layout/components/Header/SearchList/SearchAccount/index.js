import styles from './SearchAccount.module.scss';
export default function SearchAccount({ text, content, ava, icon }) {
    return (
        <div className={styles.wrapper}>
            <img className={styles.avatar} src={ava} alt="" />
            <div className={styles.info}>
                <p className={styles.name}>
                    <h4>{text}</h4>
                </p>
                <div className={styles.description}>
                    {icon && <img className={styles.icon} src={icon} alt="" />}
                    {content && <span className={styles.username}>{content}</span>}
                </div>
            </div>
        </div>
    );
}
