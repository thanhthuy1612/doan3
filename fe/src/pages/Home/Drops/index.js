import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ButtonCategory from '../ButtonCategory';
import styles from './Drops.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketItem, setItem } from '~/redux';
import { useNavigate } from 'react-router-dom';
export default function Drop() {
    const [select, setSelect] = useState(0);
    const items = useSelector((state) => state.account.items);
    const info = useSelector((state) => state.account.info);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    useEffect(() => {
        if (info) {
            dispatch(fetchMarketItem());
        }
    }, [info]);
    const handleClick = (item) => {
        dispatch(setItem(item));
        navigate(`/item/${item.tokenId}`);
    };
    return (
        <div className={styles.drops}>
            <Tabs className={styles.tabs} defaultIndex={0} onSelect={(index) => setSelect(index)}>
                <TabList className={styles.tabList}>
                    <Tab className={select === 0 ? styles.tabChoose : styles.tab}>Upcoming</Tab>
                    <Tab className={select === 1 ? styles.tabChoose : styles.tab}>Past</Tab>
                </TabList>

                <TabPanel className={styles.tabPanel}>
                    {info ? (
                        items.filter((x) => x?.meta?.time === date).length === 0 ? (
                            <p className={styles.title}>Don't have item.</p>
                        ) : (
                            items
                                .filter((x) => x?.meta?.time === date)
                                .map((item, index) => (
                                    <ButtonCategory
                                        onClick={() => {
                                            handleClick(item);
                                        }}
                                        key={index}
                                        item={item}
                                    />
                                ))
                        )
                    ) : (
                        <p className={styles.title}>Please connect wallet</p>
                    )}
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                    {info ? (
                        items.filter((x) => x?.meta?.time !== date).length === 0 ? (
                            <p className={styles.title}>Don't have item.</p>
                        ) : (
                            items
                                .filter((x) => x?.meta?.time !== date)
                                .map((item, index) => (
                                    <ButtonCategory
                                        onClick={() => {
                                            handleClick(item);
                                        }}
                                        key={index}
                                        item={item}
                                    />
                                ))
                        )
                    ) : (
                        <p className={styles.title}>Please connect wallet</p>
                    )}
                </TabPanel>
            </Tabs>
        </div>
    );
}
