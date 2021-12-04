import Overview from './pages/Overview/Overview';
import Offices from './pages/Offices/Offices';

const routes = [
    {path: '/', component: Overview},
    {path: '/office/:company', component: Offices}
]

export default routes