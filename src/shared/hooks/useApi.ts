import { useCallback } from "react";


const useApi = () => {

    const request = useCallback(
        async (
            url: RequestInfo | URL,
            method = 'GET',
            body = null,
            headers = { 'Content-type': 'application/json' }
        ) => {

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
                throw e
            }

        }, [])

    return { request }
}

export default useApi
