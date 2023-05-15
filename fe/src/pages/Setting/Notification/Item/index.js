import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Item.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export default function Item({ title, describe }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon} onClick={handleClick}>
                {open ? (
                    <FontAwesomeIcon icon={faCheckCircle} className={styles.iconButton} />
                ) : (
                    <div className={styles.iconButton}></div>
                )}
            </div>
            <div className={styles.title}>
                <h3>{title}</h3>
                <div className={styles.describe}>{describe}</div>
            </div>
        </div>
    );
}
