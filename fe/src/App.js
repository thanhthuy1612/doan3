import styles from './App.module.scss';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routers';
import DefaultLayout from './Layout/DefaultLayout';
import { useSelector } from 'react-redux';

export default function App() {
    const info = useSelector((state) => state.account.info);
    const routes = () => {
        return info ? [...publicRoutes, ...privateRoutes] : publicRoutes;
    };
    return (
        <Router>
            <div className={styles.app}>
                <Routes>
                    {routes().map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}
