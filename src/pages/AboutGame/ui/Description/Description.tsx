import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { API } from "services";
import { Spinner } from "shared/ui";


interface GameBasicInfo {
    id: number | string | undefined
    name: string
    background_image: string
    description_raw: string
}
const Description = () => {
    const [game, setGame] = useState<GameBasicInfo | null>(null);
    const { gameId } = useParams()


    const { getGameById } = API.gameService();

    useEffect(() => {
        getGameById(gameId)
            .then(game => setGame(game))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId])

    return (

        <>
            {game ? (<div>
                <img src={game?.background_image} alt={game?.name} style={{ width: '400px' }} />
                <h1>{game.name}</h1>
                {game.description_raw}

            </div>) : <Spinner />}
        </>
    )
}

export default Description