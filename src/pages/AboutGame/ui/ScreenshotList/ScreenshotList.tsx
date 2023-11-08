import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { API } from "services";
import { setContent } from 'utils';

interface Screenshots {
    id: number
    image: string
}


const ScreenshotList = () => {
    const [screenshotsList, setScreenshotsList] = useState<Screenshots[]>([])
    const { gameId } = useParams()

    const { getScreenshotsById, statusLoad, setStatusLoad } = API.gameService();

    useEffect(() => {
        getScreenshotsById(gameId)
            .then(screenshots => setScreenshotsList(screenshots))
            .then(() => setStatusLoad('confirmed'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId])

    console.log(screenshotsList)


    const renderScreen = (arr: Screenshots[]) => {
        const screenshots = arr.map((item: Screenshots) => (
            <li key={item.id}>
                <img src={item.image} alt={''} />
            </li>
        ))
        return <ul>{screenshots}</ul>
    }

    const elements = useMemo(() => {
        return setContent(statusLoad, () => renderScreen(screenshotsList))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusLoad])

    return (
        <>{elements}</>
    )
}

export default ScreenshotList