import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Slide.module.scss';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Slide({ image, imgAccount, title, items, price }) {
    return (
        <div className={styles.wrapper}>
            <img className={styles.img} src={image} style={{ width: '100%' }} alt="img" />
            <div className={styles.gradient}></div>
            <div className={styles.account}>
                <img className={styles.accountImg} src={imgAccount} alt="accountImg" />
                <div className={styles.accountTitle}>
                    <span className={styles.accountTitleText}>{title}</span>
                    <FontAwesomeIcon className={styles.accountIcon} icon={faCheck} />
                </div>
                <div className={styles.accountItem}>
                    <span className={styles.accountItemSpan}>{items}</span>
                    <span className={styles.accountItemSpan}>-</span>
                    <span className={styles.accountItemSpan}>{price}</span>
                </div>
            </div>
        </div>
    );
}
