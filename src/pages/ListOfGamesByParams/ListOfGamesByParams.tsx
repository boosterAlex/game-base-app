import { useState, useEffect } from "react"
import { CardItem, Spinner } from "shared/ui"
import InfiniteScroll from "react-infinite-scroll-component";

import './ListOfGamesByParams.scss'

import { API } from 'services';
interface GamesListInfo {
    id: number
    name: string
    background_image: string
    short_screenshots: []
    ratings_count: number
    parent_platforms: []
    released: string
    genres: []
}

const ListOfGamesByParams = () => {

    const [currentPage, setCurrentPage] = useState(2)
    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);
    const [gameListUrl, setGamesListUrl] = useState(`${process.env.REACT_APP_API_BASE}games?key=${process.env.REACT_APP_API_KEY}&ordering=-relevance&page=1&page_size=21`)

    const { getGamesList, getGamesListNextPage } = API.gameService();

    const getGamesListMore = () => {
        setCurrentPage((prev => prev + 1))
        setGamesListUrl(`${process.env.REACT_APP_API_BASE}games?key=${process.env.REACT_APP_API_KEY}&ordering=-relevance&page=${currentPage}&page_size=21`)
    }

    // useEffect(() => {
    //     getGamesListNextPage(gameListUrl).then((data) => setGamesListUrl(data))
    // }, [gamesList])

    useEffect(() => {
        getGamesList(gameListUrl).then((games) => setGamesList([...gamesList, ...games]))
    }, [currentPage])

    // useEffect(() => {
    //     getGamesList(gameListUrl)
    //         .then((games) => setGamesList(games))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        // <InfiniteScroll dataLength={gamesList.length} next={getGamesListMore} hasMore={true} loader={<Spinner />}>
        <div className='game__content'>
            {(gamesList.map((game) =>
                <CardItem
                    id={game.id}
                    background_image={game.background_image}
                    name={game.name}
                    short_screenshots={game.short_screenshots}
                    ratings_count={game.ratings_count}
                    parent_platforms={game.parent_platforms}
                    released={game.released}
                    genres={game.genres}

                />)
            )}
            {(gamesList.length > 0) ? <button onClick={getGamesListMore}>SHOW MORE</button> : null}
        </div>
        // </InfiniteScroll>
    )

}

export default ListOfGamesByParams