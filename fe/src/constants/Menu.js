import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faEye, faGear, faHeart, faMoon, faPen, faTable, faUser } from '@fortawesome/free-solid-svg-icons';

export const MenuItems = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
        to: '/account',
    },
    {
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: 'Favorite',
    },
    {
        icon: <FontAwesomeIcon icon={faEye} />,
        title: 'Watch List',
    },
    {
        icon: <FontAwesomeIcon icon={faTable} />,
        title: 'My Collection',
    },
    {
        icon: <FontAwesomeIcon icon={faPen} />,
        title: 'Create',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Light Mode',
    },
];
