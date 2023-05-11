import { useDispatch, useSelector } from 'react-redux';
import styles from './MyNFT.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faClock, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { resellToken, setLoading } from '~/redux';
import Loading from '~/Layout/components/Loading';

export default function MyNFT() {
    const [resell, setResell] = useState();
    let { item, loading } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        dispatch(setLoading(false));
    }, []);
    const handleBuy = async () => {
        if (!loading) {
            await dispatch(resellToken({ ...item, price: resell || item.price }));
            navigate('/');
        }
    };
    const handleChange = (e) => {
        setResell(e.target.value);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.back}>
                <FontAwesomeIcon onClick={handleBack} className={styles.icon} icon={faArrowAltCircleLeft} />
                <p className={styles.text}>Go Back</p>
            </div>
            <div className={styles.body}>
                <img className={styles.imgMeta} src={item?.meta?.img} alt="img" />
                <div className={styles.meta}>
                    <div className={styles.metaHeader}>
                        <div className={styles.metaTitle}>{item?.meta?.title}</div>
                    </div>
                    <div className={styles.time}>
                        <div className={styles.clock}>
                            <FontAwesomeIcon className={styles.clockItem} icon={faClock} />
                            <p className={styles.textTime}>{item?.time}</p>
                        </div>
                        <div className={styles.price}>
                            <p className={styles.priceTitle}>Price: </p>
                            <p className={styles.priceText}>{item?.price} ETH</p>
                            <p className={styles.priceTitle}>Resell price:</p>
                            <input className={styles.input} onChange={handleChange} />
                        </div>
                        <div className={styles.button}>
                            <button
                                disabled={loading}
                                className={!loading ? styles.buttonBuy : styles.buttonBuyDisable}
                                onClick={handleBuy}
                            >
                                {loading ? <Loading /> : <span>RESELL</span>}
                            </button>
                            <FontAwesomeIcon className={styles.buttonIcon} icon={faShoppingCart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
