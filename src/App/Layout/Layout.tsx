import { Link, Outlet } from 'react-router-dom'

import { SearchPanel } from 'shared/ui/SearchPanel'

const Layout = () => {
    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <Link to="/game/:id">Game</Link>
                <SearchPanel />
            </header>
            <Outlet />
            <footer>2023</footer>
        </>
    )
}


export default Layout