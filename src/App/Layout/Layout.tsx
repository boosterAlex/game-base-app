import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react'

import { SearchPanel, NavBar } from 'shared/ui'
import { Spinner } from 'shared/ui'

const Layout = () => {
    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <SearchPanel />
                <NavBar />
            </header>
            <main>
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            </main>
            <footer>2023</footer>
        </>
    )
}


export default Layout