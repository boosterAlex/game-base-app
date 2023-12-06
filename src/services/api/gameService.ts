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


type GameService = {
    getGamesList: (url: string) => Promise<GamesListInfo[]>
    getGameById: (id: number | string | undefined) => Promise<GameBasicInfo>
    getScreenshotsById: (id: number | string | undefined) => Promise<Screenshots[]>
    getGamesListNextPage: (url: string) => Promise<string>

}

const useGameServices = (): GameService => {

    const { request } = useApi();

    const getGamesList = async (url: string) => {
        const res = await request(
            // `https://api.rawg.io/api/games/lists/main?discover=true&key=c542e67aec3a4340908f9de9e86038af&ordering=-relevance&page=1&page_size=21`
            // `${process.env.REACT_APP_API_BASE}games?key=${process.env.REACT_APP_API_KEY}&ordering=-relevance&page=1&page_size=21`
            `${url}`
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
    const getGamesListNextPage = async (url: string) => {
        let res = await request(
            `${url}`
        )
        return res.next
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

    return { getGamesList, getGamesListNextPage, getGameById, getScreenshotsById }
}

export default useGameServices