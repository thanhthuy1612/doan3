import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './EditLayout.module.scss';
import { faMoneyBill, faRing, faShield, faTable, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function EditLayout({ children }) {
    const walletAddress = useSelector((state) => state.account.info);
    const menu = {
        title: 'SETTINGS',
        data: [
            {
                icon: <FontAwesomeIcon icon={faUser} />,
                title: 'Profile',
                to: `/account/profile/${walletAddress?._id}`,
            },
            {
                icon: <FontAwesomeIcon icon={faTable} />,
                title: 'Featured items',
                to: `/account/featured/${walletAddress?._id}`,
            },
            {
                icon: <FontAwesomeIcon icon={faRing} />,
                title: 'Notifications',
                to: `/account/notification/${walletAddress?._id}`,
            },
            {
                icon: <FontAwesomeIcon icon={faTag} />,
                title: 'Offers',
                to: `/account/offers/${walletAddress?._id}`,
            },
            {
                icon: <FontAwesomeIcon icon={faShield} />,
                title: 'Account support',
                to: `/account/support/${walletAddress?._id}`,
            },
            {
                icon: <FontAwesomeIcon icon={faMoneyBill} />,
                title: 'Earnings',
                to: `/account/earing/${walletAddress?._id}`,
            },
        ],
    };
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <Sidebar title={menu.title} items={menu.data} />
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
