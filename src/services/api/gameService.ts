import { useApi } from "shared/hooks"

interface GamesListInfo {
    id: number
    name: string,
    background_image: string,
}

interface Screenshots {
    id: number
    image: string
}

interface GameBasicInfo {
    id: number | string | undefined
    name: string,
    background_image: string,
    description_raw: string
}


type GameService = {
    getGamesList: () => Promise<GamesListInfo[]>
    getGameById: (id: number | string | undefined) => Promise<GameBasicInfo>
    getScreenshotsById: (id: number | string | undefined) => Promise<Screenshots[]>
    setStatusLoad: Function
    statusLoad: string
}

const useGameServices = (): GameService => {

    const { request, statusLoad, setStatusLoad } = useApi();

    const getGamesList = async () => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games?key=${process.env.REACT_APP_API_KEY}`
        );

        return res.results.map((game: GamesListInfo) => {
            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image
            }
        })

    }

    const getGameById = async (id: number | string | undefined) => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games/${id}?key=${process.env.REACT_APP_API_KEY}`
        )

        return res
    }

    const getScreenshotsById = async (id: number | string | undefined) => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games/${id}/screenshots?key=${process.env.REACT_APP_API_KEY}`
        )
        return res.results.map((screenshots: Screenshots) => {
            return {
                id: screenshots.id,
                image: screenshots.image
            }
        })
    }

    return { getGamesList, getGameById, statusLoad, setStatusLoad, getScreenshotsById }
}

export default useGameServices