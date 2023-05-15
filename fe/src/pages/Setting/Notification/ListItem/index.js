import Item from '../Item';
import styles from './ListItem.module.scss';
export default function ListItem() {
    const items = [
        {
            title: 'Item Sold',
            describe: 'When someone purchased one of your items',
        },
        {
            title: 'Bid Activity',
            describe: 'When someone bids on one of your items',
        },
        {
            title: 'Price Change',
            describe: 'When an item you made an offer on changes in price',
        },
        {
            title: 'Auction Expiration',
            describe: 'When a timed auction you created ends',
        },
        {
            title: 'Outbid',
            describe: 'When an offer you placed is exceeded by another user',
        },
        {
            title: 'Owned Item Updates',
            describe: 'When a significant update occurs for one of the items you have purchased on OpenSea',
        },
        {
            title: 'Successful Purchase',
            describe: 'When you successfully buy an item',
        },
    ];
    return (
        <div className={styles.wrapper}>
            {items.map((item, index) => (
                <Item key={index} title={item.title} describe={item.describe}></Item>
            ))}
        </div>
    );
}
