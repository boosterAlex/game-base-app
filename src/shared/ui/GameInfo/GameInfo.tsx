import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { API } from "services";

interface GameBasicInfo {
    id: number | string | undefined
    name: string
    background_image: string
    description_raw: string
}

const GameInfo = () => {

    const [game, setGame] = useState<GameBasicInfo | null>(null);
    const { gameId } = useParams()


    const { getGameById, statusLoad, setStatusLoad } = API.gameService();

    useEffect(() => {
        getGameById(gameId).then(game => setGame(game))
    }, [gameId])

    console.log(game)

    return (
        <div>
            {game && (<div>
                <img src={game?.background_image} alt={game?.name} style={{ width: '400px' }} />
                <h1>{game.name}</h1>
                {game.description_raw}

            </div>)}
        </div>

    )
}

export default GameInfo