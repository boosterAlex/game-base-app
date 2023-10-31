import { useCallback, useState } from "react";

const useApi = () => {

    const [statusLoad, setStatusLoad] = useState('waiting')

    const request = useCallback(
        async (
            url: RequestInfo | URL,
            method = 'GET',
            body = null,
            headers = { 'Content-type': 'application/json' }
        ) => {
            setStatusLoad('loading')

            try {
                const response = await fetch(url, { method, body, headers })

                if (!response.ok) {
                    throw new Error(
                        `Could not fetch ${url}, status: ${response.status}`
                    )
                }

                const data = await response.json();

                return data
            } catch (e) {
                setStatusLoad('error')
                throw e
            }

        }, [])

    return { request, statusLoad, setStatusLoad }
}

export default useApi
