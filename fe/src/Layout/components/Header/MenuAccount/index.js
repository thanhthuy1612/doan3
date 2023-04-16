import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../Popper/Menu';
import styles from './MenuAccount.module.scss';
import { faEarthAsia, faEye, faGear, faHeart, faMoon, faPen, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function MenuAccount({ walletAddress }) {
    const navigate = useNavigate();
    var menu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Profile',
            to: `/account/${walletAddress?._id}`,
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

    const handTest = () => {
        navigate(`/account/${walletAddress?._id}`);
    };
    const handleChangeMenu = async () => {};

    return (
        <Menu items={menu} onChange={handleChangeMenu}>
            <button className={styles.buttonUser} onClick={handTest}>
                <FontAwesomeIcon className={styles.iconUser} icon={faUser} />
            </button>
        </Menu>
    );
}
