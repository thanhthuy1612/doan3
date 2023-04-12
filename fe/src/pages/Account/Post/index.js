import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styles from './Post.module.scss';
import { ListDrops } from '~/constants/ListDrops';
import ButtonCategory from '~/pages/Home/ButtonCategory';
import { useState } from 'react';
export default function Post() {
    const [select, setSelect] = useState(0);
    return (
        <div className={styles.wrapper}>
            <Tabs className={styles.tabs} defaultIndex={0} onSelect={(index) => setSelect(index)}>
                <TabList className={styles.tabList}>
                    <Tab className={select === 0 ? styles.tabChoose : styles.tab}>Upcoming</Tab>
                    <Tab className={select === 1 ? styles.tabChoose : styles.tab}>Past</Tab>
                </TabList>

                <TabPanel className={styles.tabPanel}>
                    {ListDrops.map((item, index) => (
                        <ButtonCategory
                            key={index}
                            title={item.title}
                            img={item.img}
                            item={item.item}
                            price={item.price}
                        />
                    ))}
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                    {ListDrops.map((item, index) => (
                        <ButtonCategory
                            key={index}
                            title={item.title}
                            img={item.img}
                            item={item.item}
                            price={item.price}
                        />
                    ))}
                </TabPanel>
            </Tabs>
        </div>
    );
}
