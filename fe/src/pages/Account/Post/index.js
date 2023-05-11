import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styles from './Post.module.scss';
import ButtonCategory from '~/pages/Home/ButtonCategory';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsListed, fetchMyNFTs, setItem } from '~/redux';
import { useNavigate } from 'react-router-dom';
import Loading from '~/Layout/components/Loading';
import { Pagination } from 'antd';
export default function Post({ load }) {
    const [select, setSelect] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { myNFT, itemsListed, loading } = useSelector((state) => state.account);
    useEffect(() => {
        select === 1 ? dispatch(fetchItemsListed()) : dispatch(fetchMyNFTs());
    }, [select, load]);
    const handleClickItemsList = (item) => {
        dispatch(setItem(item));
        navigate(`/item/${item.tokenId}`);
    };
    const handleClickMyNFT = (item) => {
        dispatch(setItem(item));
        navigate(`/myNFT/${item.tokenId}`);
    };
    return (
        <div className={styles.wrapper}>
            <Tabs className={styles.tabs} defaultIndex={0} onSelect={(index) => setSelect(index)}>
                <TabList className={styles.tabList}>
                    <Tab className={select === 0 ? styles.tabChoose : styles.tab}>My NFTs</Tab>
                    <Tab className={select === 1 ? styles.tabChoose : styles.tab}>Items Listed</Tab>
                </TabList>

                <TabPanel className={styles.tabPanel}>
                    {myNFT.length === 0 ? (
                        loading ? (
                            <div className={styles.loading}>
                                <Loading />
                            </div>
                        ) : (
                            <p className={styles.title}>Don't have item.</p>
                        )
                    ) : (
                        <div className={styles.page}>
                            {myNFT.map((item, index) => (
                                <ButtonCategory
                                    type="sell"
                                    key={index}
                                    item={item}
                                    onClick={() => {
                                        handleClickMyNFT(item);
                                    }}
                                />
                            ))}
                            <Pagination className={styles.pagination} showSizeChanger defaultCurrent={3} total={500} />
                        </div>
                    )}
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                    {itemsListed.length === 0 ? (
                        loading ? (
                            <div className={styles.loading}>
                                <Loading />
                            </div>
                        ) : (
                            <p className={styles.title}>Don't have item.</p>
                        )
                    ) : (
                        <div className={styles.page}>
                            {itemsListed.map((item, index) => (
                                <ButtonCategory
                                    key={index}
                                    item={item}
                                    onClick={() => {
                                        handleClickItemsList(item);
                                    }}
                                />
                            ))}
                            <Pagination className={styles.pagination} showSizeChanger defaultCurrent={1} total={500} />
                        </div>
                    )}
                </TabPanel>
            </Tabs>
        </div>
    );
}
