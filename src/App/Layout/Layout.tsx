import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react'

import { SearchPanel } from 'pages/SearchPanel'
import { Spinner } from 'shared/ui'
import { Sidebar } from 'widgets'

const Layout = () => {
    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <SearchPanel />
            </header>
            <div style={{ display: 'flex' }}>
                <aside style={{ flexBasis: "15%" }}>
                    <Sidebar />
                </aside>
                <main style={{ flexBasis: "85%" }}>
                    <Suspense fallback={<Spinner />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </>
    )
}


export default Layout