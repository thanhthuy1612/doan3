import styles from './Sidebar.module.scss';
import MenuItem from '../Header/Popper/Menu/MenuItem';
import { useState } from 'react';

export default function Sidebar({ title, items }) {
    const [state, _setState] = useState({
        choose: 0,
    });
    const setState = (data = {}) => {
        _setState((prevState) => ({ ...prevState, ...data }));
    };
    const handleClick = (e) => {
        setState({ choose: e });
    };
    return (
        <aside className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            {items.map((item, index) => (
                <button className={styles.menu} onClick={() => handleClick(index)}>
                    <MenuItem data={item} key={index} choose={state.choose === index} />
                </button>
            ))}
        </aside>
    );
}
