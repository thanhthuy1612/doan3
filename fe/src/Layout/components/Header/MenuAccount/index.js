import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../Popper/Menu';
import styles from './MenuAccount.module.scss';
import { faEarthAsia, faEye, faGear, faHeart, faMoon, faPen, faTable, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTest } from '~/redux';
import { useNavigate } from 'react-router-dom';

export default function MenuAccount() {
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.account.info);
    const navigate = useNavigate();
    console.log(walletAddress?._id, walletAddress?.wallet, walletAddress);
    const menu = [
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
        //dispatch(fetchTest(test));
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
