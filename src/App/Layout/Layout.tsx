import { Link, Outlet } from 'react-router-dom'

import { SearchPanel } from 'pages/SearchPanel'
import { ROUTES } from 'shared/consts'
import { Sidebar } from 'widgets'
import { useTheme } from 'shared/lib/hooks'

const Layout = () => {

    const { isLight, setIsLight } = useTheme()

    return (
        <div className={(isLight) ? 'light' : 'dark'}>
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
                <button
                    onClick={() => setIsLight(!isLight)}
                >Theme Color</button>
            </header>
            <div style={{ display: 'flex' }}>
                <aside style={{ flexBasis: "15%" }}>
                    <Sidebar />
                </aside>
                <main style={{ flexBasis: "85%", justifyContent: 'center', display: 'flex' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}


export default Layout