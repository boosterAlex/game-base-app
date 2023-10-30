import { Routes, Route } from 'react-router-dom';

import { HomePage, AboutGame, NotfoundPage } from 'pages';
import { ROUTES } from 'shared/consts'
import { Layout } from 'App/Layout';


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