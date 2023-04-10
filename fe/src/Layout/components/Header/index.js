import styles from './Header.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUserEdit, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from './Popper';
import SearchList from './SearchList';
import { Account } from '~/constants/Account';
import Menu from './Popper/Menu';
import { MenuItems } from '~/constants/Menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setWalletAddress } from '~/redux';

export default function Header() {
    const [state, _setState] = useState({});
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
    const connectMetamask = async () => {
        if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                dispatch(setWalletAddress(accounts[0]));
            } catch (err) {
                console.error(err.message);
            }
        } else {
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
                            value={state.input && ''}
                            onChange={handleChange}
                            placeholder="Search items, collections and accounts"
                            spellCheck={false}
                        />
                    </div>
                </Tippy>
                <div className={styles.listIcon}>
                    <Menu items={MenuItems} onChange={handleChangeMenu}>
                        <button onClick={connectMetamask}>
                            <FontAwesomeIcon className={styles.icon} icon={faUserEdit} />
                        </button>
                    </Menu>
                    <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
                    <FontAwesomeIcon className={styles.icon} icon={faWallet} />
                </div>
            </div>
        </header>
    );
}
