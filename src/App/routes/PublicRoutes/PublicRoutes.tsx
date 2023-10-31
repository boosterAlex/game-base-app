import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom';

import { ROUTES } from 'shared/consts'
import { Layout } from 'App/Layout';

const HomePage = lazy(() => import('pages').then(({ HomePage }) => ({ default: HomePage })))
const AboutGame = lazy(() => import('pages').then(({ AboutGame }) => ({ default: AboutGame })))
const NotfoundPage = lazy(() => import('pages').then(({ NotfoundPage }) => ({ default: NotfoundPage })))




function PublicRoutes() {
    return (
        <>
            <Routes>
                <Route path={ROUTES.MAIN} element={<Layout />}>
                    <Route path={ROUTES.MAIN} element={<HomePage />} />
                    <Route path={ROUTES.GAME} element={<AboutGame />} />
                    <Route path='*' element={<NotfoundPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default PublicRoutes;