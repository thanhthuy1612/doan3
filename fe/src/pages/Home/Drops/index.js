import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ButtonCategory from '../ButtonCategory';
import styles from './Drops.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketItemsPast, fetchMarketItemsUpComing, setItem } from '~/redux';
import { useNavigate } from 'react-router-dom';
import Loading from '~/Layout/components/Loading';
export default function Drop() {
    const [select, setSelect] = useState(0);
    let { upComing, past, info, loading } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (info) {
            select === 0 ? dispatch(fetchMarketItemsUpComing()) : dispatch(fetchMarketItemsPast());
        }
    }, [info, select]);
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
                        upComing.length === 0 ? (
                            loading ? (
                                <div className={styles.loading}>
                                    <Loading />
                                </div>
                            ) : (
                                <p className={styles.title}>Don't have item.</p>
                            )
                        ) : (
                            upComing.map((item, index) => (
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
                        past.length === 0 ? (
                            loading ? (
                                <div className={styles.loading}>
                                    <Loading />
                                </div>
                            ) : (
                                <p className={styles.title}>Don't have item.</p>
                            )
                        ) : (
                            past.map((item, index) => (
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
