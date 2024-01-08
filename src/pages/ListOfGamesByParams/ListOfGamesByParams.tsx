import { useState, useEffect } from "react"
import { CardItem, Spinner } from "shared/ui"
import InfiniteScroll from "react-infinite-scroll-component";

import { API } from 'services';

import './ListOfGamesByParams.scss'

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

    const [currentPage, setCurrentPage] = useState(1)
    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);

    const { getGamesList } = API.gameService();

    const getGamesListMore = () => {
        setCurrentPage((prev => prev + 1))
    }

    useEffect(() => {
        getGamesList(currentPage)
            .then((games) =>
                setGamesList((prevGamesList) => [...prevGamesList, ...games])
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

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

export default ListOfGamesByParams