import styles from './Loading.module.scss';
export default function Loading({ type = 'medium' }) {
    let classes = `${styles.ldsRing}`;
    switch (type) {
        case 'small':
            classes = classes.concat(' ', `${styles.small}`);
            break;
        case 'big':
            classes = classes.concat(' ', `${styles.big}`);
            break;
        default:
            break;
    }
    return (
        <div className={classes}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
