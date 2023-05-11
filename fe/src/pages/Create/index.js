import styles from './Create.module.scss';
import Form from './Form';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
export default function Create() {
    return (
        <div className={styles.wrapper}>
            <Alert
                banner
                message={
                    <Marquee pauseOnHover gradient={false}>
                        Please enter all the information below: Image, Title, Price.
                    </Marquee>
                }
            />
            <p className={styles.title}>Create New Item</p>
            <Form />
        </div>
    );
}
