import Home from '~/pages/Home';
import Drops from '~/pages/Drops';
import Stats from '~/pages/Stats';
import EditUser from '~/pages/EditUser';
import EditLayout from '~/Layout/EditLayout';
import Account from '~/pages/Account';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/drops', component: Drops },
    { path: '/ranking', component: Stats },
    { path: '/account/:id', component: Account },
    { path: '/account/profile/:id', component: EditUser, layout: EditLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
