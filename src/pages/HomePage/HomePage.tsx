import { useEffect, useState } from 'react';

import { API } from 'services';

interface GameBasicInfo {
    id: number
    name: string
    image: string
}

const HomePage = () => {
    const [gamesList, setGamesList] = useState<GameBasicInfo[]>([]);


    useEffect(() => {
        onGamesLoaded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { getGamesList } = API.gameService();

    function onGamesLoaded() {
        getGamesList().then((games) => setGamesList(games));
    };

    console.log(gamesList)
    return (
        <div>{gamesList.map((item: GameBasicInfo) => {
            return (
                <li
                    key={item.id}>
                    <img style={{ objectFit: 'contain', width: '500px' }} src={item.image} alt={item.name} />
                    <div>{item.name}</div>

                </li>
            );
        })}</div>
    )
};

export default HomePage;


