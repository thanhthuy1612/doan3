import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ButtonCategory.module.scss';

export default function ButtonCategory({ title, img, item, price, ...passProps }) {
    const props = {
        ...passProps,
    };
    return (
        <button className={styles.button} {...props}>
            <img className={styles.buttonImg} src={img} alt="images" />
            <div className={styles.title}>
                <div className={styles.titleHeader}>
                    <span className={styles.titleText}>{title}</span>
                    <FontAwesomeIcon className={styles.titleIcon} icon={faCheckCircle} />
                </div>
                <div className={styles.content}>
                    <div className={styles.time}>
                        <span className={styles.text}>STARTS</span>
                        <span className={styles.item}>{item}</span>
                    </div>
                    <div className={styles.price}>
                        <span className={styles.text}>PRICE</span>
                        <span className={styles.item}>{price}</span>
                    </div>
                </div>
            </div>
        </button>
    );
}
