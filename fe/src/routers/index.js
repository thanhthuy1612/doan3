import Home from '~/pages/Home';
import Drops from '~/pages/Drops';
import Stats from '~/pages/Stats';
import EditUser from '~/pages/EditUser';
import EditLayout from '~/Layout/EditLayout';
import Account from '~/pages/Account';
import Item from '~/pages/Item';
import Seller from '~/pages/Seller';
import MyNFT from '~/pages/MyNFT';
import Transfer from '~/pages/Transfer';
import Create from '~/pages/Create';
import Collection from '~/pages/Collection';

const publicRoutes = [{ path: '/', component: Home }];

const privateRoutes = [
    { path: '/drops', component: Drops },
    { path: '/ranking', component: Stats },
    { path: '/account/:id', component: Account },
    { path: '/account/profile/:id', component: EditUser, layout: EditLayout },
    { path: '/account/earing/:id', component: EditUser, layout: EditLayout },
    { path: '/account/support/:id', component: EditUser, layout: EditLayout },
    { path: '/account/offers/:id', component: EditUser, layout: EditLayout },
    { path: '/account/notification/:id', component: EditUser, layout: EditLayout },
    { path: '/account/featured/:id', component: EditUser, layout: EditLayout },
    { path: '/item/:tokenId', component: Item },
    { path: '/account/seller/:id', component: Seller },
    { path: '/myNFT/:id', component: MyNFT },
    { path: '/transfer/:id', component: Transfer },
    { path: '/create/:id', component: Create },
    { path: '/collection/:id', component: Collection },
];

export { publicRoutes, privateRoutes };
