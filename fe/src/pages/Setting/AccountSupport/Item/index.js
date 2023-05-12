import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Item.module.scss';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
export default function Item({ title, describe, handleClick, open }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title} onClick={handleClick}>
                <h2>{title}</h2>
                <FontAwesomeIcon icon={open ? faChevronCircleUp : faChevronCircleDown} />
            </div>
            <div className={!open ? styles.describe : styles.disable}>{describe}</div>
        </div>
    );
}
