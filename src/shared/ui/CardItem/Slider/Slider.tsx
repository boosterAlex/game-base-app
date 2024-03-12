import { useCallback, useEffect, useState } from "react";
import "./Slider.scss";

interface Props {
    background_image: string
    short_screenshots: []
}

interface Screenshots {
    id: number
    image: string
}
const Slider = ({ background_image, short_screenshots }: Props) => {
    const [activeImage, setActiveImage] = useState<string>("");
    const [screenshotsList, setScreenshotsList] = useState<Screenshots[]>([])
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
    const [isCardActive, setIsCardActive] = useState<Boolean>(false)


    const handleMouseEnter = useCallback((src: string, index: number): void => {
        setActiveImage(src)
        setActiveSlideIndex(index)
    }, []);

    useEffect(() => {
        setScreenshotsList(short_screenshots)
        setActiveImage(() => background_image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderGameCardInfo = () => {
        return (
            <div className="slider__dots">
                <div className="slider__dots-row">
                    {screenshotsList.map((image: Screenshots, index: number) => (
                        <div
                            key={index}
                            className="slider__dots-item"
                            onMouseEnter={() =>
                                handleMouseEnter(image.image, index)} >
                            <img src={image.image} alt='some' />
                        </div>
                    ))}
                </div>
                <div className="slider__dots-progress">
                    {screenshotsList.map((image: Screenshots, index: number) => (
                        <span
                            className={`slider__dot${activeSlideIndex === index ? " active" : ""}`}
                            key={index}
                            onMouseEnter={() =>
                                handleMouseEnter(image.image, index)}
                        ></span>
                    ))}
                </div>
            </div>

        )
    }

    return (
        <div className="slider"
            onMouseLeave={() => {
                setActiveImage(() => background_image)
                setActiveSlideIndex(0)
                setIsCardActive(false)
            }}>
            <div className="image__container" onMouseMove={() => (setIsCardActive(true))}>
                <img src={activeImage} alt={background_image} />
                {isCardActive && renderGameCardInfo()}
            </div>
        </div>
    );
};

export default Slider;