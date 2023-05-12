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
    const [state, _setState] = useState({
        select: 0,
        page: 1,
        pageSize: 10,
    });
    const setState = (data = {}) => {
        _setState((prevState) => ({ ...prevState, ...data }));
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { myNFT, itemsListed, loading } = useSelector((state) => state.account);
    useEffect(() => {
        state.select === 1 ? dispatch(fetchItemsListed()) : dispatch(fetchMyNFTs());
        setState({ page: 1, pageSize: 10 });
    }, [state.select, load]);
    const handleClickItemsList = (item) => {
        dispatch(setItem(item));
        navigate(`/item/${item.tokenId}`);
    };
    const handleClickMyNFT = (item) => {
        dispatch(setItem(item));
        navigate(`/myNFT/${item.tokenId}`);
    };
    const onChangePage = (page, pageSize) => {
        setState({ page: page, pageSize: pageSize });
    };
    return (
        <div className={styles.wrapper}>
            <Tabs className={styles.tabs} defaultIndex={0} onSelect={(index) => setState({ select: index })}>
                <TabList className={styles.tabList}>
                    <Tab className={state.select === 0 ? styles.tabChoose : styles.tab}>My NFTs</Tab>
                    <Tab className={state.select === 1 ? styles.tabChoose : styles.tab}>Items Listed</Tab>
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
                            {myNFT
                                .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
                                .map((item, index) => (
                                    <ButtonCategory
                                        type="sell"
                                        key={index}
                                        item={item}
                                        onClick={() => {
                                            handleClickMyNFT(item);
                                        }}
                                    />
                                ))}
                            <Pagination
                                className={styles.pagination}
                                onChange={onChangePage}
                                showSizeChanger
                                defaultCurrent={1}
                                total={myNFT.length}
                            />
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
                            {itemsListed
                                .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
                                .map((item, index) => (
                                    <ButtonCategory
                                        key={index}
                                        item={item}
                                        onClick={() => {
                                            handleClickItemsList(item);
                                        }}
                                    />
                                ))}
                            <Pagination
                                className={styles.pagination}
                                showSizeChanger
                                onChange={onChangePage}
                                defaultCurrent={1}
                                total={itemsListed.length}
                            />
                        </div>
                    )}
                </TabPanel>
            </Tabs>
        </div>
    );
}
