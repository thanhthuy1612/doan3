import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../Popper';
import MenuItem from './MenuItem';
import HeaderMenu from './Header';
import { useState } from 'react';

const defaultFn = () => {};

export default function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const handleBack = () => {
        setHistory((pre) => pre.slice(0, pre.length - 1));
    };

    const renderItems = () => {
        return current.data.map((item, index) => (
            <MenuItem
                key={index}
                data={item}
                onClick={() => {
                    !!item.children ? setHistory((pre) => [...pre, item.children]) : onChange();
                }}
            />
        ));
    };
    return (
        <Tippy
            interactive
            delay={[0, 500]}
            render={(attrs) => (
                <div className={styles.content} tabIndex="-1" {...attrs}>
                    <PopperWrapper className="menu">
                        {history.length > 1 && <HeaderMenu title={current.title} onBack={handleBack} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((pre) => pre.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}
