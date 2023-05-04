import { useEffect, useState } from 'react';
import Button from '~/Layout/components/Button';
import styles from './EditUser.module.scss';
import images from '~/assets/images';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '~/redux/reducer/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getAccount, updateAccount } from '~/api/account';

export default function EditUser() {
    const [inputs, setInputs] = useState({ ava: null, banner: null });
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accounts = useSelector((state) => state.account.info);
    const fetch = async () => {
        const result = await getAccount(params.id);
        dispatch(setAccount(result));
    };
    useEffect(() => {
        fetch();
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        updateAccount(accounts._id, { ...inputs, wallet: accounts.wallet });
        navigate(`/account/${params.id}`);
    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleClickPreview = () => {
        navigate(`/account/${params.id}`);
    };
    const handleUpload = (event) => {
        const name = event.target.name;
        const value = event.target.files[0];
        setInputs((values) => ({ ...values, [name]: value }));
    };
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Profile details</h1>
            <Button outline size="large" onClick={handleClickPreview}>
                Preview
            </Button>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.informationForm}>
                    <label className={styles.label}>
                        <div className={styles.titleForm}>Name</div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={inputs.username || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label className={styles.label}>
                        <div className={styles.titleForm}>Bio</div>
                        <input
                            type="text"
                            name="bio"
                            placeholder="Tell the word your story!"
                            value={inputs.bio || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label className={styles.label}>
                        <div className={styles.titleForm}>Email Address</div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={inputs.email || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label className={styles.label}>
                        <div className={styles.titleForm}>Wallet Address</div>
                        <input className={styles.disabled} disabled value={accounts?.wallet} />
                    </label>
                    <input disabled={!inputs} className={styles.submit} type="submit" value="Save" />
                </div>
                <div className={styles.profiles}>
                    <div className={styles.profile}>
                        <div className={styles.titleForm}>Profile Image</div>
                        <img
                            src={inputs.ava !== null ? URL.createObjectURL(inputs.ava) : images.default}
                            alt="ProfileImage"
                            className={styles.images}
                        />
                        <input
                            name="ava"
                            onChange={handleUpload}
                            accept="image/*"
                            id="ava"
                            type="file"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="ava">
                            <div className={styles.imagesEdit}>
                                <FontAwesomeIcon icon={faPen} className={styles.edit} />
                            </div>
                        </label>
                    </div>
                    <div className={styles.profile}>
                        <div className={styles.titleForm}>Profile Banner</div>
                        <img
                            src={inputs.banner !== null ? URL.createObjectURL(inputs.banner) : images.default}
                            alt="ProfileBanner"
                            className={styles.banner}
                        />
                        <input
                            onChange={handleUpload}
                            name="banner"
                            accept="image/*"
                            id="banner"
                            type="file"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="banner">
                            <div className={styles.bannerEdit}>
                                <FontAwesomeIcon icon={faPen} className={styles.edit} />
                            </div>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
}
