import { useApi } from "shared/hooks"

interface GamesListInfo {
    id: number
    name: string,
    background_image: string,
    short_screenshots: []
    ratings_count: number
    parent_platforms: []
    released: string
    genres: []
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

interface GamesResponse {
    count: number
    list: GamesListInfo[]
}


type GameService = {
    getGamesList: (currentPage: number) => Promise<GamesListInfo[]>
    getGameById: (id: number | string | undefined) => Promise<GameBasicInfo>
    getScreenshotsById: (id: number | string | undefined) => Promise<Screenshots[]>
    getGamesSearchInfo: (searchedString: string) => Promise<GamesResponse>
}


const useGameServices = (): GameService => {

    const { request } = useApi();

    const getGamesList = async (currentPage: number) => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games?key=${process.env.REACT_APP_API_KEY}&ordering=-relevance&page=${currentPage}&page_size=21`
        );

        return res.results.map((game: GamesListInfo) => {
            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                short_screenshots: game.short_screenshots,
                ratings_count: game.ratings_count,
                parent_platforms: game.parent_platforms,
                released: game.released,
                genres: game.genres
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
    const getGamesSearchInfo = async (searchedString: string) => {
        const res = await request(
            `${process.env.REACT_APP_API_BASE}games?page_size=20&search=${searchedString}&page=1&key=${process.env.REACT_APP_API_KEY}`
        )
        const resObj = {
            count: res.count,
            list: res.results.map((game: GamesListInfo) => {
                return {
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    parent_platforms: game.parent_platforms,
                }
            })

        }
        return resObj
    }

    return { getGamesList, getGameById, getScreenshotsById, getGamesSearchInfo }
}

export default useGameServices