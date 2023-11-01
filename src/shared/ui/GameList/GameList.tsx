import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { API } from 'services';
import { setContent } from 'utils';

import './GameList.scss'

interface GameBasicInfo {
    id: number
    name: string
    background_image: string
}

interface GameListProps {
    onGameSelected: (id: number) => void

}

const GameList = ({ onGameSelected }: GameListProps) => {
    const [gamesList, setGamesList] = useState<GameBasicInfo[]>([]);


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

    const renderGame = (arr: GameBasicInfo[]) => {
        const games = arr.map((item: GameBasicInfo) => {
            return (

                <li
                    className='game__item'
                    key={item.id}>
                    <img style={{ objectFit: 'contain', width: '500px' }} src={item.background_image} alt={item.name} />
                    <Link
                        style={{ textDecoration: 'none' }}
                        onClick={() => onGameSelected(item.id)}
                        to={`/games/${item.id}`}>
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