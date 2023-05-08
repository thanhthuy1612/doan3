import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import images from '~/assets/images';
import './Home.css';
import Slide from './Slide';
import Drop from './Drops';
import styles from './Home.module.scss';
import './Home.css';

export default function Home() {
    const items = [
        {
            image: images.slide1,
            imgAccount: images.ava6,
            title: 'GNSS Art by MGXS',
            items: '8k Items',
            price: '5 ETH',
        },
        {
            image: images.slide3,
            imgAccount: images.ava4,
            title: 'Fragments of an Infinite Field',
            items: '9k Items',
            price: '7 ETH',
        },
        {
            image: images.slide5,
            imgAccount: images.ava2,
            title: 'Nakamigos',
            items: '10k Items',
            price: '6 ETH',
        },
    ];
    return (
        <div className={styles.wrapper}>
            <div className={styles.slideContainer}>
                <Fade scale={0.4} ssClass={styles.fadeWrapper}>
                    {items.map((item, index) => (
                        <Slide
                            image={item.image}
                            key={index}
                            imgAccount={item.imgAccount}
                            title={item.title}
                            items={item.items}
                            price={item.price}
                        />
                    ))}
                </Fade>
            </div>
            <Drop />
        </div>
    );
}
