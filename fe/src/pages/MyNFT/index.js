import { useDispatch, useSelector } from 'react-redux';
import styles from './MyNFT.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faClock, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAccount } from '~/api/account';
import { MyAccount } from '~/constants/MyAccount';
import { resellToken } from '~/redux';

export default function MyNFT() {
    const [seller, setSeller] = useState();
    const [resell, setResell] = useState();
    const item = useSelector((state) => state.account.item);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/');
    };
    useEffect(() => {
        const fetch = async () => {
            const result = await checkAccount(item.seller);
            setSeller(result[0]);
        };
        fetch();
    }, []);
    const handleClick = () => {
        navigate(`/account/seller/${seller._id}`);
    };
    const handleBuy = () => {
        dispatch(resellToken({ ...item, price: resell || item.price }));
        navigate('/');
    };
    const handleChange = (e) => {
        setResell(e.target.value);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.back}>
                <FontAwesomeIcon onClick={handleBack} className={styles.icon} icon={faArrowAltCircleLeft} />
                <p className={styles.text}>Go Back Home</p>
            </div>
            <div className={styles.body}>
                <img className={styles.imgMeta} src={item?.meta?.img} alt="img" />
                <div className={styles.meta}>
                    <div className={styles.metaHeader}>
                        <div className={styles.metaTitle}>{item?.meta?.title}</div>
                        <div className={styles.metaSeller}>
                            <p className={styles.seller}>Seller: </p>
                            <p className={styles.link} onClick={handleClick}>
                                {seller?.username || MyAccount.username}
                            </p>
                        </div>
                    </div>
                    <div className={styles.time}>
                        <div className={styles.clock}>
                            <FontAwesomeIcon className={styles.clockItem} icon={faClock} />
                            <p className={styles.textTime}>{item?.meta.time}</p>
                        </div>
                        <div className={styles.price}>
                            <p className={styles.priceTitle}>Price: </p>
                            <p className={styles.priceText}>{item?.price} ETH</p>
                            <p className={styles.priceTitle}>Resell price:</p>
                            <input className={styles.input} onChange={handleChange} />
                        </div>
                        <div className={styles.button}>
                            <button className={styles.buttonBuy} onClick={handleBuy}>
                                RESELL
                            </button>
                            <FontAwesomeIcon className={styles.buttonIcon} icon={faShoppingCart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
