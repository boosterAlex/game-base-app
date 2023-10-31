import { useApi } from "shared/hooks"

interface GameBasicInfo {
    id: number
    name: string,
    background_image: string,
}
type GameService = {
    getGamesList: () => Promise<GameBasicInfo[]>
    setStatusLoad: Function
    statusLoad: string
}

const useGameServices = (): GameService => {

    const { request, statusLoad, setStatusLoad } = useApi();

    const getGamesList = async () => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games?key=${process.env.REACT_APP_API_KEY}`
        );

        return res.results.map((games: GameBasicInfo) => {

            return {
                id: games.id,
                name: games.name,
                background_image: games.background_image
            }
        })

    }

    return { getGamesList, statusLoad, setStatusLoad }
}

export default useGameServices