import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styles from './Post.module.scss';
import ButtonCategory from '~/pages/Home/ButtonCategory';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsListed, fetchMyNFTs, setItem } from '~/redux';
import { useNavigate } from 'react-router-dom';
export default function Post() {
    const [select, setSelect] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myNFT = useSelector((state) => state.account.myNFT);
    const itemsListed = useSelector((state) => state.account.itemsListed);
    useEffect(() => {
        dispatch(fetchItemsListed());
        dispatch(fetchMyNFTs());
    }, [dispatch]);
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
                    {myNFT.map((item, index) => (
                        <ButtonCategory
                            key={index}
                            item={item}
                            onClick={() => {
                                handleClickMyNFT(item);
                            }}
                        />
                    ))}
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                    {itemsListed.map((item, index) => (
                        <ButtonCategory
                            key={index}
                            item={item}
                            onClick={() => {
                                handleClickItemsList(item);
                            }}
                        />
                    ))}
                </TabPanel>
            </Tabs>
        </div>
    );
}
