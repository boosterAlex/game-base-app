import { useState, useEffect } from "react"
import { CardItem, Spinner } from "shared/ui"

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

    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);

    const { getGamesList } = API.gameService();

    useEffect(() => {
        getGamesList()
            .then((games) => setGamesList(games))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='game__content'>
            {gamesList.length ? (gamesList.map((game) =>
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
            ) : <Spinner />}
        </div>
    )

}

export default ListOfGamesByParams