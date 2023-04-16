import { useState } from 'react';
import styles from './Form.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
export default function Form() {
    const [inputs, setInputs] = useState({ img: null });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleUpload = (event) => {
        const name = event.target.name;
        const value = event.target.files[0];
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handleSubmit = () => {};
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.labelImg}>
                <img
                    src={inputs.img !== null ? URL.createObjectURL(inputs.img) : images.default}
                    alt="ProfileImage"
                    className={styles.images}
                />
                <input
                    name="img"
                    onChange={handleUpload}
                    accept="image/*"
                    id="img"
                    type="file"
                    style={{ display: 'none' }}
                />
                <label htmlFor="img">
                    <div className={styles.imagesEdit}>
                        <FontAwesomeIcon icon={faPen} className={styles.edit} />
                    </div>
                </label>
            </label>
            <div className={styles.information}>
                <label className={styles.label}>
                    <div className={styles.titleForm}>Title</div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={inputs.title || ''}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.label}>
                    <div className={styles.titleForm}>Price</div>
                    <input
                        type="text"
                        name="price"
                        placeholder="Enter Price"
                        value={inputs.price || ''}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.labelSubmit}>
                    <input
                        disabled={!inputs.img && !inputs.title && !inputs.price}
                        className={styles.submit}
                        type="submit"
                        value="Save"
                    />
                </label>
            </div>
        </form>
    );
}
