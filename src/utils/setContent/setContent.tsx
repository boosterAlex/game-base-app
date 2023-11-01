import { Spinner } from "shared/ui";

const setContent = (status: string, Component: () => JSX.Element) => {
    switch (status) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return <Spinner />
        case 'confirmed':
            return <Component />
        default:
            throw new Error('Unexpected status state')
    }
}

export default setContent