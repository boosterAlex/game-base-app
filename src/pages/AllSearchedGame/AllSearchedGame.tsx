import { useState, useEffect } from "react"
import { CardItem, Spinner } from "shared/ui"
import { useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";

import './AllSearchedGame.scss'

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

const AllSearchedGame = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);
    const { name } = useParams()

    const { getGamesList } = API.gameService();

    const getGamesListMore = () => {
        setCurrentPage((prev => prev + 1))
    }

    useEffect(() => {
        getGamesList(currentPage, name).then((games) =>
            setGamesList((prevGamesList) => [...prevGamesList, ...games])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1)
        setGamesList([])
    }, [name])

    return (
        <InfiniteScroll
            className="game__content"
            dataLength={gamesList.length}
            next={getGamesListMore}
            hasMore={true}
            loader={<Spinner />}
        >
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
        </InfiniteScroll>
    )

}

export default AllSearchedGame