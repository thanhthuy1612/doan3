import styles from './Header.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from './Popper';
import SearchList from './SearchList';
import { Account } from '~/constants/Account';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '~/redux';
import { checkAccount } from '~/api/account';
import { ethers } from 'ethers';
import { getToken } from '~/api/login';
import MenuAccount from './MenuAccount';

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

    const reconnect = async ({ provider }) => {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        if (walletAddress !== undefined) {
            const address = await signer.getAddress();
            const result = await checkAccount(address);
            dispatch(setAccount(result[0]));
        } else {
            const sign = await signer.signMessage('Login');
            const result = await getToken(sign);
            dispatch(setAccount(result));
        }
    };
    const connect = async () => {
        try {
            let provider = window.ethereum;
            await provider.request({
                method: 'eth_requestAccounts',
            });
            provider.on('chainChanged', async function () {
                await reconnect({ provider });
            });
            provider.on('accountsChanged', async function () {
                await reconnect({ provider });
            });
            await reconnect({ provider });
        } catch (err) {
            console.log(err);
        }
    };
    console.log(walletAddress);

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
                        <div className={styles.walletButton} onClick={connect}>
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
