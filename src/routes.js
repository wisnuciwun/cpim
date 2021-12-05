import Overview from './pages/Overview/Overview';
import Offices from './pages/Offices/Offices';

const routes = [
    {path: '/', component: Overview, name: "Overview"},
    {path: '/office/:company/:id', component: Offices, name: "Office"}
]

export default routes