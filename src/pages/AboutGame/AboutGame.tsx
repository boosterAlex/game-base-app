import { Description, ScreenshotList } from "pages/AboutGame"
import { Slider } from "shared/ui/CardItem/Slider"

const AboutGame = () => {

    return (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Description />
            <ScreenshotList />
            {/* <Slider /> */}
        </div>
    )
}

export default AboutGame