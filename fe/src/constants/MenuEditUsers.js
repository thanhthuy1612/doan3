import { faMoneyBill, faRing, faShield, faTable, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MenuEditUser = {
    title: 'SETTINGS',
    data: [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Profile',
            to: '/account/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faTable} />,
            title: 'Featured items',
        },
        {
            icon: <FontAwesomeIcon icon={faRing} />,
            title: 'Notifications',
        },
        {
            icon: <FontAwesomeIcon icon={faTag} />,
            title: 'Offers',
        },
        {
            icon: <FontAwesomeIcon icon={faShield} />,
            title: 'Account support',
        },
        {
            icon: <FontAwesomeIcon icon={faMoneyBill} />,
            title: 'Earnings',
        },
    ],
};
