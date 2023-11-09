import { useEffect, useState } from "react";
import "./Slider.scss";
import { API } from "services";

interface Props {
    id: number
    background_image: string
}

interface Screenshots {
    id: number
    image: string
}
const Slider = ({ id, background_image }: Props) => {
    const [activeImage, setActiveImage] = useState<string>("");
    const [screenshotsList, setScreenshotsList] = useState<Screenshots[]>([])
    const [progressWidth, setProgressWidth] = useState<number>(0);

    const { getScreenshotsById } = API.gameService();


    const handleMouseEnter = (src: string): void => {
        setActiveImage(src)
    };

    const handleMouseMove = (index: number): void => {
        const width = ((index + 1) / screenshotsList.length) * 100;
        setProgressWidth(width);
    };


    useEffect(() => {
        getScreenshotsById(id)
            .then(screenshots => setScreenshotsList(screenshots))
        setActiveImage(() => background_image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(screenshotsList)

    return (
        <div className="slider"
            onMouseLeave={() => {
                setActiveImage(() => background_image)
                setProgressWidth(() => 0)
            }}>
            <div className="image__container">
                <img src={activeImage} alt={background_image} />
                <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
                <div className="slider__dots">
                    {screenshotsList.map((image: Screenshots, index: number) => (
                        <div
                            className="slider__dots-item"
                            key={image.id}
                            data-src={image.image}
                            onMouseEnter={() => {
                                handleMouseEnter(image.image)
                                handleMouseMove(index)
                            }
                            }>
                        </div>
                    ))}
                </div>
            </div>
        </div>);
};

export default Slider;