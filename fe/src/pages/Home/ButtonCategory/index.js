import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ButtonCategory.module.scss';

export default function ButtonCategory({ item, type = 'buy', ...passProps }) {
    const props = {
        ...passProps,
    };
    return (
        <button className={styles.button} {...props}>
            <img className={styles.buttonImg} src={item.meta.img} alt="images" />
            <div className={styles.title}>
                <div className={styles.titleHeader}>
                    <span className={styles.titleText}>{item.meta.title}</span>
                    <FontAwesomeIcon className={styles.titleIcon} icon={faCheckCircle} />
                </div>
                <div className={styles.content}>
                    <div className={styles.time}>
                        <span className={styles.text}>{type !== 'sell' ? <>START SELLING</> : <>TIME TO BUY</>}</span>
                        <span className={styles.item}>{item.time}</span>
                    </div>
                    <div className={styles.price}>
                        <span className={styles.text}>PRICE</span>
                        <span className={styles.item}>{item.price} BNB</span>
                    </div>
                </div>
            </div>
        </button>
    );
}
