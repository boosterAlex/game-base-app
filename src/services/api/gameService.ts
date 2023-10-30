import { useApi } from "shared/hooks"

interface Games {
    id: number
    name: string,
    image: string,
}
type GameService = {
    getGamesList: () => Promise<Games[]>
}

const useGameServices = (): GameService => {

    const { request } = useApi();

    const apiBase = 'https://api.rawg.io/api/'
    const apiKey = 'bf5ca4a4fc534f4aac45a2673dfe64c5'

    const getGamesList = async () => {
        const res = await request(
            `${apiBase}games?key=${apiKey}`
        );

        return res.results.map((games: {
            id: number
            name: string,
            background_image: string,
        }) => {

            return {
                id: games.id,
                name: games.name,
                image: games.background_image
            }
        })

    }

    return { getGamesList }
}

export default useGameServices