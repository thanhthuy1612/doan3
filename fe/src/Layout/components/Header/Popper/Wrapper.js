import styles from './Popper.module.scss';
export default function Wrapper({ children, className }) {
    let classes = `${styles.wrapper}`;
    switch (className) {
        case 'menu':
            classes = classes.concat(' ', `${styles.menu}`);
            break;
        case 'search':
            classes = classes.concat(' ', `${styles.search}`);
            break;
        default:
            break;
    }
    return <div className={classes}>{children}</div>;
}
