import { Link, Outlet } from 'react-router-dom'

import { SearchPanel } from 'pages/SearchPanel'
import { ROUTES } from 'shared/consts'
import { Sidebar } from 'widgets'
import { ToggleThemeCheckbox } from 'shared/ui'

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
                <Link style={{ paddingRight: '10px' }}
                    to={ROUTES.SIGNUP}
                >
                    SIGN UP
                </Link>
                <ToggleThemeCheckbox />
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