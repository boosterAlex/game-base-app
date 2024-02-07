import { Link, Outlet } from 'react-router-dom'

import { useTheme } from 'shared/lib/hooks'

import { SearchPanel } from 'pages/SearchPanel'
import { ROUTES } from 'shared/consts'
import { Sidebar } from 'widgets'

const Layout = () => {

    const { setThemeColor } = useTheme()

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
                <button
                    onClick={() => setThemeColor('dark')}
                >Dark</button>
                <button
                    onClick={() => setThemeColor('light')}
                >Light</button>
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