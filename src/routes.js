import React from 'react';

const Overview = React.lazy(() => import('./pages/Overview/Overview'))

const routes = [
    {path: '/home', exact: true, name: 'overview', component: Overview}
]

export default routes