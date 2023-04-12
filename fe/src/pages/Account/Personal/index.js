import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Post from '../Post';
import styles from './Personal.module.scss';
import Form from '../Form';
export default function Personal() {
    const [collapse, setCollapse] = useState(false);
    const handleCreate = () => {
        setCollapse(!collapse);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.post}>
                <p className={styles.title}>Your writing</p>
                <FontAwesomeIcon
                    onClick={handleCreate}
                    className={styles.create}
                    icon={collapse ? faMinusCircle : faPlusCircle}
                />
            </div>
            {collapse ? <Form /> : <></>}
            <Post />
        </div>
    );
}
