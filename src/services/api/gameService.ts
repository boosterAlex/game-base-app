import axios from "axios"

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

interface ShortScreenshot {
    image: string
}

export interface User {
    password: string,
    nickname?: string,
    phone_number?: string
}


type GameService = {
    getGamesList: (currentPage: number, search?: string) => Promise<GamesListInfo[]>
    getGameById: (id: number | string | undefined) => Promise<GameBasicInfo>
    getScreenshotsById: (id: number | string | undefined) => Promise<Screenshots[]>
    getGamesSearchInfo: (searchedString: string) => Promise<GamesResponse>
    auth: (url: string, body: User) => Promise<string[]>
}

axios.defaults.baseURL = process.env.REACT_APP_API_BASE
// axios.defaults.withCredentials = true

const useGameServices = (): GameService => {

    const getGamesList = async (currentPage: number, search?: string) => {

        let url = `games?key=${process.env.REACT_APP_API_KEY}&ordering=-relevance&page=${currentPage}&page_size=21`
        if (search) {
            url += `&search=${search}`
        }

        const res = await axios.get(
            url,

        );


        return res.data.results.map((game: GamesListInfo) => {
            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image ? game.background_image.replace("/media/", "/media/resize/640/-/") : require('../../../src/shared/assets/image/icon-image-not-found-free-vector.jpg'),
                short_screenshots: game.short_screenshots && game.short_screenshots.map((item: ShortScreenshot) => (
                    {
                        image: item.image.replace("/media/", "/media/resize/640/-/")
                    }
                )),
                ratings_count: game.ratings_count,
                parent_platforms: game.parent_platforms,
                released: game.released,
                genres: game.genres
            }
        })

    }

    const getGameById = async (id: number | string | undefined) => {
        const res = await axios.get(
            `games/${id}?key=${process.env.REACT_APP_API_KEY}`
        )
        return res.data
    }

    const getScreenshotsById = async (id: number | string | undefined) => {
        const res = await axios.get(
            `games/${id}/screenshots?key=${process.env.REACT_APP_API_KEY}`
        )
        return res.data.results.map((screenshots: Screenshots) => {
            return {
                id: screenshots.id,
                image: screenshots.image
            }
        })
    }
    const getGamesSearchInfo = async (searchedString: string) => {
        const res = await axios.get(
            `games?page_size=20&search=${searchedString}&page=1&key=${process.env.REACT_APP_API_KEY}`
        )
        const resObj = {
            count: res.data.count,
            list: res.data.results.map((game: GamesListInfo) => {
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

    const auth = async (url: string, body: User) => {
        const res = await axios.post(
            url,
            body
        )
        return res.data
    }

    return { getGamesList, getGameById, getScreenshotsById, getGamesSearchInfo, auth }
}

export default useGameServices