import { useState, useEffect } from "react"
import { CardItem, Spinner } from "shared/ui"

import './ListOfGamesByParams.scss'

import { API } from 'services';
interface GamesListInfo {
    id: number
    name: string
    background_image: string
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
                <CardItem id={game.id} background_image={game.background_image} name={game.name} />)
            ) : <Spinner />}
        </div>
    )

}

export default ListOfGamesByParams