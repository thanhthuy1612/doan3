import { useState } from 'react';
import Item from '../Item';
import styles from './ListItem.module.scss';
export default function ListItem() {
    const [open, setOpen] = useState();
    const items = [
        {
            title: 'General help',
            describe: (
                <div className={styles.describe}>
                    Visit our{' '}
                    <a href="mailto:thanhthuy16122001@gmail.com?subject=Help&body=Help%20OpenSea">help center</a> to
                    learn how to get started with buying, selling, and creating.
                </div>
            ),
        },
        {
            title: 'Contact OpenSea Support',
            describe: (
                <div className={styles.describe}>
                    Can't find the answers you’re looking for? You can submit a request{' '}
                    <a href="mailto:thanhthuy16122001@gmail.com?subject=Answers&body=Answers%20OpenSea">here</a>.
                </div>
            ),
        },
        {
            title: 'Help with a compromised account',
            describe: (
                <div className={styles.cancel}>
                    <p>
                        If you believe your account has been compromised, let us know and we can lock your account. This
                        will disable items in your wallet from being bought, sold, or transferred using OpenSea.
                    </p>
                    <div className={styles.buttonCancel}>
                        <button>Lock Account</button>
                    </div>
                </div>
            ),
        },
        {
            title: 'Cancel all Ethereum listings and offers',
            describe: (
                <div className={styles.cancel}>
                    <p>Cancel all Ethereum listings and offers</p>
                    <div className={styles.buttonCancel}>
                        <button>Cancel All</button>
                    </div>
                </div>
            ),
        },
    ];
    const onClick = (index) => {
        open === index ? setOpen() : setOpen(index);
    };
    return (
        <div className={styles.wrapper}>
            {items.map((item, index) => (
                <Item
                    key={index}
                    title={item.title}
                    describe={item.describe}
                    open={index === open}
                    handleClick={() => onClick(index)}
                ></Item>
            ))}
        </div>
    );
}
