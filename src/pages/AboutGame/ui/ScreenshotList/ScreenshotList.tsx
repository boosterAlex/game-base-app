import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API } from "services";

interface Screenshots {
    id: number
    image: string
}


const ScreenshotList = () => {
    const [screenshotsList, setScreenshotsList] = useState<Screenshots[]>([])
    const { gameId } = useParams()

    const { getScreenshotsById } = API.gameService();

    useEffect(() => {
        getScreenshotsById(gameId)
            .then(screenshots => setScreenshotsList(screenshots))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId])

    const renderScreen = (arr: Screenshots[]) => {
        const screenshots = arr.map((item: Screenshots) => (
            <li key={item.id}>
                <img src={item.image} alt={''} style={{ width: '300px' }} />
            </li>
        ))
        return <ul>{screenshots}</ul>
    }

    return (
        <div>
            {renderScreen(screenshotsList)}
        </div>
    )
}

export default ScreenshotList