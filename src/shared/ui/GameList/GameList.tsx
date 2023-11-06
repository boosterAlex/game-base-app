import { useEffect, useMemo, useState } from 'react';
import { Link, generatePath } from 'react-router-dom';

import { API } from 'services';
import { setContent } from 'utils';
import { ROUTES } from 'shared/consts'

import './GameList.scss'

interface GamesListInfo {
    id: number
    name: string
    background_image: string
}

interface GameListProps {
    onGameSelected: (id: number) => void

}

const GameList = ({ onGameSelected }: GameListProps) => {
    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);


    useEffect(() => {
        onGamesLoaded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { getGamesList, statusLoad, setStatusLoad } = API.gameService();

    function onGamesLoaded() {
        getGamesList()
            .then((games) => setGamesList(games))
            .then(() => setStatusLoad('confirmed'));
    };

    const renderGame = (arr: GamesListInfo[]) => {
        const games = arr.map((item: GamesListInfo) => {
            return (

                <li
                    className='game__item'
                    key={item.id}>
                    <img style={{ objectFit: 'contain', width: '500px' }} src={item.background_image} alt={item.name} />
                    <Link
                        style={{ textDecoration: 'none' }}
                        onClick={() => onGameSelected(item.id)}
                        to={(generatePath(ROUTES.GAME, { gameId: String(item.id) }))}
                    >
                        <h2>{item.name}</h2>
                    </Link>
                </li>

            );
        })
        return (
            <ul className='game__grid'>{games}</ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(statusLoad, () => renderGame(gamesList))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusLoad])

    return (
        <>
            <div className='game__content'>{elements}</div>
        </>
    )
}


export default GameList;