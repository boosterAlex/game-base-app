import { useEffect, useMemo, useState } from 'react';

import { API } from 'services';
import { Spinner } from 'shared/ui';

import './HomePage.scss'
interface GameBasicInfo {
    id: number
    name: string
    background_image: string
}

const setContent = (status: string, Component: () => JSX.Element) => {
    switch (status) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return <Spinner />
        case 'confirmed':
            return <Component />
        default:
            throw new Error('Unexpected status state')
    }
}

const HomePage = () => {
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
                <li className='game__item'
                    key={item.id}>
                    <img style={{ objectFit: 'contain', width: '500px' }} src={item.background_image} alt={item.name} />
                    <div>{item.name}</div>

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


export default HomePage;


