import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { create } from 'ipfs-http-client';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import images from '~/assets/images';
import styles from './Form.module.scss';
import { postPicture } from '~/api/picture';
import Loading from '~/Layout/components/Loading';
const client = create('http://14.225.254.58/api/v0');

export default function Form() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ fileImg: null });
    const [loading, setLoading] = useState(false);
    const handleChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const params = useParams();
    const handleUpload = async (event) => {
        const name = event.target.name;
        const value = event.target.files[0];
        try {
            const added = await client.add(value, {
                progress: (prog) => console.log(`received: ${prog}`),
            });
            const url = `https://ipfs.io/ipfs/${added.path}`;
            setInputs((values) => ({ ...values, [name]: url, fileImg: value }));
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await postPicture(params.id, { ...inputs });
        setLoading(false);
        setInputs({ fileImg: null });
        navigate('/');
    };
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.labelImg}>
                <img
                    src={inputs.fileImg !== null ? URL.createObjectURL(inputs.fileImg) : images.default}
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
            <label className={styles.label}>
                <div className={styles.titleForm}>Title :</div>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={inputs.title || ''}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.label}>
                <div className={styles.titleForm}>Price :</div>
                <input
                    type="text"
                    name="price"
                    placeholder="Enter Price"
                    value={inputs.price || ''}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.labelSubmit}>
                <button
                    disabled={!inputs.img || !inputs.title || !inputs.price || loading}
                    className={styles.submit}
                    type="submit"
                >
                    {loading ? <Loading type="small" /> : <>Save</>}
                </button>
            </label>
        </form>
    );
}
