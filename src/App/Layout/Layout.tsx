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
            </header>
            <div style={{ display: 'flex' }}>
                <aside style={{ flexBasis: "15%" }}>
                    <NavBar />
                </aside>
                <main style={{ flexBasis: "85%" }}>
                    <Suspense fallback={<Spinner />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
            <footer>2023</footer>
        </>
    )
}


export default Layout