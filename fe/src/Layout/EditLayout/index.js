import { MenuEditUser } from '~/constants/MenuEditUsers';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './EditLayout.module.scss';

export default function EditLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <Sidebar title={MenuEditUser.title} items={MenuEditUser.data} />
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
