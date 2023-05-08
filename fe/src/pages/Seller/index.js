import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Seller.module.scss';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { MyAccount } from '~/constants/MyAccount';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccount } from '~/api/account';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketItem, setItem } from '~/redux';
import ButtonCategory from '../Home/ButtonCategory';

export default function Seller() {
    const defaultAccount = MyAccount;
    const params = useParams();
    const [seller, setSeller] = useState();
    const dispatch = useDispatch();
    let items = useSelector((state) => state.account.items);
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            const result = await getAccount(params.id);
            setSeller(result);
            dispatch(fetchMarketItem());
        };
        fetch();
    }, []);
    const handleClick = (item) => {
        dispatch(setItem(item));
        navigate(`/item/${item.tokenId}`);
    };
    const handleShare = async () => {
        await navigator.clipboard.writeText('http://localhost:3000/account/seller/' + params.id);
    };
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
                    <Tippy
                        interactive
                        render={(attrs) => (
                            <div className={styles.content} tabIndex="-1" {...attrs}>
                                Share
                            </div>
                        )}
                    >
                        <button className={styles.buttonIcon} onClick={handleShare}>
                            <FontAwesomeIcon className={styles.icon} icon={faShare} />
                        </button>
                    </Tippy>
                </div>
            </div>
            <div className={styles.body}>
                {items
                    .filter((x) => x?.seller === seller?.wallet)
                    .map((item, index) => (
                        <ButtonCategory
                            onClick={() => {
                                handleClick(item);
                            }}
                            key={index}
                            item={item}
                        />
                    ))}
            </div>
        </div>
    );
}
