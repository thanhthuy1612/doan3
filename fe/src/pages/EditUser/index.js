import { useState } from 'react';
import Button from '~/Layout/components/Button';
import styles from './EditUser.module.scss';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccount } from '~/redux/reducer/Account';

export default function EditUser() {
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        dispatch(setAccount(inputs));
        event.preventDefault();
    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleClickPreview = () => {
        navigate('/account');
    };
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Profile details</h1>
            <Button outline size="large" onClick={handleClickPreview}>
                Preview
            </Button>
            <div className={styles.edit}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        <div className={styles.titleForm}>Username</div>
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
                        <input disabled value={'12334'} />
                    </label>
                    <input
                        disabled={!inputs.username && !inputs.email && !inputs.bio}
                        className={styles.submit}
                        type="submit"
                        value="Save"
                    />
                </form>
                <div className={styles.profiles}>
                    <div className={styles.profile}>
                        <div className={styles.titleForm}>Profile Image</div>
                        <img src={images.default} alt="ProfileImage" className={styles.images} />
                    </div>
                    <div className={styles.profile}>
                        <div className={styles.titleForm}>Profile Banner</div>
                        <img src={images.default} alt="ProfileBanner" className={styles.banner} />
                    </div>
                </div>
            </div>
        </div>
    );
}
