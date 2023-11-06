import { useState } from "react"
import { GameList } from "shared/ui"

const ListOfGamesByParams = () => {

    const [selectedGame, setSelectedGame] = useState<number | null>(null)

    const onGameSelected = (id: number) => {
        setSelectedGame(id)
    }

    return (
        <GameList onGameSelected={onGameSelected} />
        // <CardItem  title = {title}/>
    )
}

export default ListOfGamesByParams