import styles from './Header.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from './Popper';
import SearchList from './SearchList';
import { Account } from '~/constants/Account';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuAccount from './MenuAccount';
import { fetchConnect } from '~/redux';

export default function Header() {
    const [state, _setState] = useState({});
    const setState = (data = {}) => {
        _setState((prevState) => ({ ...prevState, ...data }));
    };
    const walletAddress = useSelector((state) => state.account.info);
    const searchRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    const handleChange = (e) => {
        setState({ input: e.target.value });
    };
    const connectWallet = () => {
        dispatch(fetchConnect(walletAddress));
    };

    return (
        <header className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <img src={images.logo} alt="OpenSea" className={styles.logoImage} />
                    <h2 className={styles.logoText} onClick={handleClick}>
                        OpenSea
                    </h2>
                </div>
                <Tippy
                    interactive
                    render={(attrs) => (
                        <div className={styles.searchResult} tabIndex="-1" {...attrs}>
                            <PopperWrapper className="search">
                                {Account.map((data, index) => (
                                    <SearchList key={index} data={data.data} title={data.title} />
                                ))}
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={styles.search}>
                        <button className={styles.searchButton}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input
                            ref={searchRef}
                            value={state.input}
                            onChange={handleChange || ''}
                            placeholder="Search items, collections and accounts"
                            spellCheck={false}
                        />
                    </div>
                </Tippy>
                <div className={styles.listIcon}>
                    <div className={styles.wallet}>
                        <div className={styles.walletButton} onClick={connectWallet}>
                            <FontAwesomeIcon className={styles.iconWallet} icon={faWallet} />
                            {walletAddress?.wallet ? (
                                <div className={styles.text}>
                                    {walletAddress?.wallet?.substring(0, 6)}...
                                    {walletAddress?.wallet?.substring(38)}
                                </div>
                            ) : (
                                <div className={styles.text}>Connect wallet</div>
                            )}
                        </div>
                        <MenuAccount walletAddress={walletAddress} />
                    </div>
                    <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
                </div>
            </div>
        </header>
    );
}
