import asyncRoute from 'lib/asyncRoute';

export const Home = asyncRoute(() => import('../component/List'));