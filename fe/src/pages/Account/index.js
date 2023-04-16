import { faPen, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { MyAccount } from '~/constants/MyAccount';
import styles from './Account.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Personal from './Personal';
import { setAccount } from '~/redux';
import { getAccount } from '~/api/account';

export default function Account() {
    const defaultAccount = MyAccount;
    const params = useParams();
    const walletAddress = useSelector((state) => state.account.info);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickEdit = () => {
        navigate(`/account/profile/${params.id}`);
    };
    const fetch = async () => {
        const result = await getAccount(params.id);
        dispatch(setAccount(result));
    };

    useEffect(() => {
        fetch();
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img className={styles.banner} src={walletAddress?.banner || defaultAccount.banner} alt="imageBanner" />
                <img className={styles.ava} src={walletAddress?.ava || defaultAccount.ava} alt="ava" />
            </div>
            <div className={styles.inner}>
                <div className={styles.profile}>
                    <h1 className={styles.username}>{walletAddress?.username || defaultAccount.username}</h1>
                    <div className={styles.wallet}>
                        <img className={styles.token} src={defaultAccount.token} alt="Token" />
                        {walletAddress?.wallet || ''}
                    </div>
                </div>
                <div className={styles.listIcon}>
                    <FontAwesomeIcon className={styles.icon} icon={faPen} onClick={handleClickEdit} />
                    <FontAwesomeIcon className={styles.icon} icon={faShare} />
                </div>
            </div>
            <Personal />
        </div>
    );
}
