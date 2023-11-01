import { useState } from "react"
import { useParams } from "react-router-dom"

const GameInfo = () => {

    const [game, setGame] = useState([]);
    const { gameId } = useParams()


    return (
        <>
            <div>ABOUT GAME {gameId}</div>
        </>
    )
}

export default GameInfo