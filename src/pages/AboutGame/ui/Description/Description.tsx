import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"

import { API } from "services";
import { setContent } from 'utils';


interface GameBasicInfo {
    id: number | string | undefined
    name: string
    background_image: string
    description_raw: string
}
const Description = () => {
    const [game, setGame] = useState<GameBasicInfo | null>(null);
    const { gameId } = useParams()


    const { getGameById, statusLoad, setStatusLoad } = API.gameService();

    useEffect(() => {
        getGameById(gameId)
            .then(game => setGame(game))
            .then(() => setStatusLoad('confirmed'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId])

    const renderInfo = () => {
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

    const elements = useMemo(() => {
        return setContent(statusLoad, () => renderInfo())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusLoad])

    return (
        <div>
            {elements}
        </div>

    )
}

export default Description