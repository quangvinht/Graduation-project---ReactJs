//Pages
import Home from '~/pages/Home/';
import Chart from '~/pages/Chart/';
import NewMusic from '~/pages/NewMusic/';
import Radio from '~/pages/Radio/';
import Category from '~/pages/Category/';
import Search from '~/pages/Search/';
import Album from '~/pages/Album/';
import Artists from '~/pages/Artists/';
import DetailCategory from '~/pages/DetailCategory/';
import Top100 from '~/pages/Top100/';
import ChartHome from '~/pages/ChartHome/';

//Layout
// import { HeaderOnly } from '~/layouts';

//config
import config from '~/config/';

//public routes:
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.chart, component: Chart },
    { path: config.routes.newMusic, component: NewMusic },
    { path: config.routes.radio, component: Radio },
    { path: config.routes.search, component: Search },
    { path: config.routes.top100, component: Top100 },
    { path: config.routes.category, component: Category },
    { path: config.routes.album, component: Album },
    { path: config.routes.artists, component: Artists },
    { path: config.routes.playlist, component: Album },
    { path: config.routes.chartHome, component: ChartHome },

    { path: config.routes.detailCategory, component: DetailCategory },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
