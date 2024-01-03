import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom';

import { ROUTES } from 'shared/consts'
import { Layout } from 'App/Layout';

const ListOfGamesByParams = lazy(() => import('pages').then(({ ListOfGamesByParams }) => ({ default: ListOfGamesByParams })))
const AllSearchedGame = lazy(() => import('pages').then(({ AllSearchedGame }) => ({ default: AllSearchedGame })))
const AboutGame = lazy(() => import('pages').then(({ AboutGame }) => ({ default: AboutGame })))
const Page404 = lazy(() => import('pages').then(({ Page404 }) => ({ default: Page404 })))




function PublicRoutes() {
    return (
        <>
            <Routes>
                <Route path={ROUTES.MAIN} element={<Layout />}>
                    <Route path={ROUTES.MAIN} element={<ListOfGamesByParams />} />
                    <Route path={ROUTES.GAME} element={<AboutGame />} />
                    <Route path={ROUTES.SEARCHEDGAME} element={<AllSearchedGame />} />
                </Route>
                <Route path='*' element={<Page404 />} />
            </Routes>
        </>
    );
}

export default PublicRoutes;