import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
export default function Button({
    to,
    href,
    primary = false,
    outline = false,
    size = 'medium',
    text = false,
    disabled = false,
    rounded = false,
    choose = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    let classes = `${styles.wrapper}`;
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    if (disabled) {
        classes = classes.concat(' ', `${styles.disabled}`);
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (primary) {
        classes = classes.concat(' ', `${styles.primary}`);
    } else if (outline) {
        classes = classes.concat(' ', `${styles.outline}`);
    } else if (text) {
        classes = classes.concat(' ', `${styles.text}`);
    }
    if (rounded) {
        classes = classes.concat(' ', `${styles.rounded}`);
    }
    if (choose) {
        classes = classes.concat(' ', `${styles.choose}`);
    }
    switch (className) {
        case 'textColor':
            classes = classes.concat(' ', `${styles.textColor}`);
            break;
        case 'menu':
            classes = classes.concat(' ', `${styles.menu}`);
            break;
        default:
            break;
    }
    switch (size) {
        case 'small':
            classes = classes.concat(' ', `${styles.small}`);
            break;
        case 'large':
            classes = classes.concat(' ', `${styles.large}`);
            break;
        default:
            break;
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            <span className={styles.title}>{children}</span>
            {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </Comp>
    );
}
