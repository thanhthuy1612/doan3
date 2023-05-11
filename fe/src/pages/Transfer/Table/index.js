import { Table, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAccount } from '~/api/account';
import { getTransfer } from '~/api/transfer';
import './Table.css';
import Tippy from '@tippyjs/react/headless';
import { addressContract } from '~/redux/reducer/Account/addressContract';
export default function TableComponent({ type }) {
    const columns = [
        {
            title: 'Txn Hash',
            dataIndex: 'hash',
            key: 'hash',
            render: (text) => (
                <a className="hash" href={`https://testnet.bscscan.com/tx/${text}`}>
                    {text.substring(0, 6)}...
                    {text.substring(55)}
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
            sorter: (a, b) => a.timeStamp - b.timeStamp,
            render: (time) => <p>{getDate(time)}</p>,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            render: (from) => (
                <Tippy
                    interactive
                    render={(attrs) => (
                        <div className="content" tabIndex="-1" {...attrs}>
                            {from}
                        </div>
                    )}
                >
                    <p className="button" onClick={() => openNotification('topRight', from)}>
                        {from.substring(0, 6)}...
                        {from.substring(38)}
                    </p>
                </Tippy>
            ),
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            render: (to) => (
                <Tippy
                    interactive={true}
                    render={(attrs) => (
                        <div className="content" tabIndex="-1" {...attrs}>
                            {to}
                        </div>
                    )}
                >
                    <p className="button" onClick={() => openNotification('topRight', to)}>
                        {to.substring(0, 6)}...
                        {to.substring(38)}
                    </p>
                </Tippy>
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
    const [api, contextHolder] = notification.useNotification();
    const params = useParams();
    useEffect(() => {
        const fetch = async () => {
            const account = await getAccount(params.id);
            let result = await getTransfer(account.wallet);
            result.sort(function (a, b) {
                return b.timeStamp - a.timeStamp;
            });
            let item;
            switch (type) {
                case 'resellToken':
                    item = await result.filter(
                        (e) =>
                            e.functionName === 'resellToken(uint256 tokenId, uint256 price)' &&
                            e.to === addressContract.toLowerCase(),
                    );
                    setTransfer(item);
                    break;
                case 'createMarketSale':
                    item = await result.filter(
                        (e) =>
                            e.functionName === 'createMarketSale(uint256 itemId)' &&
                            e.to === addressContract.toLowerCase(),
                    );
                    break;
                case 'createToken':
                    item = await result.filter(
                        (e) =>
                            e.functionName === 'createToken(string _name, uint256 _id)' &&
                            e.to === addressContract.toLowerCase(),
                    );
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
    const openNotification = async (placement, items) => {
        await navigator.clipboard.writeText(items);
        api.success({
            message: `COPY SUCCESS`,
            description: items,
            placement,
        });
    };
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
        <div>
            {contextHolder}
            <Table
                columns={columns}
                dataSource={transfer}
                pagination={{
                    pageSize: 10,
                }}
                style={{ width: '100%' }}
            />
        </div>
    );
}
