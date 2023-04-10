import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ListDrops } from '~/constants/ListDrops';
import ButtonCategory from '../ButtonCategory';
import styles from './Drops.module.scss';
export default function Drop() {
    const [select, setSelect] = useState(0);
    return (
        <div className={styles.drops}>
            <p className={styles.dropsTitle}>Drops</p>
            <Tabs className={styles.tabs} defaultIndex={0} onSelect={(index) => setSelect(index)}>
                <TabList className={styles.tabList}>
                    <Tab className={select === 0 ? styles.tabChoose : styles.tab}>Upcoming</Tab>
                    <Tab className={select === 1 ? styles.tabChoose : styles.tab}>Past</Tab>
                </TabList>

                <TabPanel className={styles.tabPanel}>
                    {ListDrops.filter((x) => x.item !== 'Now').map((item, index) => (
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
                    {ListDrops.filter((x) => x.item === 'Now').map((item, index) => (
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
