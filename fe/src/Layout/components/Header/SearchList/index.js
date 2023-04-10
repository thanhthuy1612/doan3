import SearchAccount from './SearchAccount';
import styles from './SearchList.module.scss';
export default function SearchList({ data, title }) {
    return (
        <div>
            <h4 className={styles.searchTitle}>{title}</h4>
            {data.map((item, index) => (
                <SearchAccount text={item.text} ava={item.ava} icon={item.icon} content={item.content} key={index} />
            ))}
        </div>
    );
}
