import { Tabs } from 'antd';
import TableComponent from '../Table';
import './Tabs.css';
export default function Tab() {
    const items = [
        {
            label: <span className="title">Create Token</span>,
            key: 1,
            children: <TableComponent type="createToken" />,
        },
        {
            label: <span className="title">Create Market Sale</span>,
            key: 2,
            children: <TableComponent type="createMarketSale" />,
        },
        {
            label: <span className="title">Resell Token</span>,
            key: 3,
            children: <TableComponent type="resellToken" />,
        },
        {
            label: <span className="title">Received</span>,
            key: 4,
            children: <TableComponent type="sold" />,
        },
    ];
    return <Tabs className="wrapper" defaultActiveKey="1" centered items={items} />;
}
