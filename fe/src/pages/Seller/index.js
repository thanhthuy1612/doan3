import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Seller.module.scss';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { MyAccount } from '~/constants/MyAccount';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccount } from '~/api/account';
export default function Seller() {
    const defaultAccount = MyAccount;
    const param = useParams();
    const [seller, setSeller] = useState();
    useEffect(() => {
        const fetch = async () => {
            const result = await getAccount(param.id);
            setSeller(result);
        };
        fetch();
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img
                    className={styles.banner}
                    src={seller?.banner ? require('../../public/' + seller?.banner) : defaultAccount.banner}
                    alt="imageBanner"
                />
                <img
                    className={styles.ava}
                    src={seller?.ava ? require('../../public/' + seller.ava) : defaultAccount.ava}
                    alt="ava"
                />
            </div>
            <div className={styles.inner}>
                <div className={styles.profile}>
                    <h1 className={styles.username}>{seller?.username || defaultAccount.username}</h1>
                    <div className={styles.wallet}>
                        <img className={styles.token} src={defaultAccount.token} alt="Token" />
                        {seller?.wallet || ''}
                    </div>
                </div>
                <div className={styles.listIcon}>
                    <FontAwesomeIcon className={styles.icon} icon={faShare} />
                </div>
            </div>
        </div>
    );
}
