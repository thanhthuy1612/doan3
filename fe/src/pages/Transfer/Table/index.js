import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccount } from '~/api/account';
import { getTransfer } from '~/api/transfer';
import './Table.css';
export default function TableComponent({ type }) {
    const columns = [
        {
            title: 'Txn Hash',
            dataIndex: 'hash',
            key: 'hash',
            render: (text) => (
                <a href={`https://testnet.bscscan.com/tx/${text}`}>
                    {text.substring(0, 6)}...
                    {text.substring(50)}
                </a>
            ),
        },
        {
            title: 'Block',
            dataIndex: 'blockNumber',
            key: 'blockNumber',
        },
        {
            title: 'Time',
            dataIndex: 'timeStamp',
            key: 'timeStamp',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.time - b.time,
            render: (time) => <p>{getDate(time)}</p>,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            render: (from) => (
                <p>
                    {from.substring(0, 6)}...
                    {from.substring(38)}
                </p>
            ),
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            render: (to) => (
                <p>
                    {to.substring(0, 6)}...
                    {to.substring(38)}
                </p>
            ),
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (value) => <p>{value / 1000000000000000000} BNB</p>,
        },
        {
            title: '[Txn Fee]',
            dataIndex: 'gasPrice',
            key: 'gasPrice',
            render: (gasPrice) => <p>{gasPrice / 1000000000} Gwei</p>,
        },
        {
            title: 'Success',
            dataIndex: 'isError',
            key: 'isError',
            render: (error) => (
                <>
                    {parseInt(error) === 0 ? (
                        <div className="success box">Success</div>
                    ) : (
                        <div className="error box">Error</div>
                    )}
                </>
            ),
        },
    ];

    const [transfer, setTransfer] = useState();
    const params = useParams();
    useEffect(() => {
        const fetch = async () => {
            const account = await getAccount(params.id);
            const result = await getTransfer(account.wallet);
            let item;
            switch (type) {
                case 'resellToken':
                    item = await result.filter((e) => e.functionName === 'resellToken(uint256 tokenId, uint256 price)');
                    setTransfer(item);
                    break;
                case 'createMarketSale':
                    item = await result.filter((e) => e.functionName === 'createMarketSale(uint256 itemId)');
                    break;
                case 'createToken':
                    item = await result.filter((e) => e.functionName === 'createToken(string _name, uint256 _id)');
                    break;
                case 'sold':
                    item = await result.filter((e) => e.to === account.wallet.toLowerCase());
                    break;
                default:
                    break;
            }
            setTransfer(item);
        };
        fetch();
    }, []);
    const getDate = (date) => {
        let time = new Date(date * 1000);
        let yyyy = time.getFullYear();
        let mm = time.getMonth() + 1;
        let dd = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;

        return dd + '-' + mm + '-' + yyyy + ' ' + hours + ':' + minutes;
    };
    return (
        <Table
            columns={columns}
            dataSource={transfer}
            pagination={{
                pageSize: 10,
            }}
            style={{ width: '100%' }}
        />
    );
}
