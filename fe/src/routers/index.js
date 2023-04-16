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
    { path: '/account/earing/:id', component: EditUser, layout: EditLayout },
    { path: '/account/support/:id', component: EditUser, layout: EditLayout },
    { path: '/account/offers/:id', component: EditUser, layout: EditLayout },
    { path: '/account/notification/:id', component: EditUser, layout: EditLayout },
    { path: '/account/featured/:id', component: EditUser, layout: EditLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
