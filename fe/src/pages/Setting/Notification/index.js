import { useParams } from 'react-router-dom';
import styles from './Notification.module.scss';
import { useEffect } from 'react';
import { getAccount } from '~/api/account';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '~/redux';
import ListItem from './ListItem';

export default function Notification() {
    const params = useParams();
    const dispatch = useDispatch();
    let { info } = useSelector((state) => state.account);
    useEffect(() => {
        const fetch = async () => {
            const result = await getAccount(params.id);
            dispatch(setAccount(result));
        };
        fetch();
    }, []);
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Notification settings</h1>
            <p>Select which notifications you would like to receive for {info?.wallet}</p>
            <ListItem />
        </div>
    );
}
