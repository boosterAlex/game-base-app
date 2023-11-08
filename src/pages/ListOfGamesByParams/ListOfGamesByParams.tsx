import { useState, useEffect, useMemo } from "react"
import { CardItem } from "shared/ui"

import './ListOfGamesByParams.scss'

import { API } from 'services';
import { setContent } from 'utils';
interface GamesListInfo {
    id: number
    name: string
    background_image: string
}

const ListOfGamesByParams = () => {

    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);

    const { getGamesList, statusLoad, setStatusLoad } = API.gameService();

    useEffect(() => {
        onGamesLoaded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onGamesLoaded() {
        getGamesList()
            .then((games) => setGamesList(games))
            .then(() => setStatusLoad('confirmed'));
    };

    const renderGame = (arr: GamesListInfo[]) => {
        const games = arr.map((item: GamesListInfo) => (
            <CardItem id={item.id} background_image={item.background_image} name={item.name} />
        ))
        return <ul className='game__grid'>{games}</ul>
    }

    const elements = useMemo(() => {
        return setContent(statusLoad, () => renderGame(gamesList))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusLoad])

    return (
        <div className='game__content'>{elements}</div>
    )

}

export default ListOfGamesByParams