import styles from './Header.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from './Popper';
import SearchList from './SearchList';
import { Account } from '~/constants/Account';
import Menu from './Popper/Menu';
import { MenuItems } from '~/constants/Menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '~/redux';
import { checkAccount } from '~/api/account';
import { ethers } from 'ethers';

export default function Header() {
    const [state, _setState] = useState({});
    const walletAddress = useSelector((state) => state.account.info);
    const setState = (data = {}) => {
        _setState((prevState) => ({ ...prevState, ...data }));
    };
    const searchRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    const handleChangeMenu = async () => {};
    const handleChange = (e) => {
        setState({ input: e.target.value });
    };
    const test = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const sign = await signer.signMessage('123');
        console.log(sign);
        const verify = ethers.utils.verifyMessage('123', sign);
        console.log(verify);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentConnectWallet();
            addWalletListener();
        }, 50000);
        return () => clearInterval(interval);
    }, []);

    const fetchCheckAccount = async (account) => {
        const result = await checkAccount(account);
        dispatch(setAccount(result[0]));
    };
    const connectMetamask = async () => {
        if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                test();
                fetchCheckAccount(accounts[0]);
            } catch (err) {
                console.error(err.message);
            }
        } else {
            alert('Please install Metamask');
        }
    };

    const getCurrentConnectWallet = async () => {
        if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    fetchCheckAccount(accounts[0]);
                } else {
                    console.log('Connect to Metamask using the Connect button');
                }
            } catch (err) {
                console.error(err.message);
            }
        } else {
            alert('Please install Metamask');
        }
    };
    const addWalletListener = async () => {
        if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
            await window.ethereum.on('accountsChanged', (accounts) => {
                fetchCheckAccount(accounts[0]);
            });
        } else {
            setState({ account: '', showMenu: false });
            alert('Please install Metamask');
        }
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
                    <div className={styles.wallet} onClick={connectMetamask}>
                        <div className={styles.walletButton}>
                            <FontAwesomeIcon className={styles.iconWallet} icon={faWallet} />
                            {walletAddress.wallet ? (
                                <div className={styles.text}>
                                    {walletAddress.wallet.substring(0, 6)}...{walletAddress.wallet.substring(38)}
                                </div>
                            ) : (
                                <div className={styles.text}>Connect wallet</div>
                            )}
                        </div>
                        {walletAddress.wallet ? (
                            <Menu items={MenuItems} onChange={handleChangeMenu}>
                                <button className={styles.buttonUser}>
                                    <FontAwesomeIcon className={styles.iconUser} icon={faUser} />
                                </button>
                            </Menu>
                        ) : (
                            <button className={styles.buttonUser}>
                                <FontAwesomeIcon className={styles.iconUser} icon={faUser} />
                            </button>
                        )}
                    </div>
                    <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
                </div>
            </div>
        </header>
    );
}
