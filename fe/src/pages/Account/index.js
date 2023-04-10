import { faPen, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { MyAccount } from '~/constants/MyAccount';
import styles from './Account.module.scss';
import { useSelector } from 'react-redux';

export default function Account() {
    const accounts = useSelector((state) => state.account.walletAddress);
    console.log(accounts);
    const navigate = useNavigate();
    const handleClickEdit = () => {
        navigate('/account/profile');
    };
    const account = MyAccount;
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img className={styles.banner} src={images.default} alt="banner" />
                <img className={styles.ava} src={images.default} alt="ava" />
            </div>
            <div className={styles.inner}>
                <div className={styles.profile}>
                    <h1 className={styles.username}>{account.username}</h1>
                    <div className={styles.wallet}>
                        <img className={styles.token} src={account.token} alt="Token" />
                        {accounts}
                    </div>
                </div>
                <div className={styles.listIcon}>
                    <FontAwesomeIcon className={styles.icon} icon={faPen} onClick={handleClickEdit} />
                    <FontAwesomeIcon className={styles.icon} icon={faShare} />
                </div>
            </div>
        </div>
    );
}
