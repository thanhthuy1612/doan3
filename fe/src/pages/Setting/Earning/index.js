import TableComponent from '~/pages/Transfer/Table';
import styles from './Earning.module.scss';

export default function Earning() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Earnings</h1>
            <div className={styles.context}>
                To access your 2022 Creator Earnings where this wallet is listed as the collection owner on Ethereum,
                using OpenSea, see below.
            </div>
            <div className={styles.context}>
                As a reminder, you are solely responsible for validating this information and determining what taxes you
                owe. This information is provided on a collection owner basis. If no collection owner exists, earnings
                information is listed for the wallet set to receive creator earnings.
            </div>
            <div className={styles.context}>
                Please note, the information in this report reflects publicly available information from the Ethereum,
                except for the estimated USD conversion rate, which was obtained from
                <a href="https://coincap.io/">www.coincap.io</a>
                and measured as of the transaction minute. This report does not include Creator Earnings earned on
                Solana and BSC.
            </div>
            <div className={styles.context}>
                For any questions, including requests for Creator Earnings information from Solana and BSC, please reach
                out to
                <a href="mailto:thanhthuy16122001@gmail.com?subject=Feedback&body=Feedback%20OpenSea">
                    thanhthuy16122001@gmail.com
                </a>
            </div>
            <TableComponent type="sold" />
        </div>
    );
}
