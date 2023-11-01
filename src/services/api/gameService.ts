import { useApi } from "shared/hooks"

interface GameBasicInfo {
    id: number
    name: string,
    background_image: string,
}
type GameService = {
    getGamesList: () => Promise<GameBasicInfo[]>
    getGameById: (id: number) => Promise<GameBasicInfo[]>
    setStatusLoad: Function
    statusLoad: string
}

const useGameServices = (): GameService => {

    const { request, statusLoad, setStatusLoad } = useApi();

    const getGamesList = async () => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games?key=${process.env.REACT_APP_API_KEY}`
        );

        return res.results.map((game: GameBasicInfo) => {

            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image
            }
        })

    }

    const getGameById = async (id: number) => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games/${id}?key=${process.env.REACT_APP_API_KEY}`
        )

        return res.data.results
    }

    return { getGamesList, getGameById, statusLoad, setStatusLoad }
}

export default useGameServices