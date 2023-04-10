import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Menu.module.scss';

export default function HeaderMenu({ title, onBack }) {
    return (
        <header className={styles.header}>
            <button className={styles.backBtn} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <h3 className={styles.title}>{title}</h3>
            </button>
        </header>
    );
}
