import { Link, Outlet } from 'react-router-dom'

import { SearchPanel } from 'pages/SearchPanel'
import { ROUTES } from 'shared/consts'
import { Sidebar } from 'widgets'

const Layout = () => {
    return (
        <>
            <header style={{ display: 'flex', alignItems: 'center' }}>
                <Link
                    to={ROUTES.MAIN}
                >
                    Home
                </Link>
                <SearchPanel />
                <Link style={{ paddingRight: '10px' }}
                    to={ROUTES.SIGNIN}
                >
                    SIGN IN
                </Link>
                <Link
                    to={ROUTES.SIGNUP}
                >
                    SIGN UP
                </Link>
            </header>
            <div style={{ display: 'flex' }}>
                <aside style={{ flexBasis: "15%" }}>
                    <Sidebar />
                </aside>
                <main style={{ flexBasis: "85%", justifyContent: 'center', display: 'flex' }}>
                    <Outlet />
                </main>
            </div>
        </>
    )
}


export default Layout